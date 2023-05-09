import * as controllers from '../controllers';
import { verifyToken } from '../middlewares/verify_token';
import { isAdmin } from '../middlewares/verify_role';
import express from 'express';

const router = express.Router();

//public routes
router.get('/', controllers.listPublishers);

//private routes
router.use(verifyToken);


router.use(isAdmin);
router.post('/', controllers.createPublisher);
router.put('/', controllers.updatePublisher);
router.delete('/', controllers.deletePublishers);

module.exports = router;