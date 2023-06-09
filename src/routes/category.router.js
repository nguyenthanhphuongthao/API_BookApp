import * as controllers from '../controllers';
import { verifyToken } from '../middlewares/verify_token';
import { isAdmin } from '../middlewares/verify_role';
import express from 'express';

const router = express.Router();

//public routes
router.get('/', controllers.listCategories);

//private routes
router.use(verifyToken);


router.use(isAdmin);
router.post('/', controllers.createCategory);
router.put('/', controllers.updateCategory);
router.delete('/', controllers.deleteCategories);

module.exports = router;