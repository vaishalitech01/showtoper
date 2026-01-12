import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import RightForm from "../components/RightForm";
import InterestForm from "../components/InterestForm";
import ChatBot from "../chatbot/Chatbot";

const PublicLayout = () => {
  const [isInterestFormOpen, setIsInterestFormOpen] = useState(false);
  const [openChatBot, setOpenChatBot] = useState(false);

  return (
    <div className="flex w-full min-h-screen">
      {/* Left Side */}
      <div className="w-full md:w-[80%]">
        <Header onBrochureClick={() => setIsInterestFormOpen(true)} />
        <Outlet />
      </div>

      {/* Right Side */}
      <div className="hidden md:block md:w-[20%]">
        <RightForm
          onRequestCallBack={() => setIsInterestFormOpen(true)}
          onChatBotClick={() => setOpenChatBot(true)}
        />
      </div>

      {/* Modals */}
      {isInterestFormOpen && (
        <InterestForm onClose={() => setIsInterestFormOpen(false)} />
      )}
      <ChatBot open={openChatBot} setOpen={setOpenChatBot} />
    </div>
  );
};

export default PublicLayout;
