import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { trainingService } from '../services/trainingService';
import { HttpError } from '../services/authService';


const handleError = (error: unknown, res: Response) => {
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  console.error(error);
  return res.status(500).json({ message: 'Internal Server Error' });
};

export const trainingController = {

  getAll: async (req: Request, res: Response) => {
    try {
      const trainings = await trainingService.getAll();
      return res.status(200).json(trainings);
    } catch (error) {
      return handleError(error, res);
    }
  },

 
  getById: async (req: Request, res: Response) => {
    try {
      const training = await trainingService.getById(String(req.params.id));
      return res.status(200).json(training);
    } catch (error) {
      return handleError(error, res);
    }
  },


  create: async (req: AuthRequest, res: Response) => {
    try {
      const { title, date, location } = req.body;

      //  400
      if (!title || !date || !location) {
        return res.status(400).json({ message: 'title, date and location are required' });
      }

      const training = await trainingService.create(req.body, req.user!.id);
      return res.status(201).json(training);
    } catch (error) {
      return handleError(error, res);
    }
  },

  
  update: async (req: Request, res: Response) => {
    try {
      const training = await trainingService.update(String(req.params.id), req.body);
      return res.status(200).json(training);
    } catch (error) {
      return handleError(error, res);
    }
  },

  // ΔΙΑΓΡΑΦΗ
  delete: async (req: Request, res: Response) => {
    try {
      await trainingService.delete(String(req.params.id));
      return res.status(200).json({ message: 'Training deleted' });
    } catch (error) {
      return handleError(error, res);
    }
  },
};