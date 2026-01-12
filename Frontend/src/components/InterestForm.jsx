import React, { useState } from 'react';
import { X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { emailKeys } from '../key/key';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl mx-4">

        {/* Header */}
        <div className="relative bg-[#A67C52] py-4 text-center">
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
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:ring-[#A67C52]/50"
              />

              <input
                type="text"
                placeholder="Mobile"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                required
                className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:ring-[#A67C52]/50"
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-[#A67C52]/50"
            />

            {/* Submit */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-linear-to-b from-[#B88A5B] to-[#92643B] text-white text-xl px-16 py-3 rounded-full shadow-lg hover:brightness-110 active:scale-95"
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
