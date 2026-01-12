import React, { useState } from 'react';
import { User, Phone, X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { emailKeys } from '../key/key';
import axios from 'axios';

const baseurl = import.meta.env.VITE_BASE_API_URL;

const OfferPriceForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
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
      },
      emailKeys.publicKey
    );

    // 3️⃣ Success
    setShowSuccessAlert(true);
    setFormData({ name: '', mobile: ''});

  } catch (error) {
    console.error(error);
    setShowFailureAlert(true);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden relative">

        {/* Header */}
        <div className="bg-[#a37a4c] p-4 flex justify-between items-center">
          <h2 className="text-white text-2xl font-medium w-full text-center ml-6">
            Get Offer Price
          </h2>
          <button onClick={onClose} className="text-white">
            <X size={24} />
          </button>
        </div>

        {/* Alerts */}
        {showSuccessAlert && (
          <div className="bg-green-100 text-green-700 text-center py-2">
            Request sent successfully ✅
          </div>
        )}
        {showFailureAlert && (
          <div className="bg-red-100 text-red-700 text-center py-2">
            Failed to send request ❌
          </div>
        )}

        {/* Form */}
        <form className="p-8 space-y-6" onSubmit={handleSubmit}>

          {/* Name */}
          <div className="flex border border-gray-400 rounded-md overflow-hidden">
            <div className="bg-[#546671] p-3 min-w-12.5 flex justify-center">
              <User className="text-white" size={20} />
            </div>
            <input
              type="text"
              placeholder="Name *"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full p-3 outline-none"
            />
          </div>

          {/* Mobile */}
          <div className="flex border border-gray-400 rounded-md overflow-hidden">
            <div className="bg-[#546671] p-3 min-w-12.5 flex justify-center">
              <Phone className="text-white" size={20} />
            </div>
            <input
              type="tel"
              placeholder="Mobile *"
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
              required
              className="w-full p-3 outline-none"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#a37a4c] text-white px-12 py-3 rounded-full text-xl hover:bg-[#8e6a41]"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfferPriceForm;
