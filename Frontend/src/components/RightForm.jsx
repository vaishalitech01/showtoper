import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { emailKeys } from "../key/key";
import { contactConfig } from "../config/credential";
import axios from 'axios';

const baseurl = import.meta.env.VITE_BASE_API_URL;

const RightForm = ({ onRequestCallBack, onChatBotClick }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);


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
    <div className="hidden md:flex max-w-md mx-auto bg-white min-h-screen flex-col shadow-lg border border-gray-100 sticky top-0">
      {/* Header */}
      <div className="bg-slate-300 flex flex-col items-center">
        <div
          onClick={onRequestCallBack}
          className="bg-[#A67C48] text-white w-full py-1 rounded-b-3xl text-center text-lg cursor-pointer shadow-md"
        >
          {contactConfig.displayPhone}
        </div>

        <button
          onClick={onRequestCallBack}
          className="mt-1 mb-2 bg-[#A67C48] text-white px-10 py-1 rounded-lg text-lg shadow-inner hover:bg-[#8e693c]"
        >
          Request Call Back
        </button>
      </div>

      {/* Form Section */}
      <div className="px-2 py-4 flex flex-col">
        <h2 className="text-center text-black text-md mb-2">
          Pre-Register here for Best Offers
        </h2>

        {/* Alerts */}
        {showSuccessAlert && (
          <div className="text-green-600 text-center text-sm mb-2">
            Submitted successfully ✅
          </div>
        )}
        {showFailureAlert && (
          <div className="text-red-600 text-center text-sm mb-2">
            Submission failed ❌
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full border border-gray-400 rounded-lg p-2 outline-none focus:ring-1 focus:ring-[#A67C48]"
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="w-full border border-gray-400 rounded-lg p-2 outline-none focus:ring-1 focus:ring-[#A67C48]"
          />

          <input
            type="tel"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
            required
            className="w-full border border-gray-400 rounded-lg p-2 outline-none focus:ring-1 focus:ring-[#A67C48]"
          />

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-linear-to-b from-[#B8864E] to-[#D99B5C] text-white px-6 py-2.5 rounded-full text-sm shadow-md hover:opacity-90"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
           <div className="mt-auto p-6">
        <a
          href={`https://wa.me/${contactConfig.phoneNumber}?text=${encodeURIComponent(contactConfig.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg px-4 py-3 shadow-md hover:shadow-lg transition-all duration-200 group"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
          />
          <span className="text-gray-700 font-medium text-sm">Get Instant Response</span>
        </a>
      </div>
        </form>
      </div>

     
    </div>
  );
};

export default RightForm;
