import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { credentials, emailKeys, regexPatterns, baseurl } from "../key/key";
import { contactConfig } from "../config/credential";
import { createMessageWithAddress, messageTemplates } from "../key/messageUtils";
import { apiPostRequest } from "../utils/api/post";
import poster from "../assets/Poster/ShowStopper_Poster_2.avif";
const RightForm = ({ onRequestCallBack, onChatBotClick }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    source: 'satyammetroshowstoppers.in',
  });

  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", mobile: "" });
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentError, setConsentError] = useState(false);

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
  setConsentError(false);

  if (!consentChecked) {
    setConsentError(true);
    return;
  }

  if (!validateForm(formData)) {
    return;
  }

  setLoading(true);

  let backendSuccess = false;
  let emailSuccess = false;

  const cleanedMobile = formData.mobile
    .replace(/\D/g, "")
    .slice(-10);

  // Create messages with address
  const backendMessage = createMessageWithAddress(
    messageTemplates.general,
    formData.name
  );

  const emailMessage = createMessageWithAddress(
    messageTemplates.general,
    formData.name
  );

  // 1. Submit to backend
  try {
    const contactRequestData = {
      name: formData.name.trim(),
      mobileNumber: cleanedMobile,
      email: formData.email || "",
      remark: backendMessage,
      source: "MANUAL",
      status: "NEW",
      propertyName: "Satyam Metro Showstoppers",
    };

    const response = await apiPostRequest({
      apiUrl: "/contact-requests",
      content_type: "application/json",
      data: contactRequestData,
    });

    if (response.status === 200 || response.status === 201) {
      backendSuccess = true;
    }

  } catch (error) {
    console.error("Backend submission failed:", error);
    console.error("Backend response:", error.response?.data);
    console.error("Status code:", error.response?.status);
  }

  // 2. Send Email via EmailJS
  try {
    await emailjs.send(
      emailKeys.serviceId,
      emailKeys.templateId,
      {
        user_name: formData.name,
        user_phone: cleanedMobile,
        user_email: formData.email || "Email not provided",
        web_url: credentials.web_url,
        web_name: credentials.web_name,
        logo_url: credentials.logo_url,
        message: emailMessage,
      },
      emailKeys.publicKey
    );

    emailSuccess = true;

  } catch (error) {
    console.error("Email submission failed:", error);
  }

  // 3. Show result
  if (backendSuccess || emailSuccess) {

    // Google Ads conversion tracking
    if (
      typeof window !== "undefined" &&
      typeof window.gtag === "function"
    ) {
      window.gtag("event", "conversion", {
        send_to: "AW-17844583964/2mpsCJroou0bEJz8-rx",
        event_callback: function () {
          console.log("Chatbot form conversion tracked");
        },
      });
    }

    setShowSuccessAlert(true);

    setFormData({
      name: "",
      mobile: "",
      email: "",
      source: "satyammetroshowstoppers.in",
    });

    setConsentChecked(false);

  } else {
    setShowFailureAlert(true);
  }

  setLoading(false);
};


  return (
  
<div className="hidden lg:flex max-w-md mx-auto bg-white min-h-screen flex-col shadow-xl border border-[#9e7242]/30 sticky top-0">

  {/* Header */}
  <div className="flex flex-col items-center">

    <div
      onClick={onRequestCallBack}
      className="animated-gradient text-white w-full py-2 text-center text-sm font-semibold tracking-wide cursor-pointer shadow-sm"
    >
      Get a Best Deal
    </div>

    <button
      onClick={onRequestCallBack}
      className="animated-gradient mt-3 mb-2 text-white px-7 py-2 text-sm font-semibold rounded-sm shadow-md hover:opacity-90 transition-opacity"
    >
      Request a Call Back
    </button>
  </div>

  {/* Form Section */}
  <div className="px-4 py-3 flex flex-col">

    <h2 className="text-center text-slate-800 text-sm font-semibold mb-1">
      Pre-Register for the Best Offers
    </h2>

    <p className="text-center text-gray-500 text-[11px] mb-4">
      Share your details and our team will contact you.
    </p>

    {/* Alerts */}
    {showSuccessAlert && (
      <div className="text-green-600 text-center text-xs mb-3">
        Submitted successfully ✅
      </div>
    )}

    {showFailureAlert && (
      <div className="text-red-600 text-center text-xs mb-3">
        Submission failed ❌
      </div>
    )}

    <form onSubmit={handleSubmit}>
      <div className="bg-[#9e7242]/[0.05] border border-[#9e7242]/20 p-3 space-y-3">

        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
            className="w-full border border-gray-300 bg-white rounded-sm px-3 py-2.5 text-xs text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:border-[var(--clr-p)] focus:ring-1 focus:ring-[var(--clr-p)]/20"
          />
          {errors.name && (
            <p className="text-red-500 text-[10px] mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email Address (Optional)"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full border border-gray-300 bg-white rounded-sm px-3 py-2.5 text-xs text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:border-[var(--clr-p)] focus:ring-1 focus:ring-[var(--clr-p)]/20"
          />
          {errors.email && (
            <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>
          )}
        </div>

        {/* Mobile */}
        <div>
          <input
            type="tel"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
            required
            className="w-full border border-gray-300 bg-white rounded-sm px-3 py-2.5 text-xs text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:border-[var(--clr-p)] focus:ring-1 focus:ring-[var(--clr-p)]/20"
          />
          {errors.mobile && (
            <p className="text-red-500 text-[10px] mt-1">{errors.mobile}</p>
          )}
        </div>

        {/* Consent */}
        <div className="pt-1">
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={(e) => {
                setConsentChecked(e.target.checked);
                setConsentError(false);
              }}
              className="mt-0.5 w-3.5 h-3.5 shrink-0 accent-[var(--clr-p)] cursor-pointer"
            />

            <span className="text-[10px] text-gray-600 leading-relaxed">
              I agree to the{" "}
              <a href="/privacy" className="text-[var(--clr-p)] font-semibold hover:underline">
                Privacy Policy
              </a>
              . Your data is safe and secure with us.
            </span>
          </label>

          {consentError && (
            <p className="text-red-500 text-[10px] font-medium mt-1">
              Please accept the consent to proceed.
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="animated-gradient w-full text-white py-2.5 text-xs font-semibold rounded-sm shadow-sm hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {loading ? "Submitting..." : "SUBMIT ENQUIRY"}
        </button>

      </div>
    </form>

    {/* Advertisement Poster */}
    <a
      href="https://virtualrealty.org.in/properties/14/luxury-residential-developments-featuring-2-3-and-4-bhk-configurations-in-sector-20-kharghar"
      target="_blank"
      rel="noopener noreferrer"
      className="relative block mt-4 overflow-hidden"
    >
      <span className="absolute top-2 left-2 z-10 bg-black/80 text-white text-[9px] font-semibold tracking-widest px-2 py-1 rounded-sm">
        AD
      </span>

      <img
        src={poster}
        alt="Satyam Metro Showstopper"
        className="h-48 w-full border border-[#9e7242]/50 p-1 object-cover bg-white rounded-sm hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
      />
    </a>

  </div>
</div>

  );
};

export default RightForm;
