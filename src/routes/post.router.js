import * as controllers from '../controllers';
import { verifyToken } from '../middlewares/verify_token';
import { isAdmin } from '../middlewares/verify_role';
import uploadCloud from '../middlewares/uploadMedia';
import express from 'express';

const router = express.Router();

//public routes
router.get('/', controllers.listPosts);

//private routes
router.use(verifyToken);
router.post('/', uploadCloud.single('image'), controllers.createPost);
router.put('/', controllers.updatePost);
router.put('/status', controllers.updateStatusPost);
router.delete('/', controllers.deletePosts);

//router.use(isAdmin);

module.exports = router;