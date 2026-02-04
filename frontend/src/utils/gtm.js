// GTM utility functions
export const pushToDataLayer = (eventData) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(eventData);
    console.log('GTM Event pushed:', eventData);
  }
};

// Test GTM functionality
export const testGTM = () => {
  pushToDataLayer({
    event: 'gtm_test',
    page_title: document.title,
    page_location: window.location.href,
    timestamp: new Date().toISOString()
  });
};

// Track page views
export const trackPageView = (pagePath) => {
  pushToDataLayer({
    event: 'page_view',
    page_title: document.title,
    page_location: window.location.href,
    page_path: pagePath
  });
};

// Track form submissions
export const trackFormSubmission = (formName) => {
  pushToDataLayer({
    event: 'form_submit',
    form_name: formName,
    page_location: window.location.href
  });
};

// Track button clicks
export const trackButtonClick = (buttonName) => {
  pushToDataLayer({
    event: 'button_click',
    button_name: buttonName,
    page_location: window.location.href
  });
};