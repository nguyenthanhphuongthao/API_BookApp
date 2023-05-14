import * as controllers from '../controllers';
import { verifyToken } from '../middlewares/verify_token';
import { isAdmin } from '../middlewares/verify_role';
import express from 'express';

const router = express.Router();

//public routes
router.get('/', controllers.listBooks);

//private routes
router.use(verifyToken);


router.use(isAdmin);
router.post('/', controllers.createBook);
router.put('/', controllers.updateBook);
router.post('/delete', controllers.deleteBooks);

module.exports = router;