import {Schema , model , Types} from 'mongoose';

//only 2 types
export type TaskStatus = 'pending' | 'done';


//Interface
export interface ITask {
    title: string;
    description: string;
    training: Types.ObjectId;
    assignedTo: Types.ObjectId;
    status: TaskStatus;
    dueDate?: Date;
    createdBy: Types.ObjectId;
}


//Schema
const taskSchema = new Schema<ITask>(

    {
        title: { type: String, required: true , trim: true, maxlength: 100 },
        description: {type: String , trim:true, maxlength: 500},
        training: {type: Schema.Types.ObjectId, ref: 'Training', required: true},
        assignedTo: {type: Schema.Types.ObjectId, ref: 'Player', required: true},
        status: {type: String, enum: ['pending', 'done'], default: 'pending'},
        dueDate: { type: Date },
        createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }

    },
    { timestamps: true }


);

export const Task = model<ITask>('Task', taskSchema);