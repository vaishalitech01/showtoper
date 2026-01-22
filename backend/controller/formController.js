import Form from "../database/models/Form.js";

export const submitForm = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { name, email, mobile, message, source } = req.body;
    console.log("Parsed Data:", { name, email, mobile, message, source });
    if(!name || !mobile) {
      return res.status(400).json({ message: "Name and Mobile are required" });
    }
    const newForm = new Form({ name, email, mobile, message, source });
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

export const updateFormStatus = async (req, res) => {
  try {
    console.log("Update Status Request Params:", req.params);
    console.log("Update Status Request Body:", req.body);
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = [
      'in-progress',
      'completed',
      'cancelled',
      'contacted'
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedForm = await Form.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json({
      message: "Form status updated successfully",
      form: updatedForm,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update form status",
      error: error.message,
    });
  }
};

export const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedForm = await Form.findByIdAndDelete(id);
    
    if (!deletedForm) {
      return res.status(404).json({ message: "Form not found" });
    }
    
    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete form", error: error.message });
  }
};
