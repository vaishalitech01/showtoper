import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { credentials, emailKeys, regexPatterns } from "../key/key";
import { contactConfig } from "../config/credential";
import axios from "axios";

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
    newErrors.mobile = "Please enter a valid mobile number";
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
          message: `Hello Satyam Developers, this is ${formData.name}. I'm interested in your property and would love to have a brief discussion at your convenience.`,
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
      setFormData({ name: "", mobile: "", email: "" });
    } else {
      setShowFailureAlert(true);
    }

    setLoading(false);
  };

  return (
    <div className="hidden md:flex max-w-md mx-auto bg-white min-h-screen flex-col shadow-lg border border-gray-100 sticky top-0">
      {/* Header */}
      <div className="bg-slate-300 flex flex-col items-center">
        <div
          onClick={onRequestCallBack}
          className="animated-gradient  text-white w-full py-1 rounded-b-3xl text-center text-lg cursor-pointer shadow-md"
        >
          {contactConfig.displayPhone}
        </div>

        <button
          onClick={onRequestCallBack}
          className="mt-1 mb-2 animated-gradient  text-white px-10 py-1 rounded-lg text-lg shadow-inner hover:bg-[#8e693c]"
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
          <div>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full border border-gray-400 rounded-lg p-2 outline-none focus:ring-1 focus:ring-[#A67C48]"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email (Optional)"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border border-gray-400 rounded-lg p-2 outline-none focus:ring-1 focus:ring-[#A67C48]"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
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
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={loading}
              className="animated-gradient text-white px-6 py-2.5 rounded-full text-sm shadow-md hover:opacity-90"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
          <div className="mt-auto p-6">
            <a
              href={`https://wa.me/${
                contactConfig.phoneNumber
              }?text=${encodeURIComponent(contactConfig.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg px-4 py-3 shadow-md hover:shadow-lg transition-all duration-200 group"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
              />
              <span className="text-gray-700 font-medium text-sm">
                Get Instant Response
              </span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RightForm;
