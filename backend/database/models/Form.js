import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    mobile: { type: String, required: true },
    message: { type: String },
}, { timestamps: true });

const Form = mongoose.model('Form', formSchema);

export default Form;