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
  
<section
  id="floorplan"
  className="bg-white py-10 px-4 sm:px-6 max-w-7xl mx-auto"
>
  {/* Section Heading */}
  <div className="text-center mb-9">
    <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold text-[#9e7242]">
      Thoughtfully Designed Spaces
    </span>

    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">
      Explore Our{" "}
      <span className="text-[#9e7242]">Floor Plans</span>
    </h2>

    <div className="w-12 h-[2px] bg-gradient-to-r from-[#9e7242] to-[#f09051] mx-auto mt-3" />
  </div>

  {/* Floor Plan Cards */}
  
  <div className="flex flex-col sm:flex-row justify-center items-stretch gap-5 lg:gap-7">
    {plans.map((plan, index) => (
      <div
        key={index}
        className="
          w-full sm:max-w-[380px]
          border border-[#9e7242]/25
          bg-white p-2.5
          shadow-sm
          flex flex-col
          transition-all duration-300
          hover:shadow-lg hover:border-[#9e7242]/60
        "
      >
        {/* Plan Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden group bg-gray-50">
          <img
            src={plan.img}
            alt={plan.alt}
            className="
              w-full h-full object-cover
              transition-transform duration-500
              group-hover:scale-[1.03]
            "
          />
        </div>

        {/* Action Button */}
        <button
          onClick={() =>
            onOfferPriceClick(index === 0 ? "layout plan" : "floor plan")
          }
          className="
            animated-gradient
            w-full mt-3
            text-white text-xs md:text-sm
            font-semibold tracking-wide
            py-2.5 px-4
            rounded-sm
            shadow-sm
            hover:opacity-90
            transition-all duration-200
            cursor-pointer
          "
        >
          {plan.buttonText}
        </button>
      </div>
    ))}
  </div>
</section>

  );
};

export default FloorPlan;