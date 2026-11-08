import { playerRepository } from '../repositories/playerRepository';
import { userRepository } from '../repositories/userRepository';
import { HttpError } from './authService';
import { IPlayer } from '../models/Player';

export const playerService =  {
    getAll: async () => {
        return playerRepository.findAll();
    },

    getById: async (id: string) => {
        const player = await playerRepository.findById(id);
        if (!player) {
            throw new HttpError(404, 'Player not found');
        }
        return player;

    },

    getMine: async (userId: string) => {
        const player = await playerRepository.findByUserId(userId);
        if (!player) {
            throw new HttpError (404 , 'This player profile not found');
        }
        return player;
    },

    create: async (data: Partial<IPlayer>) => {
        const user = await userRepository.findById(String(data.user));
        if (!user) {
            throw new HttpError(404, 'User not found');
        }

        const existing = await playerRepository.findByUserId(String(data.user));
        if (existing) {
            throw new HttpError(400, 'Player profile already exists for this user');
        }

        try {
            return await playerRepository.create(data);
        } catch (error : any) {
            if (error.code === 11000) {
                throw new HttpError(409, 'Jersey Number already in use');
            }
            throw error;
        }
    },

    update: async (id: string, data: Partial<IPlayer>) => {
        const player = await playerRepository.update(id, data);
        if (!player) {
            throw new HttpError(404, 'Player not found');
        }
        return player;
    },

    delete: async (id: string) => {
        const player = await playerRepository.delete(id);
        if (!player) {
            throw new HttpError(404, 'Player not found');
        }
    }
};

