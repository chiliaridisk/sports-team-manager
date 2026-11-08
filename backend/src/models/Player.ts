import {Schema , model , Types} from 'mongoose';

export type PlayerPosition = 'PG' | 'SG' | 'SF' | 'PF' | 'C';
export type PlayerStatus = 'active' | 'injured';

export interface IPlayer {
    user: Types.ObjectId;
    position: PlayerPosition;
    age: number;
    jerseyNumber: number;
    height: number;
    status: PlayerStatus;
}

const playerSchema = new Schema<IPlayer>(

    {

    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },

    position: { type: String, enum: ['PG', 'SG', 'SF', 'PF', 'C'], required: true },

    age: { type: Number, required: true, min: 14, max: 60 },

    jerseyNumber: { type: Number, required: true, min: 0, max: 99, unique: true },

    height: { type: Number, required: true, min: 120, max: 250 },

    status: { type: String, enum: ['active', 'injured'], default: 'active' },
    } ,
    
    {timestamps: true}
);

export const Player = model<IPlayer>('Player', playerSchema);