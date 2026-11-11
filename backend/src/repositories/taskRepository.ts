import {Task , ITask} from '../models/Task';

const populateFields = [
    {path: 'training' , select: 'title date'},
    {path: 'assignedTo' , select: 'jerseyNumber position'},
    {path: 'createdBy' , select: 'name'},
];

export const taskRepository = {
    findAll: async () => {
        return Task.find().sort({createdAt: -1}).populate(populateFields)  
      },

      //Tasks for one player
      findByPlayer: async (playerId: string) => {
        return Task.find({ assignedTo: playerId }).sort({createdAt: -1}).populate(populateFields);
      },

      //Task for one training
      findByTraining: async (trainingId: string) => {
        return Task.find({ training: trainingId }).sort({createdAt: -1}).populate(populateFields);
      },

      //OneTask by id
      findById: async (id: string) => {
        return Task.findById(id).populate(populateFields);
      },

      create: async (data: Partial<ITask>) => {
        return Task.create(data);
      },

      update: async (id: string, data: Partial<ITask>) => {
        return Task.findByIdAndUpdate(id, data, {
            returnDocument: 'after',
            runValidators: true,

      }).populate(populateFields);
},


    delete: async (id: string) =>{
        return Task.findByIdAndDelete(id);
    },
};