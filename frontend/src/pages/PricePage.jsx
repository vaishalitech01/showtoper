import React, { useState } from 'react';
import Price from '../components/Price';
import OfferPriceForm from '../components/OfferPriceForm';
import SEO from '../components/SEO';

const PricePage = () => {
  const [isOfferPriceFormOpen, setIsOfferPriceFormOpen] = useState(false);

  return (
    <>
      <SEO 
        title="Price & Floor Plans | Satyam Metro Showstopper Kharghar | 2, 3, 4 BHK Rates"
        description="Check latest prices for 2, 3 & 4 BHK luxury apartments at Satyam Metro Showstopper, Kharghar. Starting from ₹2.4 Cr. Get complete price breakup and payment plans."
        keywords="Satyam Metro Showstopper price, 2 BHK price Kharghar, 3 BHK price Navi Mumbai, 4 BHK luxury apartments cost, property rates Kharghar, apartment prices Sector 20"
        canonical="https://satyammetroshowstoppers.in/price"
      />
      <Price onOfferPriceClick={() => setIsOfferPriceFormOpen(true)} />
      {isOfferPriceFormOpen && (
        <OfferPriceForm onClose={() => setIsOfferPriceFormOpen(false)} />
      )}
    </>
  );
};

export default PricePage;