// routes/formRoutes.js
import express from 'express';
import * as FormController from '../controllers/form.controller.js';

const router = express.Router();

// Save form (POST)
router.post("/save", FormController.save);

// Fetch forms by category name (GET)
router.get("/cat/:catName", FormController.fetch);

router.get("/full", FormController.full);

router.delete("/delete",FormController.deleteForm);

export default router;
