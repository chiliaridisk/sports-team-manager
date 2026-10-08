import {Request, Response} from "express";
import {authService , HttpError} from "../services/authService";


const handleError = (error: unknown, res: Response) => {

    if (error instanceof HttpError) {
        return res.status(error.statusCode).json({message: error.message});
    }
    console.error(error);
    return res.status(500).json({message: 'Server Error'});

};

export const authController = {
    // ΕΓΓΡΑΦΗ
    register:async (req: Request, res: Response) => {
        try {
            const {name, email , password} = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({message: 'All fields are required'});
            }

            const result = await authService.register(name, email, password);
            return res.status(201).json(result);
        
        }catch (error) {
            return handleError(error, res);
        }
    },

    // ΣΥΝΔΕΣΗ
    login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const result = await authService.login(email, password);
      return res.status(200).json(result);
    } catch (error) {
      return handleError(error, res);
    }
  },


};