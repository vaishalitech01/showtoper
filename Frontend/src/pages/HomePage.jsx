import { useState } from 'react'
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
import MobileForm from "../components/MobileForm";
import MobileFooter from "../components/MobileFooter";
import BrochureForm from "../components/BrochureForm";
import OfferPriceForm from "../components/OfferPriceForm";
import InterestForm from '../components/InterestForm';

const HomePage = () => {
    const [isInterestFormOpen, setIsInterestFormOpen] = useState(false);
      const [isBrochureFormOpen, setIsBrochureFormOpen] = useState(false);
      const [isOfferPriceFormOpen, setIsOfferPriceFormOpen] = useState(false);
  return (
    <>
    {/* <Header onBrochureClick={() => setIsBrochureFormOpen(true)} /> */}
        {isBrochureFormOpen && (
          <BrochureForm onClose={() => setIsBrochureFormOpen(false)} />
        )}

        <Hero onRequestCallBack={() => setIsInterestFormOpen(true)} />
           {isInterestFormOpen && (
        <InterestForm onClose={() => setIsInterestFormOpen(false)} />
      )}
        <MobileForm />
        <About />

        <Price onOfferPriceClick={() => setIsOfferPriceFormOpen(true)} />
        {isOfferPriceFormOpen && (
          <OfferPriceForm onClose={() => setIsOfferPriceFormOpen(false)} />
        )}

        <Amenities />
        <Gallery />
        <FloorPlan onOfferPriceClick={() => setIsOfferPriceFormOpen(true)} />
        <Location />
        <NRIServices />
        <Footer />
        <MobileFooter />
        </>
  )
}

export default HomePage