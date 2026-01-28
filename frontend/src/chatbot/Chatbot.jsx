"use client";

import { useState, useEffect, useRef } from "react";
import { FiSend, FiX, FiMessageCircle, FiPhone, FiUser } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import { credentials, emailKeys, baseurl } from "../key/key";
import axios from "axios";

const randomBot = [
  {
    name: "Alok Singh",
    image:
      "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVufGVufDB8fDB8fHww",
  },
  {
    name: "Ravi Kumar",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVufGVufDB8fDB8fHww",
  },
  {
    name: "Neha Agarwal",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Priya Sharma",
    image:
      "https://images.unsplash.com/photo-1586351012965-861624544334?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2lybHxlbnwwfHwwfHx8MA%3D%3D",
  },
];

export default function ChatBot({ open = true, setOpen }) {
  //   const [open, setOpen] = useState(true)
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentBot, setCurrentBot] = useState(
    () => randomBot[Math.floor(Math.random() * randomBot.length)],
  );
  const [collectedData, setCollectedData] = useState({
    name: "",
    phone: "",
    interest: "",
    flatType: "",
    message: "",
  });
  const [conversationStep, setConversationStep] = useState("greeting");
  const [isLoading, setIsLoading] = useState(false);
  const [autoSubmitTimer, setAutoSubmitTimer] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize with greeting
  useEffect(() => {
    if (open && messages.length === 0) {
      addBotMessage(
        `Hey! 👋 I'm ${currentBot.name} from Satyam Developers. How can I help you understand this amazing project?`,
      );
      setConversationStep("interest");
    }
  }, [open]);

  const addBotMessage = (text) => {
    const message = {
      id: Date.now().toString(),
      sender: "bot",
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const addUserMessage = (text) => {
    const message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const simulateBotTyping = async (text, delay = 1000) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, delay));
    addBotMessage(text);
    setIsLoading(false);
  };

  const interestOptions = [
    "🏠 Pricing & Floor Plans",
    "📄 Download Brochure",
    "💎 Get The Best Quote",
    "🏘️ Site Visit or Virtual Tour",
    "💬 Pricing on WhatsApp",
    "📞 Get A Call Back",
  ];
  const flatSizeOptions = ["🏠 1 BHK", "🏡 2 BHK", "🏘️ 3 BHK", "🏢 4 BHK"];
  const handleInterestSelect = async (interest) => {
    addUserMessage(interest);
    setCollectedData({ ...collectedData, interest });
    await simulateBotTyping(
      `Great choice! 💫 Now, what's your name so I know how to address you?`,
      800,
    );
    setConversationStep("name");
  };

  const handleFlatSelect = async (flatType) => {
    addUserMessage(flatType);
    const updatedData = { ...collectedData, flatType };
    setCollectedData(updatedData);
    await simulateBotTyping(
      `Perfect! 🏠 Finally, do you have any specific message or requirements?`,
      800,
    );
    setConversationStep("message");
  };

  const handleNameSubmit = async () => {
    if (!inputValue.trim()) return;

    addUserMessage(inputValue);
    setCollectedData({ ...collectedData, name: inputValue });
    setInputValue("");

    await simulateBotTyping(
      `Nice to meet you, ${inputValue}! 🤝 Now, what's your contact number? (10-digit mobile number)`,
      800,
    );
    setConversationStep("phone");
  };

  const handlePhoneSubmit = async () => {
    if (!inputValue.trim()) return;

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(inputValue)) {
      addBotMessage(
        "❌ Please enter a valid 10-digit mobile number starting with 6-9",
      );
      return;
    }

    addUserMessage(inputValue);
    const updatedData = { ...collectedData, phone: inputValue };
    setCollectedData(updatedData);
    setInputValue("");

    await simulateBotTyping(
      `Great! 📱 Now, which type of flat are you interested in?`,
      800,
    );
    setConversationStep("flatType");

    // Start 50-second auto-submit timer after phone is collected
    const timer = setTimeout(() => {
      submitFormData(updatedData);
    }, 20000);
    setAutoSubmitTimer(timer);
  };

  const submitFormData = async (data) => {
    let backendSuccess = false;
    let emailSuccess = false;

    const finalMessage = `Hey, I'm ${data.name}. 
I'm interested in ${data.interest || "property details"} and I'm willing to buy ${data.flatType || "a flat"}.
Message: ${data.message || `No specific message. My address is: ${window.user_address || "Location not available"}`}
`;

    // 1️⃣ Submit to backend
    try {
      const response = await axios.post(`${baseurl}/forms/submit`, {
        name: data.name,
        mobile: data.phone,
        email: data.email || "",
        message: finalMessage,
        source: "satyammetroshowstoppers.in",
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
          user_name: data.name,
          user_phone: data.phone,
          user_email:
            data.email || "Email not provided (This is a chatbot submission)",
          web_url: credentials.web_url,
          web_name: credentials.web_name,
          logo_url: credentials.logo_url,
          message: finalMessage,
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
            console.log('Chatbot form conversion tracked');
          }
        });
      }
      setSubmissionSuccess(true);
      await simulateBotTyping(
        `Perfect! ✨ I've received your details. Our team will contact you shortly. Thank you for choosing Satyam Developers! 🎉`,
        1000,
      );
    } else {
      setSubmissionSuccess(false);
      await simulateBotTyping(
        `Sorry, there was an issue submitting your details. Please try again or contact us directly.`,
        1000,
      );
    }

    setConversationStep("confirmation");
  };

  const handleMessageSubmit = async () => {
    // Clear auto-submit timer if user completes conversation
    if (autoSubmitTimer) {
      clearTimeout(autoSubmitTimer);
      setAutoSubmitTimer(null);
    }

    const userMessage = inputValue.trim() || "No specific message";
    addUserMessage(userMessage);
    const updatedData = { ...collectedData, message: userMessage };
    setCollectedData(updatedData);
    setInputValue("");

    await submitFormData(updatedData);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoSubmitTimer) {
        clearTimeout(autoSubmitTimer);
      }
    };
  }, [autoSubmitTimer]);

  const handleSendMessage = () => {
    if (conversationStep === "name") {
      handleNameSubmit();
    } else if (conversationStep === "phone") {
      handlePhoneSubmit();
    } else if (conversationStep === "message") {
      handleMessageSubmit();
    }
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full">
          {/* Chat Window */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-150">
            {/* Header */}
            <div
              className="p-4 text-white flex items-center gap-3 shrink-0"
              style={{
                background: "linear-gradient(135deg, #9e7242 0%, #f09051 100%)",
              }}
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                <div className="h-3 w-3 rounded-full bg-green-400 absolute top-4 left-12"></div>
                <img
                  src={currentBot.image}
                  alt={currentBot.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm">{currentBot.name}</h3>
                <p className="text-xs opacity-90">Satyam Developers</p>
              </div>
              <button
                className="p-1 hover:bg-white/20 rounded-full transition"
                onClick={() => setOpen(false)}
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg) => (
                <div key={msg.id}>
                  {msg.sender === "bot" ? (
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center overflow-hidden">
                        <img
                          src={currentBot.image}
                          alt="Bot"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div className="max-w-xs">
                        <div
                          className="bg-white p-3 shadow-sm"
                          style={{ borderRadius: "0px 12px 12px 12px" }}
                        >
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {msg.text}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 ml-2">
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2 justify-end">
                      <div className="max-w-xs">
                        <div
                          className="p-3 text-white"
                          style={{
                            background:
                              "linear-gradient(135deg, #9e7242 0%, #f09051 100%)",
                            borderRadius: "12px 12px 0px 12px",
                          }}
                        >
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 mr-2 text-right">
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

              {isLoading && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={currentBot.image}
                      alt="Bot"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div
                    className="bg-white p-3 shadow-sm"
                    style={{ borderRadius: "0px 12px 12px 12px" }}
                  >
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          animation: "pulse 1.4s infinite",
                          background: "#9e7242",
                        }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          animation: "pulse 1.4s infinite 0.2s",
                          background: "#9e7242",
                        }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          animation: "pulse 1.4s infinite 0.4s",
                          background: "#9e7242",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Interest Selection */}
            {conversationStep === "interest" && (
              <div className="flex gap-2 justify-end p-4 bg-gray-50">
                <div className="max-w-xs">
                  <div
                    className="p-3 text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, #9e7242 0%, #f09051 100%)",
                      borderRadius: "12px 12px 0px 12px",
                    }}
                  >
                    <p className="text-sm mb-3">Please select your interest:</p>
                    <div className="space-y-2">
                      {interestOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleInterestSelect(option)}
                          className="w-full text-left p-2 rounded border-2 border-white text-white transition hover:bg-white hover:text-gray-800"
                        >
                          <p className="text-xs font-medium">{option}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Flat Type Selection */}
            {conversationStep === "flatType" && (
              <div className="flex gap-2 justify-end p-4 bg-gray-50">
                <div className="max-w-xs">
                  <div
                    className="p-3 text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, #9e7242 0%, #f09051 100%)",
                      borderRadius: "12px 12px 0px 12px",
                    }}
                  >
                    <p className="text-sm mb-3">
                      Which flat type interests you?
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {flatSizeOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleFlatSelect(option)}
                          className="p-2 rounded border-2 border-white text-white transition hover:bg-white hover:text-gray-800"
                        >
                          <p className="text-xs font-medium">{option}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Input Area */}
            {(conversationStep === "name" ||
              conversationStep === "phone" ||
              conversationStep === "message") && (
              <div className="p-4 border-t bg-white shrink-0 space-y-3">
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center gap-2 border-2 rounded-lg px-3 border-gray-300">
                    {conversationStep === "name" ? (
                      <FiUser size={16} className="text-gray-500" />
                    ) : conversationStep === "phone" ? (
                      <FiPhone size={16} className="text-gray-500" />
                    ) : (
                      <FiMessageCircle size={16} className="text-gray-500" />
                    )}
                    <input
                      type={conversationStep === "phone" ? "tel" : "text"}
                      className="w-full py-3 outline-none text-sm"
                      placeholder={
                        conversationStep === "name"
                          ? "Enter your name..."
                          : conversationStep === "phone"
                            ? "Enter mobile number..."
                            : "Enter your message ..."
                      }
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") handleSendMessage();
                      }}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={
                      conversationStep !== "message" && !inputValue.trim()
                    }
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg transition disabled:opacity-50"
                    style={{
                      background:
                        "linear-gradient(135deg, #9e7242 0%, #f09051 100%)",
                    }}
                  >
                    <FiSend size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Confirmation State */}
            {conversationStep === "confirmation" && (
              <div className="p-4 border-t bg-white shrink-0 text-center space-y-2">
                {submissionSuccess ? (
                  <>
                    <p className="text-sm font-medium text-gray-700">
                      ✅ Your response has been submitted
                    </p>
                    <p className="text-xs text-gray-500">
                      Our team will contact you soon
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-red-600">
                      ❌ Request submission failed
                    </p>
                    <p className="text-xs text-gray-500">
                      Sorry, we are unable to fulfill your request at the moment
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed lg:bottom-6 bottom-20 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-xl transition hover:scale-110"
          style={{
            background: "linear-gradient(135deg, #9e7242 0%, #f09051 100%)",
          }}
        >
          <FiMessageCircle size={24} />
        </button>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `,
        }}
      />
    </>
  );
}
