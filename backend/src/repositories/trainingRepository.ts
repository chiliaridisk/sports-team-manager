import { Training, ITraining } from '../models/Training';

export const trainingRepository = {


    findAll: async () => {
        return Training.find().sort({date: 1}).populate('createdBy' , 'name')
    },

     findById: async (id: string) => {
        return Training.findById(id).populate('createdBy', 'name');
    },

      // Δημιουργία
    create: async (data: Partial<ITraining>) => {
            return Training.create(data);
    },

     // Ενημέρωση
  update: async (id: string, data: Partial<ITraining>) => {
    return Training.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
      runValidators: true,
    }).populate('createdBy', 'name');
  },

    // Διαγραφή
  delete: async (id: string) => {
    return Training.findByIdAndDelete(id);
  },


};