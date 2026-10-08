import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {userRepository} from '../repositories/userRepository';


export class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}


//Δημιουργία του token για τον χρήστη

const createToken = (id:string , role:string): string => {
    const secret = process.env.JWT_SECRET; //από .env
    if (!secret) {
    throw new Error('JWT_SECRET is not defined in .env');
    }

    return jwt.sign({ id, role }, secret, { expiresIn: '7d' });

};

//answer to client
const buildAuthResponse = (user: { id: string; name: string; email: string; role: string }) => {
  return {
    token: createToken(user.id, user.role),
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
};

export const authService = {
  // ΕΓΓΡΑΦΗ
  register: async (name: string, email: string, password: string) => {
    // 1. Υπάρχει ήδη χρήστης με αυτό το email;
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new HttpError(409, 'Email already in use'); // 409 = σύγκρουση
    }

    // 2. Κρυπτογραφούμε το password 
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Αποθηκεύουμε τον χρήστη με το κρυπτογραφημένο password.
    //    Δεν δίνουμε role, άρα το schema βάζει 'player'.
    const user = await userRepository.create({ name, email, password: hashedPassword });

    // 4. Γυρνάμε token και στοιχεία χρήστη
    return buildAuthResponse(user);
  },

  // ΣΥΝΔΕΣΗ
  login: async (email: string, password: string) => {
    // 1. Ψάχνουμε τον χρήστη με το email
    const user = await userRepository.findByEmail(email);

    // 2. Αν βρέθηκε, συγκρίνουμε το password που έγραψε με το κρυπτογραφημένο της βάσης
    const passwordMatches = user ? await bcrypt.compare(password, user.password) : false;

    // 3. Αν δεν βρέθηκε χρήστης ή το password είναι λάθος, ίδιο μήνυμα και στις δύο περιπτώσεις.
    //    Έτσι κανείς δεν μπορεί να ανακαλύψει ποια email υπάρχουν στο σύστημα.
    if (!user || !passwordMatches) {
      throw new HttpError(401, 'Invalid email or password'); // 401 = μη εξουσιοδοτημένος
    }

    // 4. Όλα εντάξει: γυρνάμε token και στοιχεία χρήστη
    return buildAuthResponse(user);
  },
};