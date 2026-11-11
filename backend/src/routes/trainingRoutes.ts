import {Router} from 'express';
import { trainingController } from '../controllers/trainingController';
import  {authenticate} from '../middleware/authMiddleware';
import { authorize } from '../middleware/roleMiddleware';

const router = Router();

router.use(authenticate);

router.get('/', trainingController.getAll);
router.get('/:id', trainingController.getById);

//only coach andmin
router.post('/', authorize('admin'), trainingController.create);
router.put('/:id', authorize('admin'), trainingController.update);
router.delete('/:id', authorize('admin'), trainingController.delete); 

export default router;