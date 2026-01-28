import React, { useRef, useState } from "react";
import { User, Phone, Mail, X } from "lucide-react";
import emailjs from "@emailjs/browser";
import { credentials, emailKeys, regexPatterns, baseurl } from "../key/key";
import { createMessageWithAddress, messageTemplates } from "../key/messageUtils";
import axios from "axios";

const BrochureForm = ({ onClose }) => {
  const form = useRef();

  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", mobile: "" });

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    source: "satyammetroshowstoppers.in",
  });

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
    const backendMessage = createMessageWithAddress(messageTemplates.brochureRequest, formData.name);
    const emailMessage = createMessageWithAddress(messageTemplates.brochureRequest, formData.name);

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
            console.log('Brochure form conversion tracked');
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
          <div>
            <div className="flex border rounded-md">
              <div className="bg-[#54656f] p-3">
                <User className="text-white" />
              </div>
              <input
                name="from_name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full px-4 outline-none"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
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
            {errors.mobile && (
              <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <div className="flex border rounded-md">
              <div className="bg-[#54656f] p-3">
                <Mail className="text-white" />
              </div>
              <input
                name="from_email"
                type="email"
                placeholder="Email (Optional)"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 outline-none"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-b from-[#d09a63] to-[#a67c4d] text-white py-3 rounded-full text-lg"
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BrochureForm;
