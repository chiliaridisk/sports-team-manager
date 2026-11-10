import { Router } from 'express';
import { playerController } from '../controllers/playerController';
import { authenticate } from '../middleware/authMiddleware';
import { authorize } from '../middleware/roleMiddleware';


const router = Router();

router.use(authenticate);

//All logged in Users
router.get('/', playerController.getAll);  //list of all players
router.get('/me', playerController.getMine); //my profile
router.get('/:id', playerController.getById); //one player by id

router.post('/' , authorize('admin'), playerController.create); //create new player
router.put('/:id', authorize('admin'), playerController.update); //update player by id
router.delete('/:id', authorize('admin'), playerController.delete); //delete player by id   

export default router;
