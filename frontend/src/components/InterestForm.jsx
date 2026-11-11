import React, { useState } from 'react';
import { User, Phone, X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { credentials, emailKeys, regexPatterns, baseurl } from '../key/key';
import { createMessageWithAddress, messageTemplates } from '../key/messageUtils';
import { apiPostRequest } from "../utils/api/post";
import satyamLogo from "../assets/satyam-metro-logo.avif";
const InterestForm = ({ onClose, mode }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    source:'satyammetroshowstoppers.in',
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
    newErrors.mobile = "Mobile must be 10 digits";
  }

  setErrors(newErrors);
  return !newErrors.name && !newErrors.email && !newErrors.mobile;
};
let formHeader = "Express Your Interest";
if(mode==='callback'){
  formHeader = 'Request a Callback';
}
else if(mode==='brochure'){
  formHeader = 'Download Brochure';
}
else if(mode==='download brochure'){
  formHeader = 'Download Brochure';
}


const handleSubmit = async (e) => {
  e.preventDefault();

  setShowSuccessAlert(false);
  setShowFailureAlert(false);
  setConsentError(false);

  if (!consentChecked) {
    setConsentError(true);
    return;
  }

  // Prepare dynamic message based on mode
  let messageTemplate = messageTemplates.general;

  if (mode === "callback") {
    messageTemplate = messageTemplates.callback;
  }

  const backendMessage = createMessageWithAddress(
    messageTemplate,
    formData.name
  );

  const emailMessage = createMessageWithAddress(
    messageTemplate,
    formData.name
  );

  if (!validateForm(formData)) {
    return;
  }

  setLoading(true);

  let backendSuccess = false;
  let emailSuccess = false;

  const cleanedMobile = formData.mobile
    .replace(/\D/g, "")
    .slice(-10);

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
        send_to: "AW-17844583964/2mpsCJroou0bEJz8-rxC",
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
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3">

    <div className="relative w-full max-w-md overflow-hidden bg-white shadow-2xl mx-3">

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-3 top-3 z-10 text-gray-500 hover:text-[var(--clr-p)] transition-colors"
      >
        <X size={21} />
      </button>

      {/* Logo */}
      <div className="flex justify-center pt-6 pb-2">
        <img
          src={satyamLogo}
          alt="Satyam Metro Showstopper Logo"
          className="w-40 h-auto object-contain"
        />
      </div>

      {/* Heading */}
      <div className="px-4 pb-3 text-center">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
          {formHeader}
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Please enter your details to learn more about this project.
        </p>
      </div>

      {/* Alerts */}
      {showSuccessAlert && (
        <div className="mx-4 bg-green-100 text-green-700 text-center text-xs py-2">
          Interest submitted successfully ✅
        </div>
      )}

      {showFailureAlert && (
        <div className="mx-4 bg-red-100 text-red-700 text-center text-xs py-2">
          Failed to submit interest ❌
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-4 pt-2 pb-4 space-y-3">

        {/* Name and Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Name *"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full rounded-none border-0 border-b border-gray-300 px-3 py-3 text-sm text-gray-800 outline-none focus:border-[var(--clr-p)] placeholder:text-gray-500"
            />

            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <div className="flex items-center border-b border-gray-300 focus-within:border-[var(--clr-p)]">
              <span className="px-2 text-sm text-[var(--clr-p)]">
                +91
              </span>

              <input
                type="tel"
                inputMode="numeric"
                placeholder="Mobile *"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    mobile: e.target.value.replace(/\D/g, "").slice(0, 10)
                  })
                }
                required
                maxLength={10}
                className="w-full rounded-none px-2 py-3 text-sm outline-none placeholder:text-gray-500"
              />
            </div>

            {errors.mobile && (
              <p className="text-red-500 text-xs mt-1">
                {errors.mobile}
              </p>
            )}
          </div>

        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email (Optional)"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full rounded-none border-0 border-b border-gray-300 px-3 py-3 text-sm text-gray-800 outline-none focus:border-[var(--clr-p)] placeholder:text-gray-500"
          />

          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Consent */}
        <div className="space-y-1 pt-1">
          <label className="flex items-start gap-2 cursor-pointer">

            <input
              type="checkbox"
              checked={consentChecked}
              onChange={(e) => {
                setConsentChecked(e.target.checked);
                setConsentError(false);
              }}
              className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[var(--clr-p)]"
            />

            <span className="text-[10px] text-gray-500 leading-relaxed">
              I agree to the{" "}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--clr-p)] hover:underline"
              >
                Privacy Policy
              </a>
              . Your data is safe and secure with us.
            </span>

          </label>

          {consentError && (
            <p className="text-red-500 text-xs font-medium">
              Please accept the consent to proceed.
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            disabled={loading}
            style={{
              background: "linear-gradient(135deg, var(--clr-p), var(--clr-s))"
            }}
            className="w-full sm:w-auto px-10 py-2.5 text-sm font-semibold text-white rounded-sm shadow-sm hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>

      </form>

      {/* Contact Footer */}
      <a
        href="tel:+919167478723"
        style={{
          background: "linear-gradient(135deg, var(--clr-p), var(--clr-s))"
        }}
        className="flex items-center justify-center gap-2 py-2.5 text-white hover:opacity-90 transition-all"
      >
        <Phone size={16} fill="white" />
        <span className="text-base font-medium">
          +91 9167478723
        </span>
      </a>

    </div>
  </div>
);

};

export default InterestForm;
