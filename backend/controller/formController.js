import Form from "../database/models/Form.js";

export const submitForm = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { name, email, mobile, message } = req.body;
    console.log("Parsed Data:", { name, email, mobile, message });
    if(!name || !mobile) {
      return res.status(400).json({ message: "Name and Mobile are required" });
    }
    const newForm = new Form({ name, email, mobile, message });
    await newForm.save();
    res.status(201).json({ message: "Form submitted successfully", form: newForm });
  } catch (error) {
    res.status(500).json({ message: "Form submission failed", error: error.message });
  }
};

export const getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve forms", error: error.message });
  }
};