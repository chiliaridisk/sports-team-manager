import {Router} from 'express';
import {authController} from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';
import { authorize } from '../middleware/roleMiddleware';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);




router.get('/me', authenticate, (req, res) => {
  res.json({ user: (req as any).user });
});

router.get('/admin-test', authenticate, authorize('admin'), (req, res) => {
  res.json({ message: 'Welcome, admin' });
});
export default router;