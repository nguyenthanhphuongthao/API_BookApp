import * as controllers from '../controllers';
import { verifyToken } from '../middlewares/verify_token';
import { isAdmin } from '../middlewares/verify_role';
import express from 'express';

const router = express.Router();

//public routes
router.get('/', controllers.listReviews);

//private routes
router.use(verifyToken);
router.post('/', controllers.createReview);
router.put('/', controllers.updateReview);
router.delete('/', controllers.deleteReviews);

//router.use(isAdmin);

module.exports = router;