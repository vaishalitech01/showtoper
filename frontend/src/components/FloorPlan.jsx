import React from 'react';
import oneCrestMasterPlan from '../assets/plans/one-crest-master-plan.webp';
import oneCrestUnitPlan from '../assets/plans/one-crest-unit-floor-plan.webp';

const FloorPlan = ({ onOfferPriceClick }) => {
  const plans = [
    {
      title: "Request Master Plan Layout",
      buttonText: "View layout Plan",
      img: oneCrestMasterPlan,
      alt: "One Crest master plan layout - Satyam Metro Developers Kharghar project site plan"
    },
    {
      title: "Request Unit Plan Layout",
      buttonText: "View Floor Plan",
      img: oneCrestUnitPlan,
      alt: "One Crest unit floor plan - 2 3 4 BHK apartment layouts Satyam Metro Showstopper"
    }
  ];

  return (
    <section id='floorplan' className="bg-white py-4 px-6 max-w-7xl mx-auto">
      {/* Page Title */}
    {/* Floor Plans Heading */}
<div className="text-center mb-16">
  <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A67C48]">
    Thoughtfully Designed Spaces
  </span>

  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">
    Explore Our <span className="text-[#A67C48]">Floor Plans</span>
  </h2>

  <div className="w-14 h-[2px] bg-[#A67C48] mx-auto mt-4" />
</div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className="w-full max-w-md border border-orange-200 p-4 bg-white shadow-sm flex flex-col items-center"
          >
            {/* Image Container with Overlay */}
            <div className="relative w-full aspect-4/3 overflow-hidden group cursor-pointer">
              <img 
                src={plan.img} 
                alt={plan.alt} 
                className="w-full h-full object-cover"
              />
              {/* Dark Overlay with Text */}
              {/* <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white text-xl font-bold px-4 text-center">
                  {plan.title}
                </span>
              </div> */}
            </div>

            {/* Action Button */}
            <button onClick={() => onOfferPriceClick(index === 0 ? "layout plan" : "floor plan")} className="mt-6 bg-linear-to-r from-[#B07E4D] to-[#D99B5C] text-white px-10 py-2.5 rounded-full text-sm font-medium shadow-md hover:opacity-90 transition-opacity hover:cursor-pointer">
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FloorPlan;