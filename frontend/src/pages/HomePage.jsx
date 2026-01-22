import { useState, useEffect } from 'react'
import About from "../components/About";
import Hero from "../components/Hero";
import Price from "../components/Price";
import Amenities from "../components/Amenities";
import FloorPlan from "../components/FloorPlan";
import Location from "../components/Location";
import Gallery from "../components/GalleryPage";
import NRIServices from "../components/NRIServices";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MobileFooter from "../components/MobileFooter";
import BrochureForm from "../components/BrochureForm";
import InterestForm from '../components/InterestForm';
import MobileForm from '../components/MobileForm';
import OfferPriceForm from '../components/OfferPriceForm';
import DynamicSEO from '../components/DynamicSEO';


// Popup timing configuration
const INITIAL_POPUP_DELAY = 3000; // 3 seconds
const REPEAT_POPUP_INTERVAL = 10000; // 10 seconds

const HomePage = () => {
    const [isInterestFormOpen, setIsInterestFormOpen] = useState(false);
    const [isBrochureFormOpen, setIsBrochureFormOpen] = useState(false);
    const [isOfferPriceFormOpen, setIsOfferPriceFormOpen] = useState(false);
    const [formMode, setFormMode] = useState("");
    const [offerType, setOfferType] = useState("");


    useEffect(() => {
      console.log('HomePage mounted - useEffect running');
      
      // Check if form was already submitted
      const submitted = localStorage.getItem('interestFormSubmitted');
      console.log('Form submitted status:', submitted);
      
      if (submitted === 'true') {
        console.log('Form already submitted, skipping popup');
        return;
      }

      console.log('Setting up timers...');
      
      // Show form after 3 seconds on initial load
      const initialTimer = setTimeout(() => {
        console.log('Initial timer fired - opening form');
        setIsInterestFormOpen(true);
      }, INITIAL_POPUP_DELAY);

      // Then show every 10 seconds
      const repeatTimer = setInterval(() => {
        console.log('Repeat timer fired');
        const isSubmitted = localStorage.getItem('interestFormSubmitted');
        if (isSubmitted !== 'true') {
          console.log('Opening form from repeat timer');
          setIsInterestFormOpen(true);
        }
      }, REPEAT_POPUP_INTERVAL);

      return () => {
        console.log('Cleaning up timers');
        clearTimeout(initialTimer);
        clearInterval(repeatTimer);
      };
    }, []);

    const handleInterestFormClose = (submitted = false) => {
      console.log('Closing form, submitted:', submitted);
      setIsInterestFormOpen(false);
      if (submitted) {
        console.log('Saving to localStorage');
        localStorage.setItem('interestFormSubmitted', 'true');
      }
    };

  return (
    <>
      <DynamicSEO />
    {/* <Header onBrochureClick={() => setIsBrochureFormOpen(true)} /> */}
        {isBrochureFormOpen && (
          <BrochureForm onClose={() => setIsBrochureFormOpen(false)} />
        )}

        <Hero onRequestCallBack={() => {setIsInterestFormOpen(true)
          setFormMode('download brochure');
        }} />
           {isInterestFormOpen && (
        <InterestForm mode={formMode} onClose={handleInterestFormClose} />
      )}
        <MobileForm />
        <About />

        <Price onOfferPriceClick={(type) => {setIsOfferPriceFormOpen(true)
          setOfferType(type);
        }} />
        {isOfferPriceFormOpen && (
          <OfferPriceForm
           type={offerType} onClose={() => setIsOfferPriceFormOpen(false)} />
        )}

        <Amenities />
      <div id="gallery">
        <Gallery />
      </div>
        <FloorPlan onOfferPriceClick={(type) => {setIsOfferPriceFormOpen(true)
          setOfferType(type);
        }} />
        <Location />
        <NRIServices />
        <Footer />
        <MobileFooter />
        </>
  )
}

export default HomePage