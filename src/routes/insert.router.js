import * as controllers from '../controllers';
import express from 'express';

const router = express.Router();

router.post('/category', controllers.insertCategory);
router.post('/role', controllers.insertRole);
router.post('/status', controllers.insertStatus);
router.post('/publisher', controllers.insertPublisher);
router.post('/book', controllers.insertBook);



module.exports = router;