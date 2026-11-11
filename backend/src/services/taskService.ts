import { taskRepository } from '../repositories/taskRepository';
import { trainingRepository } from '../repositories/trainingRepository';
import { playerRepository } from '../repositories/playerRepository';
import { HttpError } from './authService';
import { ITask } from '../models/Task';

// Ο χρήστης που κάνει το αίτημα (από το token)
type Requester = { id: string; role: string };

export const taskService = {
  getAll: async (requester: Requester) => {
    if (requester.role === 'admin') {
      return taskRepository.findAll();
    }

    const player = await playerRepository.findByUserId(requester.id);
    if (!player) {
      throw new HttpError(404, 'Player not found');
    }

    return taskRepository.findByPlayer(String(player._id)); // ΑΛΛΑΓΗ 1
  },

  // ΑΛΛΑΓΗ 4: προστέθηκε
  getByTraining: async (trainingId: string) => {
    return taskRepository.findByTraining(trainingId);
  },

  getById: async (id: string, requester: Requester) => {
    const task = await taskRepository.findById(id);
    if (!task) {
      throw new HttpError(404, 'Task not found');
    }

    if (requester.role !== 'admin') { // ΑΛΛΑΓΗ 2: !==
      const player = await playerRepository.findByUserId(requester.id);
      const assignedId = String((task.assignedTo as any)._id);

      if (!player || String(player._id) !== assignedId) {
        throw new HttpError(403, 'Access denied');
      }
    }
    return task;
  },

  create: async (data: Partial<ITask>, userId: string) => {
    const training = await trainingRepository.findById(String(data.training));
    if (!training) {
      throw new HttpError(404, 'Training not found');
    }

    // ΑΛΛΑΓΗ 3: προστέθηκε ο έλεγχος παίκτη
    const player = await playerRepository.findById(String(data.assignedTo));
    if (!player) {
      throw new HttpError(404, 'Player not found');
    }

    const { status, ...safeData } = data;
    return taskRepository.create({ ...safeData, createdBy: userId as any });
  },

  update: async (id: string, data: Partial<ITask>, requester: Requester) => {
    const existing = await taskRepository.findById(id);
    if (!existing) {
      throw new HttpError(404, 'Task not found');
    }

    let updateData: Partial<ITask>;

    if (requester.role === 'admin') {
      const { createdBy, ...rest } = data;
      updateData = rest;
    } else {
      const player = await playerRepository.findByUserId(requester.id);
      const assignedId = String((existing.assignedTo as any)._id);

      if (!player || String(player._id) !== assignedId) {
        throw new HttpError(403, 'Access denied');
      }

      updateData = { status: data.status };
    }

    const task = await taskRepository.update(id, updateData);
    if (!task) {
      throw new HttpError(404, 'Task not found');
    }
    return task;
  },

  delete: async (id: string) => {
    const task = await taskRepository.delete(id);
    if (!task) {
      throw new HttpError(404, 'Task not found');
    }
  },
};