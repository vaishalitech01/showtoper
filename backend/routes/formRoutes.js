import express from 'express';
import { getForms, submitForm, updateFormStatus } from '../controller/formController.js';
const router = express.Router();

router.post('/submit', submitForm);
router.get('/', getForms);
router.patch('/status/:id', updateFormStatus);

export default router;