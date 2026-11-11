import {Schema, model , Types} from 'mongoose';

//interface for the Training document
export interface ITraining {
    title: string;
    date: Date;
    location: string;
    description?: string;
    createdBy: Types.ObjectId; //id of admin who created the training
}

//Schema for the Training document
const trainingSchema = new Schema<ITraining>(
    {
        title: { type: String, required: true, trim: true, maxlength: 100 },
        date: { type: Date, required: true },
        location: { type: String, required: true, trim: true },
        description: { type: String, trim: true, maxlength: 500 },
        createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true } //createdAt and updatedAt 
);

export const Training = model<ITraining>('Training', trainingSchema);