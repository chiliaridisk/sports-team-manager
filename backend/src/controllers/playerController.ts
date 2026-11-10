import {Request, Response} from 'express';
import {AuthRequest} from '../middleware/authMiddleware';
import {playerService} from '../services/playerService';
import {HttpError} from '../services/authService';

const handleError = (error: unknown, res: Response) => {
    if (error instanceof HttpError) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
};

export const playerController = {
    //get all players
    getAll: async (req: Request, res: Response) => {
        try {
            const players = await playerService.getAll();
            return res.status(200).json(players);
        } catch (error) {
            return handleError(error, res);
        }
},

getById: async (req: Request, res: Response) => {
    try {
        const player = await playerService.getById(String(req.params.id));
        return res.status(200).json(player);
    } catch (error) {
        return handleError(error, res);
    }

},

getMine: async (req: AuthRequest, res: Response) => {
    try {
        const player = await playerService.getMine(req.user!.id);
        return res.status(200).json(player);
    } catch (error) {
        return handleError(error, res);
    }
},

//create new player profile
create: async (req: Request, res: Response) => {
    try {
        const {user , position , age , jerseyNumber , height} = req.body;

        if (!user || !position || !age || jerseyNumber === undefined || !height) {
            return res
            .status(400)
            .json({ message: 'Missing required fields: user, position, age, jerseyNumber, height' });
        }

        const player = await playerService.create(req.body);
        return res.status(201).json(player);
    } catch (error) {
        return handleError(error, res);
    }
       
},


update: async (req: Request, res: Response) => {
    try {
        //id from Url , new data from body
        const player = await playerService.update(String(req.params.id), req.body);
        return res.status(200).json(player);
    } catch (error) {
        return handleError(error, res);
    }
},

delete: async (req: Request, res: Response) => {
    try {
        await playerService.delete(String(req.params.id));
        return res.status(200).json({message: 'Player deleted successfully'});
    } catch (error) {
        return handleError(error, res);
    }
},

};


