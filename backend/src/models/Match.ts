import { Schema, model, Types } from 'mongoose';

// 1. INTERFACE
export interface IMatch {
  opponent: string;
  date: Date;
  location: string;
  isHome: boolean;
  result?: {            
    ourScore: number;
    opponentScore: number;
  };
  createdBy: Types.ObjectId; 

}

// 2. SCHEMA
const matchSchema = new Schema<IMatch>(
  {
    opponent: { type: String, required: true, trim: true, maxlength: 100 },
    date: { type: Date, required: true },
    location: { type: String, required: true, trim: true },
    isHome: { type: Boolean, default: true },
    result: {
      ourScore: { type: Number, min: 0 },
      opponentScore: { type: Number, min: 0 },
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// 3. MODEL
export const Match = model<IMatch>('Match', matchSchema);