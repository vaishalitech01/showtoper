import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { credentials, emailKeys, regexPatterns, baseurl } from "../key/key";
import { createMessageWithAddress, messageTemplates } from "../key/messageUtils";
import axios from "axios";

const MobileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    source: "satyammetroshowstoppers.in",
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

    // Create messages with address
    const backendMessage = createMessageWithAddress(messageTemplates.mobile);
    const emailMessage = createMessageWithAddress(messageTemplates.mobile);

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
      console.error("Backend submission failed:", error);
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
          message: emailMessage,
        },
        emailKeys.publicKey,
      );
      emailSuccess = true;
    } catch (error) {
      console.error("Email submission failed:", error);
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
            console.log('Mobile form conversion tracked');
          }
        });
      }
      setShowSuccessAlert(true);
      setFormData({ name: "", mobile: "", email: "", source: "satyammetroshowstoppers.in" });
    } else {
      setShowFailureAlert(true);
    }

    setLoading(false);
  };

  return (
    <div className="block lg:hidden bg-white p-4 shadow-lg">
      <h2 className="text-center text-black text-md font-medium mb-4">
        Pre-Register for Best Offers
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

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full border rounded-lg p-2"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email (Optional)"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full border rounded-lg p-2"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
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
            className="w-full border rounded-lg p-2"
          />
          {errors.mobile && (
            <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full animated-gradient text-white py-2 rounded-full font-medium"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default MobileForm;
