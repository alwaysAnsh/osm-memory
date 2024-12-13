import express from 'express';
import { adminLogin } from '../controllers/admin/admin.controller.js';


const router = express.Router();

// Admin Login Route
router.post('/admin/login', adminLogin);

export default router;
