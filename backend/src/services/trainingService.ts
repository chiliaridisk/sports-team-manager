import { trainingRepository } from '../repositories/trainingRepository';
import { HttpError } from './authService';
import { ITraining } from '../models/Training';

export const trainingService = {
    //List of all trainings
    getAll : async () => {
        return trainingRepository.findAll();
    },

    getById : async (id: string) => {
        const training = await trainingRepository.findById(id);
        if (!training) {
            throw new HttpError(404, 'Training not found');
        }
        return training;
    },
    

    //createdBy by logged-in admin
    create: async (data: Partial<ITraining>, userId: string) => {
        return trainingRepository.create({ ...data, createdBy: userId as any });
    },

    update: async (id: string, data: Partial<ITraining>) => {
        const {createdBy,...safeData } = data;
        const training = await trainingRepository.update(id, safeData);
        if (!training) {
            throw new HttpError(404, 'Training not found');
        }
        return training;
    },

    //delete
    delete: async (id: string) => {
        const training = await trainingRepository.delete(id);
        if (!training) {
            throw new HttpError(404, 'Training not found');
        }
        
    },

};