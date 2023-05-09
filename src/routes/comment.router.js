import * as controllers from '../controllers';
import { verifyToken } from '../middlewares/verify_token';
import { isAdmin } from '../middlewares/verify_role';
import express from 'express';

const router = express.Router();

//public routes
router.get('/', controllers.listComments);

//private routes
router.use(verifyToken);
router.post('/', controllers.createComment);
router.put('/', controllers.updateComment);
router.delete('/', controllers.deleteComments);

//router.use(isAdmin);

module.exports = router;