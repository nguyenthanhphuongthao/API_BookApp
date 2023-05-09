import * as controllers from '../controllers';
import express from 'express';
import { verifyToken } from '../middlewares/verify_token';

const router = express.Router();

//Sau khi đã verify email
router.post('/login', controllers.login);
//Sau khi đã login
router.use(verifyToken);
router.put('/change-password', controllers.changePassword);
router.post('/refresh-token', controllers.refreshToken);
router.post('/logout', controllers.logout);


module.exports = router;