import {Player , IPlayer} from '../models/Player';

export const playerRepository = {
    findAll: async () => {
        return Player.find().populate('user' , 'name email');
    },

    findById: async (id: string) => {
        return Player.findById(id).populate('user' , 'name email');
    },

    findByUserId: async (userId: string) => {
        return Player.findOne({ user: userId }).populate('user' , 'name email');
    },

    create: async (data: Partial<IPlayer>) => {

        return Player.create(data);
    },

    update: async (id: string, data: Partial<IPlayer>) => {
        return Player.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate('user' , 'name email');
   },

   delete: async (id: string) => {
        return Player.findByIdAndDelete(id);
    },
};

