import * as controllers from '../controllers';
import express from 'express';
import { verifyTokenRegister } from '../middlewares/verify_token';

const router = express.Router();

router.post('/register', controllers.register);
router.post('/resend-verify', controllers.resendVerify);
router.post('/send-otp', controllers.sendOTP);
router.post('/check-otp', controllers.checkOTP);
router.put('/reset-password', controllers.resetPassword);
router.use(verifyTokenRegister);

router.get('/verify', controllers.verify);


module.exports = router;