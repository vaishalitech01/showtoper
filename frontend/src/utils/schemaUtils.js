// GTM-compatible schema utilities
export const createProductSchema = (priceData) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "One Crest - Satyam Metro Showstopper",
  "description": "Premium luxury apartments in Kharghar by Satyam Metro Developers. 2, 3 & 4 BHK homes with world-class amenities.",
  "brand": {
    "@type": "Brand",
    "name": "Satyam Metro Developers"
  },
  "category": "Real Estate",
  "offers": priceData.map(item => ({
    "@type": "Offer",
    "name": `${item.type} Apartment`,
    "description": `${item.type} luxury apartment with ${item.area} carpet area`,
    "price": Math.round(
      parseFloat(item.price.replace(/[^\d.]/g, '')) * 10000000
    ).toString(),
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Satyam Metro Developers"
    }
  })),
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "50"
  }
});


// Push schema to GTM dataLayer
export const pushSchemaToGTM = (schemaData, eventName) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      schema: schemaData
    });
  }
};