
import { useState, useEffect, useRef } from "react";
import { FiSend, FiX, FiMessageCircle, FiPhone, FiUser } from "react-icons/fi";
import emailjs from "@emailjs/browser";

import { credentials, emailKeys,regexPatterns } from "../key/key";
import { apiPostRequest } from "../utils/api/post";

import botIcon1 from "../assets/bot1.gif";
import botIcon2 from "../assets/bot2.gif";
import botIcon3 from "../assets/bot3.gif";
import botIcon4 from "../assets/bot4.gif";

const randomBot = [
  { name: "Shital", image: botIcon1 },
  { name: "Priya Sharma", image: botIcon2 },
  { name: "Madavi Joshi", image: botIcon3 },
  { name: "Sofia", image: botIcon4 },
];

const interestOptions = [
  "🏠 Pricing & Floor Plans",
  "📄 Download Brochure",
  "💎 Get The Best Quote",
  "🏘️ Site Visit or Virtual Tour",
  "💬 Pricing on WhatsApp",
  "📞 Get A Call Back",
];

const propertyOptions = [
  { id: 1, label: "🏠 Residential Apartment", value: "Residential Apartment" },
  {
    id: 2,
    label: "🏢 Commercial Shop / Office / Showroom",
    value: "Commercial",
  },
];

const residentialPropertySubOptions = [
  "🏠 1 BHK",
  "🏡 2 BHK",
  "🏘️ 3 BHK",
  "🏢 4 BHK",
  "🏙️ 4+ BHK",
];

const commercialPropertySubOptions = [
  "Shop",
  "Office",
  "Showroom",
  "Other, Need to Discuss",
];

export default function ChatBot({ open = true, setOpen }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [currentBot] = useState(
    () => randomBot[Math.floor(Math.random() * randomBot.length)],
  );

  const [collectedData, setCollectedData] = useState({
    name: "",
    phone: "",
    interest: "",
    propertyCategory: "",
    flatType: "",
    message: "",
  });

  const [conversationStep, setConversationStep] = useState("greeting");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const [showBubble, setShowBubble] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(null);

  const messagesEndRef = useRef(null);
  const submittedRef = useRef(false);
  const submittingRef = useRef(false);
  const initializedRef = useRef(false);
  const autoSubmitTimerRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const latestDataRef = useRef(collectedData);

  useEffect(() => {
    latestDataRef.current = collectedData;
  }, [collectedData]);

  // --- Duplicate Guards ---
  const hasAlreadySubmitted = () => submittedRef.current;

  const markAsSubmitted = () => {
    submittedRef.current = true;
  };

  const resetSubmittedFlag = () => {
    submittedRef.current = false;
  };

  // --- Timer Helpers ---
  const clearAutoSubmitTimer = () => {
    if (autoSubmitTimerRef.current) {
      clearTimeout(autoSubmitTimerRef.current);
      autoSubmitTimerRef.current = null;
    }

    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }

    setSecondsLeft(null);
  };

  const startAutoSubmitTimer = (latestData) => {
    if (hasAlreadySubmitted() || submittingRef.current) return;

    clearAutoSubmitTimer();

    const durationSeconds = 30;
    setSecondsLeft(durationSeconds);

    countdownIntervalRef.current = setInterval(() => {
      setSecondsLeft((prev) =>
        prev !== null && prev > 1 ? prev - 1 : 0
      );
    }, 1000);

    autoSubmitTimerRef.current = setTimeout(() => {
      clearAutoSubmitTimer();
      submitFormData(latestData);
    }, durationSeconds * 1000);
  };

  // Clear timer when component unmounts
  useEffect(() => {
    return () => {
      if (autoSubmitTimerRef.current) {
        clearTimeout(autoSubmitTimerRef.current);
      }

      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, []);

  // --- Single Unified Submit Function ---
  const submitFormData = async (data, { silent = false } = {}) => {
    clearAutoSubmitTimer();

    // Prevent duplicate or invalid submissions
    if (
      !data?.phone ||
      submittedRef.current ||
      submittingRef.current
    ) {
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);

    const cleanedMobile = data.phone.replace(/\D/g, "").slice(-10);

    const finalMessage = `
CHATBOT LEAD DETAILS
-----------------------------
Name: ${data.name}
Mobile: ${cleanedMobile}
Interest: ${data.interest || "Not specified"}
Property Category: ${data.propertyCategory || "Not specified"}
Property Type: ${data.flatType || "Not specified"}

Additional Message:
${data.message || "No additional message"}

User Location:
${
  typeof window !== "undefined"
    ? window.user_address || "Location not available"
    : "Location not available"
}
-----------------------------
Source: Website Chatbot
Property: Satyam Metro Showstoppers
`;

    const contactRequestData = {
      name: data.name.trim(),
      mobileNumber: cleanedMobile,
      email: "",
      remark: finalMessage,
      source: "MANUAL",
      status: "NEW",
      propertyName: "Satyam Metro Showstoppers",
    };

    try {
      // Backend API + EmailJS
      const [backendResult, emailResult] = await Promise.allSettled([
        apiPostRequest({
          apiUrl: "/contact-requests",
          content_type: "application/json",
          data: contactRequestData,
        }),

        emailjs.send(
          emailKeys.serviceId,
          emailKeys.templateId,
          {
            user_name: data.name,
            user_phone: cleanedMobile,
            user_email: "Email not provided (Chatbot submission)",
            web_url: credentials.web_url,
            web_name: credentials.web_name,
            logo_url: credentials.logo_url,
            message: finalMessage,
          },
          emailKeys.publicKey
        ),
      ]);

      const backendSuccess =
        backendResult.status === "fulfilled" &&
        [200, 201].includes(backendResult.value?.status);

      const emailSuccess = emailResult.status === "fulfilled";

      if (!backendSuccess) {
        console.error(
          "Backend submission failed:",
          backendResult.status === "rejected"
            ? backendResult.reason
            : backendResult.value
        );
      }

      if (!emailSuccess) {
        console.error(
          "Email submission failed:",
          emailResult.status === "rejected"
            ? emailResult.reason
            : emailResult.value
        );
      }

      // At least one service must succeed
      const success = backendSuccess || emailSuccess;

      if (success) {
        // Mark submitted only after success
        markAsSubmitted();

        if (
          backendSuccess &&
          typeof window !== "undefined" &&
          typeof window.gtag === "function"
        ) {
          window.gtag("event", "conversion", {
            send_to: "AW-17844583964/2mpsCJroou0bEJz8-rxC",
          });
        }

        setSubmissionSuccess(true);
        setConversationStep("confirmation");

        if (!silent) {
          await simulateBotTyping(
            "Wonderful! 🎉 Thank you for sharing your details. Our team will get in touch with you shortly. We appreciate your interest in Satyam Developers! 😊",
            1000
          );
        }
      } else {
        resetSubmittedFlag();

        setSubmissionSuccess(false);
        setConversationStep("confirmation");

        if (!silent) {
          await simulateBotTyping(
            "Oops! 😔 Something went wrong while processing your request. Please try again or contact our team directly.",
            1000
          );
        }
      }
    } catch (error) {
      console.error("Lead submission error:", error);

      resetSubmittedFlag();
      setSubmissionSuccess(false);
      setConversationStep("confirmation");

      if (!silent) {
        await simulateBotTyping(
          "Oops! 😔 Something went wrong. Please try again or contact our team directly.",
          1000
        );
      }
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  // NOTE:
  // Removed visibilitychange and pagehide listeners.
  // Switching browser tabs will no longer trigger lead submission.

  // --- Auto Scroll ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  // --- Initial Greeting ---
  useEffect(() => {
    if (open && !initializedRef.current) {
      initializedRef.current = true;

      addBotMessage(
        `Hey! 👋 I'm ${currentBot.name} from Satyam Developers. How can I help you explore our amazing project?`
      );

      setConversationStep("interest");
    }
  }, [open]);

  // --- Message Helpers ---
  const addBotMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        sender: "bot",
        text,
        timestamp: new Date(),
      },
    ]);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        sender: "user",
        text,
        timestamp: new Date(),
      },
    ]);
  };

  // --- Bot Typing ---
  const simulateBotTyping = async (text, delay = 900) => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, delay));

    addBotMessage(text);
    setIsLoading(false);
  };

  // --- Interest Selection ---
  const handleInterestSelect = async (interest) => {
    addUserMessage(interest);

    const updatedData = {
      ...latestDataRef.current,
      interest,
    };

    latestDataRef.current = updatedData;
    setCollectedData(updatedData);

    setConversationStep("name");

    await simulateBotTyping(
      "Wonderful choice! ✨ May I know your name so I can assist you better?"
    );
  };

  // --- Name Submission ---
  const handleNameSubmit = async () => {
    const name = inputValue.trim();

    if (!regexPatterns.namePattern.test(name)) {
      addBotMessage(
        "Please enter a valid name (2-50 characters, letters only)."
      );
      return;
    }

    addUserMessage(name);

    const updatedData = {
      ...latestDataRef.current,
      name,
    };

    latestDataRef.current = updatedData;
    setCollectedData(updatedData);

    setInputValue("");
    setConversationStep("phone");

    await simulateBotTyping(
      `Nice to meet you, ${name}! 🤝 What's your contact number so our team can assist you?`
    );
  };

  // --- Phone Submission ---
  const handlePhoneSubmit = async () => {
    const phone = inputValue.replace(/\D/g, "");

    if (!regexPatterns.mobilePattern.test(phone)) {
      addBotMessage(
        "Please enter a valid 10-digit Indian mobile number starting with 6-9."
      );
      return;
    }

    addUserMessage(phone);

    const updatedData = {
      ...latestDataRef.current,
      phone,
    };

    latestDataRef.current = updatedData;
    setCollectedData(updatedData);

    setInputValue("");
    setConversationStep("propertyCategory");

    startAutoSubmitTimer(updatedData);

    await simulateBotTyping(
      "Perfect! Now, what type of property are you looking for?"
    );
  };

  // --- Property Category Selection ---
  const handlePropertyCategorySelect = async (option) => {
    addUserMessage(option.label);

    const updatedData = {
      ...latestDataRef.current,
      propertyCategory: option.value,
    };

    latestDataRef.current = updatedData;
    setCollectedData(updatedData);

    setConversationStep("propertyType");

    startAutoSubmitTimer(updatedData);

    await simulateBotTyping(
      option.value === "Residential Apartment"
        ? "Great! Which apartment configuration are you interested in?"
        : "Excellent! What kind of commercial property are you looking for?"
    );
  };

  // --- Property Type Selection ---
  const handlePropertyTypeSelect = async (propertyType) => {
    addUserMessage(propertyType);

    const updatedData = {
      ...latestDataRef.current,
      flatType: propertyType,
    };

    latestDataRef.current = updatedData;
    setCollectedData(updatedData);

    setConversationStep("message");

    startAutoSubmitTimer(updatedData);

    await simulateBotTyping(
      "Do you have any specific requirements or questions? Please share them with us so we can assist you better. 😊"
    );
  };

  // --- Additional Message Submission ---
  const handleMessageSubmit = async () => {
    if (isSubmitting || submittingRef.current || submittedRef.current) {
      return;
    }

    clearAutoSubmitTimer();

    const message = inputValue.trim();

    addUserMessage(message || "No additional message");

    const updatedData = {
      ...latestDataRef.current,
      message,
    };

    latestDataRef.current = updatedData;
    setCollectedData(updatedData);

    setInputValue("");

    await submitFormData(updatedData);
  };

  // --- Send Message ---
  const handleSendMessage = () => {
    if (isLoading || isSubmitting || submittingRef.current) return;

    switch (conversationStep) {
      case "name":
        handleNameSubmit();
        break;

      case "phone":
        handlePhoneSubmit();
        break;

      case "message":
        handleMessageSubmit();
        break;

      default:
        break;
    }
  };

  // --- Close Chatbot ---
  const handleClose = () => {
    clearAutoSubmitTimer();

    if (
      latestDataRef.current.phone &&
      !submittedRef.current &&
      !submittingRef.current
    ) {
      submitFormData(latestDataRef.current, {
        silent: true,
      });
    }

    setOpen(false);
  };

  // --- Visible Property Options ---
  const visiblePropertyOptions =
    collectedData.propertyCategory === "Residential Apartment"
      ? residentialPropertySubOptions
      : commercialPropertySubOptions;
return(
    <>
      {open && (
        <div className="fixed bottom-4 right-2 sm:right-4 z-50 w-[calc(100vw-16px)] sm:w-full max-w-sm">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col h-[580px] max-h-[calc(100dvh-32px)]">
            {/* Header */}
         <div
  className="p-4 text-white flex items-center gap-3 shrink-0"
  style={{
    background: "linear-gradient(135deg, #9e7242 0%, #f09051 100%)",
  }}
>
 <div className="w-10 h-10 rounded-full shrink-0 relative">
  {/* Profile Image */}
  <div className="w-full h-full bg-white rounded-full overflow-hidden">
    <img
      src={currentBot.image}
      alt={currentBot.name}
      className="w-full h-full object-cover"
    />
  </div>

  {/* Online Status */}
  <span className="absolute top-0 right-0 z-30 w-3 h-3 rounded-full bg-green-400 border-2 border-white"></span>
</div>

  <div className="flex-1">
    <h3 className="font-bold text-sm">{currentBot.name}</h3>
    <p className="text-xs opacity-90">Satyam Developers · Online</p>
  </div>

  {/* Live Countdown Pill */}
  {secondsLeft !== null && !submittedRef.current && (
    <span className="text-[8px] font-medium bg-white/20 px-2 py-0.3 rounded-full whitespace-nowrap">
      Auto-submit: {secondsLeft}s
    </span>
  )}

  <button
    className="p-1 hover:bg-white/20 rounded transition"
    onClick={handleClose}
    aria-label="Close chat"
  >
    <FiX size={18} />
  </button>
</div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-[#FAF9F7]">
              {messages.map((msg) => (
                <div key={msg.id}>
                  {msg.sender === "bot" ? (
                    <div className="flex gap-2 items-end">
                      <div className="w-7 h-7 rounded-full shrink-0 overflow-hidden">
                        <img
                          src={currentBot.image}
                          alt="Bot"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>

                      <div className="max-w-[82%] flex flex-col items-start">
                        <div
                          className="w-fit bg-[#F2EDE5] border border-[#E9E0D4] px-3 py-2 shadow-sm"
                          style={{ borderRadius: "2px 10px 10px 10px" }}
                        >
                          <p className="text-[12px] text-[#514638] leading-[1.55] whitespace-pre-line break-words">
                            {msg.text}
                          </p>
                        </div>

                        <p className="text-[9px] text-gray-400 mt-1 ml-1">
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <div className="max-w-[82%] flex flex-col items-end">
                        <div
                          className="w-fit px-3 py-2 shadow-sm"
                          style={{
                            background:
                              "linear-gradient(135deg, #A47C50 0%, #B88960 100%)",
                            borderRadius: "10px 2px 10px 10px",
                          }}
                        >
                          <p className="text-[12px] text-white leading-[1.55] whitespace-pre-line break-words">
                            {msg.text}
                          </p>
                        </div>

                        <p className="text-[9px] text-gray-400 mt-1 mr-1">
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex gap-2 items-end">
                  <div className="w-7 h-7 rounded-full shrink-0 overflow-hidden">
                    <img
                      src={currentBot.image}
                      alt="Bot"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  <div
                    className="bg-[#F2EDE5] border border-[#E9E0D4] px-3 py-2.5 shadow-sm"
                    style={{ borderRadius: "2px 10px 10px 10px" }}
                  >
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((dot) => (
                        <div
                          key={dot}
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{
                            animationDelay: `${dot * 0.2}s`,
                            background: "#9e7242",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Interest Options */}
            {conversationStep === "interest" && !isLoading && (
              <div className="p-4 bg-gray-50 shrink-0 flex justify-end">
                <div
                  className="p-3 text-white w-fit max-w-[85%]"
                  style={{
                    background:
                      "linear-gradient(135deg, #9e7242 0%, #f09051 100%)",
                    borderRadius: "12px 12px 2px 12px",
                  }}
                >
                  <p className="text-sm mb-3 font-medium">
                    What would you like to know?
                  </p>

                  <div className="space-y-2">
                    {interestOptions.map((option) => (
                      <button
                        key={option}
                        disabled={isLoading}
                        onClick={() => handleInterestSelect(option)}
                        className="w-full text-left p-2.5 rounded-md border border-white/60 text-white text-xs font-medium transition hover:bg-white hover:text-[#65503A]"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Property Category */}
            {conversationStep === "propertyCategory" && !isLoading && (
              <div className="p-4 bg-gray-50 shrink-0 flex justify-end">
                <div
                  className="p-3 text-white w-fit max-w-[85%]"
                  style={{
                    background:
                      "linear-gradient(135deg, #9e7242 0%, #f09051 100%)",
                    borderRadius: "12px 12px 2px 12px",
                  }}
                >
                  <p className="text-sm mb-3 font-medium">
                    Select your property category:
                  </p>

                  <div className="space-y-2">
                    {propertyOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handlePropertyCategorySelect(option)}
                        className="w-full text-left p-2.5 rounded-md border border-white/60 text-white text-xs font-medium transition hover:bg-white hover:text-[#65503A]"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Property Sub Options */}
            {conversationStep === "propertyType" && !isLoading && (
              <div className="p-4 bg-gray-50 shrink-0 flex justify-end">
                <div
                  className="p-3 text-white w-fit max-w-[85%]"
                  style={{
                    background:
                      "linear-gradient(135deg, #9e7242 0%, #f09051 100%)",
                    borderRadius: "12px 12px 2px 12px",
                  }}
                >
                  <p className="text-sm mb-3 font-medium">
                    Select your preferred property type:
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {visiblePropertyOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => handlePropertyTypeSelect(option)}
                        className="p-2.5 rounded-md border border-white/60 text-white text-xs font-medium transition hover:bg-white hover:text-[#65503A]"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Input */}
            {["name", "phone", "message"].includes(conversationStep) && (
              <div className="p-3.5 border-t border-[#eee9e1] bg-white shrink-0">
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center gap-2 border rounded-lg px-3 border-gray-300 focus-within:border-[#9e7242] transition">
                    {conversationStep === "name" ? (
                      <FiUser size={15} className="text-gray-500" />
                    ) : conversationStep === "phone" ? (
                      <FiPhone size={15} className="text-gray-500" />
                    ) : (
                      <FiMessageCircle size={15} className="text-gray-500" />
                    )}

                    <input
                      type={conversationStep === "phone" ? "tel" : "text"}
                      className="w-full py-2.5 outline-none text-[12px]"
                      placeholder={
                        conversationStep === "name"
                          ? "Enter your name..."
                          : conversationStep === "phone"
                            ? "Enter mobile number..."
                            : "Any specific requirements? (Optional)"
                      }
                      value={inputValue}
                      disabled={isLoading || isSubmitting}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSendMessage();
                      }}
                    />
                  </div>

                  <button
                    onClick={handleSendMessage}
                    disabled={
                      isLoading ||
                      isSubmitting ||
                      (conversationStep !== "message" && !inputValue.trim())
                    }
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition disabled:opacity-50"
                    style={{
                      background:
                        "linear-gradient(135deg, #9e7242 0%, #f09051 100%)",
                    }}
                    aria-label="Send message"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FiSend size={16} />
                    )}
                  </button>
                </div>

                {conversationStep === "message" && (
                  <button
                    onClick={handleMessageSubmit}
                    disabled={isLoading || isSubmitting}
                    className="text-xs text-gray-500 hover:text-[#9e7242] mt-2 underline disabled:opacity-50"
                  >
                    Skip this step
                  </button>
                )}
              </div>
            )}

            {/* Confirmation */}
            {conversationStep === "confirmation" && (
              <div className="p-4 border-t bg-white shrink-0 text-center space-y-2">
                {submissionSuccess ? (
                  <>
                    <p className="text-sm font-medium text-gray-700">
                      ✅ Your response has been submitted!
                    </p>
                    <p className="text-xs text-gray-500">
                      Our team will contact you soon.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-red-600">
                      ❌ Request submission failed.
                    </p>
                    <p className="text-xs text-gray-500">Please try again.</p>
                    <button
                      onClick={() => {
                        submittedRef.current = false;
                        setConversationStep("message");
                      }}
                      className="text-xs text-[#9e7242] font-semibold underline"
                    >
                      Try Again
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      {!open && (
        <>
          {showBubble && (
            <div className="fixed lg:bottom-24 bottom-38 right-4 z-40 max-w-[220px]">
              <div className="relative bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-2.5 border border-[#9e7242]/40 shadow-md rounded-sm">
                <button
                  onClick={() => setShowBubble(false)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-white border border-[#9e7242]/50 rounded-full flex items-center justify-center text-gray-500"
                  aria-label="Close chat bubble"
                >
                  <FiX size={11} />
                </button>

                <div className="space-y-1">
                  <p className="font-semibold text-xs">
                    👋 Hey! I'm {currentBot.name}
                  </p>

                  <p className="text-[10px] text-gray-600 leading-4">
                    Need help with Satyam Metro Showstoppers?
                  </p>

                  <button
                    onClick={() => setOpen(true)}
                    className="text-[10px] font-semibold text-[#9e7242] border border-[#9e7242]/50 px-2.5 py-1 rounded-sm mt-1 hover:bg-[#9e7242] hover:text-white transition-all"
                  >
                    💬 Let's Chat!
                  </button>
                </div>

                <div className="absolute -bottom-1.5 right-7 w-2.5 h-2.5 bg-white/90 border-r border-b border-[#9e7242]/40 rotate-45" />
              </div>
            </div>
          )}

          <button
            onClick={() => setOpen(true)}
            className="fixed lg:bottom-6 bottom-20 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 border-4 border-white bg-gradient-to-br from-[#9e7242] to-[#f09051]"
            aria-label="Open chatbot"
          >
            <img
              src={currentBot.image}
              alt="Chat with us"
              className="w-12 h-12 object-cover rounded-full"
            />

            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white">
              <div className="w-2 h-2 bg-green-300 rounded-full mx-auto mt-0.5 animate-pulse" />
            </div>
          </button>
        </>
      )}

      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
