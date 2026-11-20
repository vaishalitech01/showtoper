import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

import HomePage from "./pages/HomePage";
import PrivacyPage from "./pages/PrivacyPage";
import AdminPage from "./pages/AdminPage";

function App() {
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const response = await fetch("https://ipinfo.io/json");

        if (!response.ok) {
          throw new Error("Failed to fetch IP location");
        }

        const data = await response.json();

        const address = `This is approximate location Based On Users IP Address
IP: ${data.ip || "Not available"}
City: ${data.city || "Not available"}
State: ${data.region || "Not available"}
Country: ${data.country || "Not available"}`;

        window.user_address = address;

        console.log("User Location:", address);
      } catch (error) {
        console.error("IP location error:", error);
        window.user_address = null;
      }
    };

    fetchUserLocation();
  }, []);

  // useEffect(() => {
  //   if (!navigator.geolocation) {
  //     console.log("Geolocation not supported");
  //     window.user_address = null;
  //     return;
  //   }

  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       // console.log("Latitude:", latitude);
  //       // console.log("Longitude:", longitude);

  //       reverseGeocode(latitude, longitude);
  //     },
  //     (error) => {
  //       console.log("Location permission denied or error:", error.message);
  //       window.user_address = null;
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 10000,
  //       maximumAge: 0,
  //     }
  //   );
  // }, []);

  // const reverseGeocode = async (lat, lng) => {
  //   try {
  //     const API_KEY = "AIzaSyDGwpUp3hE5qGlPVPQf056b2sWybbnePo0";

  //     const response = await fetch(
  //       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
  //     );

  //     const data = await response.json();

  //     if (data.status === "OK") {
  //       const address = data.results[0];
  //       // console.log("Full Address:", address.formatted_address);

  //       // Set user address globally
  //       window.user_address = address.formatted_address;
  //     } else {
  //       window.user_address = null;
  //     }
  //   } catch (err) {
  //     console.error("Geocoding error:", err);
  //     window.user_address = null;
  //   }
  // };
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌐 Public Pages */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<HomePage />} />
          <Route path="/price" element={<HomePage />} />
          <Route path="/amenities" element={<HomePage />} />
          <Route path="/floorplan" element={<HomePage />} />
          <Route path="/location" element={<HomePage />} />
          <Route path="/gallery" element={<HomePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Route>

        {/* 🔐 Admin Pages
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route> */}

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
