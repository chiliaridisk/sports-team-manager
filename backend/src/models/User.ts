import {Schema, model} from 'mongoose';

export type UserRole = 'admin' | 'player';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'player'], default: 'player' },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);