import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import RightForm from "../components/RightForm";
import InterestForm from "../components/InterestForm";
import ChatBot from "../chatbot/Chatbot";
import whatsAppIcon from "../assets/whatsAppIcon.png";
import { contactConfig } from "../config/credential";
const PublicLayout = () => {
  const [isInterestFormOpen, setIsInterestFormOpen] = useState(false);
  const [openChatBot, setOpenChatBot] = useState(false);
  const [formMode, setFormMode] = useState("");
  const whatsappUrl = `https://wa.me/${contactConfig.phoneNumber.replace(
    /\D/g,
    ""
  )}?text=${encodeURIComponent(contactConfig.whatsappMessage)}`;
  return (
    <div className="flex w-full min-h-screen">
      {/* Left Side */}
      <div className="w-full md:w-[80%]">
        <Header onBrochureClick={() => {
          setIsInterestFormOpen(true);
          setFormMode("brochure");
        }} />
        <Outlet />
      </div>

      {/* Right Side */}
      <div className="hidden md:block md:w-[20%]">
        <RightForm
          onRequestCallBack={() => {
            setIsInterestFormOpen(true);
            setFormMode("callback");
          }}
          onChatBotClick={() => setOpenChatBot(true)}
        />
      </div>

      {/* Modals */}
      {isInterestFormOpen && (
        <InterestForm
          mode={formMode}
          onClose={() => {
            setIsInterestFormOpen(false);
            setFormMode("");
          }}
        />
      )}
        {/* Desktop Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="hidden md:flex fixed bottom-6 right-26 z-50 w-14 h-14 items-center justify-center rounded-full bg-white shadow-lg hover:scale-110 transition-transform duration-200"
      >
        <img
          src={whatsAppIcon}
          alt=""
          aria-hidden="true"
          className="w-10 h-10 object-contain"
          loading="lazy"
        />
      </a>
      <ChatBot open={openChatBot} setOpen={setOpenChatBot} />
    </div>
  );
};

export default PublicLayout;

