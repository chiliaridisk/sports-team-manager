import { Match, IMatch } from '../models/Match';

export const matchRepository = {
  findAll: async () => {
    return Match.find().sort({ date: 1 }).populate('createdBy', 'name');
  },

  findById: async (id: string) => {
    return Match.findById(id).populate('createdBy', 'name');
  },

  create: async (data: Partial<IMatch>) => {
    return Match.create(data);
  },

  update: async (id: string, data: Partial<IMatch>) => {
    return Match.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
      runValidators: true,
    }).populate('createdBy', 'name');
  },

  delete: async (id: string) => {
    return Match.findByIdAndDelete(id);
  },
};