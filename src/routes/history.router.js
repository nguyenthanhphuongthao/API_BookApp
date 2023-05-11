import * as controllers from '../controllers';
import { verifyToken } from '../middlewares/verify_token';
import { isAdmin } from '../middlewares/verify_role';
import express from 'express';

const router = express.Router();

//public routes
router.get('/', controllers.listHistories);

//private routes
router.use(verifyToken);
router.post('/', controllers.createHistory);
router.put('/', controllers.updateHistory);
router.delete('/', controllers.deleteHistory);

//router.use(isAdmin);


module.exports = router;