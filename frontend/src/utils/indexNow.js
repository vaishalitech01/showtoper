// IndexNow utility for instant search engine indexing
const INDEXNOW_KEY = 'ba27c0b72e4c754dd4a367f6b76255aea827f59fcbf2ff6672d00fd5050b6b0d';
const HOST = 'satyammetroshowstoppers.in';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

export const submitToIndexNow = async (urls) => {
  try {
    const urlList = Array.isArray(urls) ? urls : [urls];
    
    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urlList.map(url => 
        url.startsWith('http') ? url : `https://${HOST}${url}`
      )
    };

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('URLs submitted to IndexNow successfully');
      return true;
    } else {
      console.error('IndexNow submission failed:', response.status);
      return false;
    }
  } catch (error) {
    console.error('IndexNow error:', error);
    return false;
  }
};

// Submit all site URLs
export const submitAllUrls = () => {
  const urls = [
    '/',
    '/about',
    '/price', 
    '/amenities',
    '/floorplan',
    '/location',
    '/gallery'
  ];
  
  return submitToIndexNow(urls);
};