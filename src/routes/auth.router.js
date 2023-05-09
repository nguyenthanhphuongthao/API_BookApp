import * as controllers from '../controllers';
import express from 'express';
import { verifyTokenRegister } from '../middlewares/verify_token';

const router = express.Router();

router.post('/register', controllers.register);
router.post('/resend-verify', controllers.resendVerify);
router.use(verifyTokenRegister);
router.get('/verify', controllers.verify);


module.exports = router;