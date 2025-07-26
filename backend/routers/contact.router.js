import express from 'express';

import * as ContactController from '../controllers/conatct.controller.js';

const router = express.Router();

router.post("/save",ContactController.save);

router.get("/fetch",ContactController.fetch);


router.delete("/delete",ContactController.deleteMessage);

export default router;