import express from 'express';
import * as CategoryController from '../controllers/category.controller.js';

const router = express.Router();

router.post('/save',CategoryController.save);

router.get('/fetch',CategoryController.fetch)

router.delete('/delete',CategoryController.deleteCategory)
export default router;