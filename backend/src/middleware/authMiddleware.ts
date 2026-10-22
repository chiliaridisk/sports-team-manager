import {Request , Response , NextFunction} from 'express';
import jwt from 'jsonwebtoken';


export interface AuthRequest extends Request {
    user?: { id: string; role: string };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'no token provided' });
    }

    const token = header.split(' ')[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        return res.status(500).json({ message: 'Server error' });
    }

    try {
        const decoded = jwt.verify(token, secret) as { id: string; role: string };
        req.user = { id: decoded.id, role: decoded.role };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }

};