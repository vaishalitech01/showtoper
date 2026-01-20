import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    mobile: { type: String, required: true },
    message: { type: String },
    source: { type: String, required: true },
    status: { type: String, enum: ['in-progress', 'completed', 'cancelled', 'contacted'], default: 'in-progress' }
}, { timestamps: true });

const Form = mongoose.model('Form', formSchema);

export default Form;