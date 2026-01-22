import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import RightForm from "../components/RightForm";
import InterestForm from "../components/InterestForm";
import ChatBot from "../chatbot/Chatbot";
import { user_address } from "../key/key";

const PublicLayout = () => {
  const [isInterestFormOpen, setIsInterestFormOpen] = useState(false);
  const [openChatBot, setOpenChatBot] = useState(false);
  const [formMode, setFormMode] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // console.log("Latitude:", latitude);
        // console.log("Longitude:", longitude);

        reverseGeocode(latitude, longitude);
      },
      (error) => {
        console.log("Location permission denied or error:", error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  const reverseGeocode = async (lat, lng) => {
    try {
      const API_KEY = "AIzaSyDGwpUp3hE5qGlPVPQf056b2sWybbnePo0";

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
      );

      const data = await response.json();

      if (data.status === "OK") {
        const address = data.results[0];
        // console.log("Full Address:", address.formatted_address);
        // console.log("Address Details:", address.address_components);
        
        // Set user address globally
        window.user_address = address.formatted_address;
      }
    } catch (err) {
      console.error("Geocoding error:", err);
    }
  };

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
      <ChatBot open={openChatBot} setOpen={setOpenChatBot} />
    </div>
  );
};

export default PublicLayout;
