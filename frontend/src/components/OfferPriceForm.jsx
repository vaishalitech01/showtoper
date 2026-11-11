import React, { useState } from 'react';
import { User, Phone, X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { credentials, emailKeys, regexPatterns, baseurl } from '../key/key';
import { createMessageWithAddress, messageTemplates } from '../key/messageUtils';
import { apiPostRequest } from "../utils/api/post";
import satyamLogo from "../assets/satyam-metro-logo.avif";
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
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentError, setConsentError] = useState(false);

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
    messageTemplates.offerPrice,
    formData.name
  );

  const emailMessage = createMessageWithAddress(
    messageTemplates.offerPrice,
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
        user_email: "",
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
      source: "satyammetroshowstoppers.in",
    });

    setConsentChecked(false);

  } else {
    setShowFailureAlert(true);
  }

  setLoading(false);
};



  return (
   

<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 z-50">

  <div className="bg-white w-full max-w-md shadow-xl relative overflow-hidden">

    {/* Close */}
    <button
      onClick={onClose}
      aria-label="Close"
      className="absolute top-2 right-2 text-gray-500 hover:text-[#9e7242] z-10"
    >
      <X size={21} />
    </button>

    {/* Logo */}
    <div className="flex justify-center pt-5 pb-2">
      <img
        src={satyamLogo}
        alt="Satyam Metro"
        className="w-40 h-auto object-contain"
      />
    </div>

    {/* Heading */}
    <div className="text-center px-4 pb-2">
      <h2 className="text-base sm:text-lg font-semibold text-gray-800">
        Register Here And Avail The{" "}
        <span className="text-[#f09051]">Best Offers!!</span>
      </h2>
    </div>

    {/* Alerts */}
    {showSuccessAlert && (
      <div className="mx-4 bg-green-100 text-green-700 text-center text-xs py-2">
        Request sent successfully ✅
      </div>
    )}

    {showFailureAlert && (
      <div className="mx-4 bg-red-100 text-red-700 text-center text-xs py-2">
        Failed to send request ❌
      </div>
    )}

    {/* Form */}
    <form
      className="px-4 pt-1 pb-4 space-y-3"
      onSubmit={handleSubmit}
    >

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
          className="w-full border-0 border-b border-gray-300 rounded-none px-3 py-3 text-sm text-gray-800 outline-none focus:border-[#9e7242] placeholder:text-gray-500"
        />

        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      {/* Mobile */}
      <div>
        <div className="flex items-center border-b border-gray-300 focus-within:border-[#9e7242]">
          <span className="text-sm text-[#9e7242] px-2">+91</span>

          <input
            type="tel"
            inputMode="numeric"
            placeholder="Mobile No *"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({
                ...formData,
                mobile: e.target.value.replace(/\D/g, "").slice(0, 10)
              })
            }
            required
            maxLength={10}
            className="w-full px-2 py-3 text-sm outline-none rounded-none placeholder:text-gray-500"
          />
        </div>

        {errors.mobile && (
          <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
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
            className="mt-0.5 w-3.5 h-3.5 shrink-0 accent-[#9e7242]"
          />

          <span className="text-[10px] text-gray-500 leading-relaxed">
            I give my consent for the privacy policy to apply to the
            processing of the provided data. I authorize the website
            owner and its representatives to contact me regarding
            this property through phone, text or WhatsApp.
            {" "}
            <a href="/privacy" className="text-[#9e7242] hover:underline">
              Privacy Policy
            </a>
          </span>

        </label>

        {consentError && (
          <p className="text-red-500 text-xs">
            Please accept the consent to proceed.
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-center pt-1">
        <button
          type="submit"
          disabled={loading}
          style={{
            background: "linear-gradient(135deg, var(--clr-p), var(--clr-s))"
          }}
          className="text-white text-sm font-medium px-8 py-2.5 rounded-sm hover:opacity-90 transition-all disabled:opacity-60 shadow-sm"
        >
          {loading ? "Submitting..." : "Get Instant Call Back"}
        </button>
      </div>

    </form>

    {/* Contact Footer */}
    <a
      href="tel:+919167478723"
      style={{
        background: "linear-gradient(135deg, var(--clr-p), var(--clr-s))"
      }}
      className="text-white flex items-center justify-center gap-2 py-2.5 hover:opacity-90 transition-all"
    >
      <Phone size={17} fill="white" />
      <span className="text-base font-medium">
        +91 9167478723
      </span>
    </a>

  </div>
</div>


  );
};

export default OfferPriceForm;
