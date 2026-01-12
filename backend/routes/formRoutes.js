import express from 'express';
import { getForms, submitForm } from '../controller/formController.js';
const router = express.Router();

router.post('/submit', submitForm);
router.get('/', getForms);

export default router;