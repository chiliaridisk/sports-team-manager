import {Router} from 'express';
import {taskController} from '../controllers/taskController';
import { authenticate } from '../middleware/authMiddleware';   
import { authorize } from '../middleware/roleMiddleware';

const router = Router();

router.use(authenticate);

router.get('/', taskController.getAll);

router.get('/training/:trainingId' , authorize('admin'), taskController.getByTraining);

router.get('/:id', taskController.getById);
router.put('/:id', taskController.update);

router.post('/' , authorize('admin'), taskController.create);
router.delete('/:id', authorize('admin'), taskController.delete);

export default router;
