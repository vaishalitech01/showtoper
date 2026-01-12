import React, { useRef, useState } from 'react';
import { User, Phone, Mail, X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { emailKeys } from '../key/key';
import axios from 'axios';

const baseurl = import.meta.env.VITE_BASE_API_URL;

const BrochureForm = ({ onClose }) => {
  const form = useRef();

  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
  });


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setShowSuccessAlert(false);
  setShowFailureAlert(false);

  try {
    // 1️⃣ Submit to backend
    const response = await axios.post(
      `${baseurl}/forms/submit`,
      formData
    );

    if (response.status !== 201) {
      throw new Error('Backend submission failed');
    }

    // 2️⃣ Send Email via EmailJS
    await emailjs.send(
      emailKeys.serviceId,
      emailKeys.templateId,
      {
        from_name: formData.name,
        mobile: formData.mobile,
        from_email: formData.email,
      },
      emailKeys.publicKey
    );

    // 3️⃣ Success
    setShowSuccessAlert(true);
    setFormData({ name: '', mobile: '', email: '' });

  } catch (error) {
    console.error(error);
    setShowFailureAlert(true);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden relative">

        {/* Header */}
        <div className="bg-[#a67c4d] p-4 flex justify-between">
          <h2 className="text-white text-lg">
            Mention your WhatsApp number to receive Brochure
          </h2>
          <button onClick={onClose} className="text-white">
            <X size={24} />
          </button>
        </div>

        {/* Alerts */}
        {showSuccessAlert && (
          <div className="bg-green-100 text-green-700 text-center py-2">
            Brochure request sent successfully ✅
          </div>
        )}
        {showFailureAlert && (
          <div className="bg-red-100 text-red-700 text-center py-2">
            Failed to send request ❌
          </div>
        )}

        {/* Form */}
        <form ref={form} onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* Name */}
          <div className="flex border rounded-md">
            <div className="bg-[#54656f] p-3">
              <User className="text-white" />
            </div>
            <input
              name="from_name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 outline-none"
            />
          </div>

          {/* Mobile */}
          <div className="flex border rounded-md">
            <div className="bg-[#54656f] p-3">
              <Phone className="text-white" />
            </div>
            <input
              name="mobile"
              type="tel"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
              required
              className="w-full px-4 outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex border rounded-md">
            <div className="bg-[#54656f] p-3">
              <Mail className="text-white" />
            </div>
            <input
              name="from_email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full px-4 outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-b from-[#d09a63] to-[#a67c4d] text-white py-3 rounded-full text-lg"
          >
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BrochureForm;
