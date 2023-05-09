import * as controllers from '../controllers';
import { verifyToken } from '../middlewares/verify_token';
import { isAdmin } from '../middlewares/verify_role';
import uploadCloud from '../middlewares/uploadMedia';
import express from 'express';

const router = express.Router();

//public routes


//private routes
router.use(verifyToken);
router.get('/', controllers.getCurrentUser);
router.get('/profile', controllers.getProfile);
router.put('/profile', controllers.updateProfile);
router.put('/avatar', uploadCloud.single('avatar'),  controllers.updateAvatar);
//router.use(isAdmin);

module.exports = router;