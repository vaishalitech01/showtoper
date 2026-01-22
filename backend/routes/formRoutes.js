import express from 'express';
import { getForms, submitForm, updateFormStatus, deleteForm } from '../controller/formController.js';
const router = express.Router();

router.post('/submit', submitForm);
router.get('/', getForms);
router.patch('/status/:id', updateFormStatus);
router.delete('/:id', deleteForm);

export default router;