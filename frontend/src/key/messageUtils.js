// Utility function to create messages with user address
export const createMessageWithAddress = (baseMessage, userName = '') => {
  const userAddress = window.user_address;
  let message = '';
  
  if (userName) {
    message = baseMessage.replace('${name}', userName);
  } else {
    message = baseMessage;
  }
  
  // Only append address if it's available and not null/undefined
  if (userAddress && userAddress !== "Location not available") {
    message += ` My address is: ${userAddress}`;
  }
  
  return message;
};

// Message templates
export const messageTemplates = {
  general: "Hello Satyam Developers, this is ${name}. I'm interested in your property and would love to have a brief discussion at your convenience.",
  callback: "Hello Satyam Developers, this is ${name}. I would like to request a callback to discuss your property. Please contact me at your convenience.",
  brochure: "Hello Satyam Developers, this is ${name}. I would like to download the brochure for your property. Please share the details.",
  mobile: "Hello Satyam Developers, I'm interested in your property and would love to have a brief discussion at your convenience. (this form is submitted from mobile view)",
  offerPrice: "Hello Satyam Developers, this is ${name}. I am interested in your property and would appreciate more details regarding the current offers, pricing, and any special benefits available.",
  brochureRequest: "Hello Satyam Developers, this is ${name}. I'm interested in your property. Could you please send me the brochure?"
};