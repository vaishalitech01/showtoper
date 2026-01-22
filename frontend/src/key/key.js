// export const emailKeys = {
//   serviceId: "service_n2966z8",
//   templateId: "template_1rzu4vd",
//   publicKey: "emp2B6knUFfGwfYzl",
  
// };
export const emailKeys = {
  serviceId: "testing_service",
  templateId: "testing_template",
  publicKey: "testing_key",
  
};
export const credentials={
  web_url: "satyammetroshowstoppers.in",
  web_name: "Satyam Metro Showstoppers",
  logo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1npNt53HoKFm9ngdtacVVTo2VGLK4eXKVPQ&s",
}

export const regexPatterns = {
  namePattern: /^[a-zA-Z\s]{2,50}$/,
  emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  mobilePattern: /^[6-9]\d{9}$/,
};

export let user_address = null;

// export const baseurl = "http://localhost:3001/api";

export const baseurl = import.meta.env.VITE_BASE_API_URL;

// chatbot.js ,BrochureForm.jsx,InterestForm.jsx,MobileForm.jsx,offerForm.jsx,RightForm.jsx