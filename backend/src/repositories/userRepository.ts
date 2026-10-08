import {User , UserRole} from '../models/User';

//Στοιχεία που χρειάζονται για new user
type NewUser = {
  name: string;
  email: string;
  password: string;
  role?: UserRole; // Προαιρετικό, default είναι 'player'
};

export const userRepository = {


findByEmail: async (email: string) => { 
        return User.findOne({email: email.toLowerCase()});
},

findById: async (id: string) => {
    return User.findById(id);
},

create: async (data: NewUser) => {
    return User.create(data);
},
};