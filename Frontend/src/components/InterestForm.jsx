import React, { useState } from 'react';
import { X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { credentials, emailKeys, regexPatterns } from '../key/key';
import axios from 'axios';

const baseurl = import.meta.env.VITE_BASE_API_URL;

const InterestForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", mobile: "" });

const validateForm = (formData) => {
  const { name, email, mobile } = formData;
  const { namePattern, emailPattern, mobilePattern } = regexPatterns;
  const newErrors = { name: "", email: "", mobile: "" };

  if (!namePattern.test(name)) {
    newErrors.name = "Name must be 2-50 characters (letters only)";
  }

  if (email && !emailPattern.test(email)) {
    newErrors.email = "Invalid email format";
  }

  if (!mobilePattern.test(mobile)) {
    newErrors.mobile = "Mobile must be 10 digits";
  }

  setErrors(newErrors);
  return !newErrors.name && !newErrors.email && !newErrors.mobile;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setShowSuccessAlert(false);
  setShowFailureAlert(false);

  if (!validateForm(formData)) {
    return;
  }

  setLoading(true);
  let backendSuccess = false;
  let emailSuccess = false;

  // 1️⃣ Submit to backend
  try {
    const response = await axios.post(`${baseurl}/forms/submit`, formData);
    if (response.status === 201) {
      backendSuccess = true;
    }
  } catch (error) {
    console.error('Backend submission failed:', error);
  }

  // 2️⃣ Send Email via EmailJS
  try {
    await emailjs.send(
      emailKeys.serviceId,
      emailKeys.templateId,
      {
        user_name: formData.name,
        user_phone: formData.mobile,
        user_email: formData.email,
        web_url: credentials.web_url,
        web_name: credentials.web_name,
        logo_url: credentials.logo_url,
        message: 'Interest form submission'
      },
      emailKeys.publicKey
    );
    emailSuccess = true;
  } catch (error) {
    console.error('Email submission failed:', error);
  }

  // 3️⃣ Show result
  if (backendSuccess || emailSuccess) {
    setShowSuccessAlert(true);
    setFormData({ name: '', mobile: '', email: '' });
    // Notify parent that form was submitted
    setTimeout(() => {
      onClose(true);
    }, 2000);
  } else {
    setShowFailureAlert(true);
  }

  setLoading(false);
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl mx-4">

        {/* Header */}
        <div className="relative animated-gradient py-4 text-center">
          <h2 className="text-2xl font-semibold text-white">
            Express Your Interest
          </h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
          >
            <X size={28} strokeWidth={3} />
          </button>
        </div>

        {/* Alerts */}
        {showSuccessAlert && (
          <div className="bg-green-100 text-green-700 text-center py-2">
            Interest submitted successfully ✅
          </div>
        )}

        {showFailureAlert && (
          <div className="bg-red-100 text-red-700 text-center py-2">
            Failed to submit interest ❌
          </div>
        )}

        {/* Content */}
        <div className="px-8 pt-6 pb-10 flex flex-col items-center">

          {/* Logo */}
          <div className="mb-6 bg-black p-4 rounded-sm border border-yellow-600/50 w-full max-w-[320px] text-center shadow-lg">
            <div className="text-[10px] tracking-[0.3em] text-gray-300 uppercase">
              Codename
            </div>
            <div className="text-2xl font-serif tracking-widest text-[#D4AF37] font-light">
              SHOWSTOPPER
            </div>
            <div className="text-[10px] tracking-[0.2em] text-gray-300 uppercase border-t border-gray-700 mt-1 pt-1">
              Navi - Mumbai
            </div>
          </div>

          <p className="text-gray-700 font-medium mb-6 text-center">
            Please Enter Your Details To Learn More About This Project
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-4">

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-[#A67C52]/50"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-[#A67C52]/50"
                />
                {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
              </div>
            </div>

            <div>
              <input
                type="email"
                placeholder="Email (Optional)"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-[#A67C52]/50"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Submit */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="animated-gradient text-white text-xl px-16 py-3 rounded-full shadow-lg hover:brightness-110 active:scale-95"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InterestForm;
