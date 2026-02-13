import { Router } from 'express';
import { userController } from '../controllers';

const router = Router();

router.post('/', userController.create);
router.get('/', userController.getAll);
router.get('/:id', userController.get);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;
