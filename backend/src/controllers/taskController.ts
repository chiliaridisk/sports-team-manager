import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { taskService } from '../services/taskService';
import { HttpError } from '../services/authService';

// Αποφασίζει τι απάντηση θα πάρει ο client όταν κάτι στραβώσει
const handleError = (error: unknown, res: Response) => {
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  console.error(error);
  return res.status(500).json({ message: 'Internal Server Error' });
};

export const taskController = {
  // ΛΙΣΤΑ: admin όλα, παίκτης μόνο τα δικά του (το αποφασίζει το service)
  getAll: async (req: AuthRequest, res: Response) => {
    try {
      const tasks = await taskService.getAll(req.user!);
      return res.status(200).json(tasks);
    } catch (error) {
      return handleError(error, res);
    }
  },

  // TASKS ΜΙΑΣ ΠΡΟΠΟΝΗΣΗΣ: το id της προπόνησης από το URL
  getByTraining: async (req: AuthRequest, res: Response) => {
    try {
      const tasks = await taskService.getByTraining(String(req.params.trainingId));
      return res.status(200).json(tasks);
    } catch (error) {
      return handleError(error, res);
    }
  },

  // ΕΝΑ TASK: id από το URL, ποιος ρωτάει από το token
  getById: async (req: AuthRequest, res: Response) => {
    try {
      const task = await taskService.getById(String(req.params.id), req.user!);
      return res.status(200).json(task);
    } catch (error) {
      return handleError(error, res);
    }
  },

  // ΔΗΜΙΟΥΡΓΙΑ: στοιχεία από το body, ο admin από το token
  create: async (req: AuthRequest, res: Response) => {
    try {
      const { title, training, assignedTo } = req.body;

      // λείπει κάτι υποχρεωτικό -> 400
      if (!title || !training || !assignedTo) {
        return res.status(400).json({ message: 'title, training and assignedTo are required' });
      }

      const task = await taskService.create(req.body, req.user!.id);
      return res.status(201).json(task);
    } catch (error) {
      return handleError(error, res);
    }
  },

  // ΑΛΛΑΓΗ: id από το URL, νέα στοιχεία από το body, ποιος ρωτάει από το token
  update: async (req: AuthRequest, res: Response) => {
    try {
      const task = await taskService.update(String(req.params.id), req.body, req.user!);
      return res.status(200).json(task);
    } catch (error) {
      return handleError(error, res);
    }
  },

  // ΔΙΑΓΡΑΦΗ
  delete: async (req: AuthRequest, res: Response) => {
    try {
      await taskService.delete(String(req.params.id));
      return res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
      return handleError(error, res);
    }
  },
};