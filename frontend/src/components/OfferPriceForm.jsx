import React, { useState } from 'react';
import { User, Phone, X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { credentials, emailKeys, regexPatterns, baseurl } from '../key/key';
import { createMessageWithAddress, messageTemplates } from '../key/messageUtils';
import axios from 'axios';

const OfferPriceForm = ({ onClose, type }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    source:'satyammetroshowstoppers.in',
  });

  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const [errors, setErrors] = useState({ name: "", mobile: "" });

const validateForm = (formData) => {
  const { name, mobile } = formData;
  const { namePattern, mobilePattern } = regexPatterns;
  const newErrors = { name: "", mobile: "" };

  if (!namePattern.test(name)) {
    newErrors.name = "Name must be 2-50 characters (letters only)";
  }

  if (!mobilePattern.test(mobile)) {
    newErrors.mobile = "Mobile must be 10 digits";
  }

  setErrors(newErrors);
  return !newErrors.name && !newErrors.mobile;
};

let formHeader = "Get Offer Price";
if(type==='floor plan'){
  formHeader = 'Floor Plan';
}
else if(type==='layout plan'){
  formHeader = 'Layout Plan';
}
else if(type==='price-breakup'){
  formHeader = 'Price Breakup';
}
else if(type==='costing-details'){
  formHeader = 'Complete Costing Details';
}

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

  // Create messages with address
  const backendMessage = createMessageWithAddress(messageTemplates.offerPrice, formData.name);
  const emailMessage = createMessageWithAddress(messageTemplates.offerPrice, formData.name);

  // 1️⃣ Submit to backend
  try {
    const response = await axios.post(`${baseurl}/forms/submit`, {
      ...formData,
      message: backendMessage
    });
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
        user_email: '',
        web_url: credentials.web_url,
        web_name: credentials.web_name,
        logo_url: credentials.logo_url,
        message: emailMessage
  },
      emailKeys.publicKey
    );
    emailSuccess = true;
  } catch (error) {
    console.error('Email submission failed:', error);
  }

  // 3️⃣ Show result
  if (backendSuccess || emailSuccess) {
    // Track conversion with gtag
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {
        'send_to': 'AW-17844583964/ZmpsCTocuobE2s-rxC',
        'value': 1.0,
        'currency': 'INR',
        'event_callback': function() {
          console.log('Offer price form conversion tracked');
        }
      });
    }
    setShowSuccessAlert(true);
    setFormData({ name: '', mobile: '', source:'satyammetroshowstoppers.in' });
  } else {
    setShowFailureAlert(true);
  }

  setLoading(false);
};


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden relative">

        {/* Header */}
        <div className="bg-[#a37a4c] p-4 flex justify-between items-center">
          <h2 className="text-white text-2xl font-medium w-full text-center ml-6">
            {formHeader}
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
          <div>
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
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Mobile */}
          <div>
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
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
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
