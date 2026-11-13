import { matchRepository } from '../repositories/matchRepository';
import { HttpError } from './authService';
import { IMatch } from '../models/Match';

export const matchService = {
  getAll: async () => {
    return matchRepository.findAll();
  },

  getById: async (id: string) => {
    const match = await matchRepository.findById(id);
    if (!match) {
      throw new HttpError(404, 'Match not found');
    }
    return match;
  },

  // Δημιουργία: createdBy από το token, χωρίς result
  create: async (data: Partial<IMatch>, userId: string) => {
    const { result, ...safeData } = data;
    return matchRepository.create({ ...safeData, createdBy: userId as any });
  },

  // Αλλαγή: το createdBy δεν αλλάζει. Εδώ μπαίνει και το σκορ
  update: async (id: string, data: Partial<IMatch>) => {
    const { createdBy, ...safeData } = data;
    const match = await matchRepository.update(id, safeData);
    if (!match) {
      throw new HttpError(404, 'Match not found');
    }
    return match;
  },

  delete: async (id: string) => {
    const match = await matchRepository.delete(id);
    if (!match) {
      throw new HttpError(404, 'Match not found');
    }
  },
};