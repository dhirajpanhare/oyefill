import express from 'express';

import * as AlertController from '../controllers/alerts.controller.js';

const router = express.Router();

router.post("/save",AlertController.save);

router.get("/fetch",AlertController.fetch);

router.delete("/delete",AlertController.deleteAlert);

export default router;