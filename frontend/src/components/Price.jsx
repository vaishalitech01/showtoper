import React, { useEffect } from "react";
import oneCrestPriceSheet from "../assets/Prices/one-crest-price-detail-sheet.jpg";
import { createProductSchema, pushSchemaToGTM } from '../utils/schemaUtils';

const Price = ({ onOfferPriceClick }) => {
  const priceData = [
    { type: "2 BHK", area: "950 sq. ft.", price: "Starting from ₹2.46 Cr" },
    { type: "3 BHK Luxe", area: "1474 sq. ft.", price: "Starting from ₹3.77 Cr" },
    { type: "3 BHK Couture", area: "1567 sq. ft.", price: "Starting from ₹4.00 Cr" },
    { type: "4 BHK Atelier", area: "2320 sq. ft.", price: "Starting from ₹5.95 Cr" },
    { type: "2 + 2 BHK", area: "1909 sq. ft.", price: "Starting from ₹4.94 Cr" },
  ];

  useEffect(() => {
    // Push product schema to GTM dataLayer
    const productSchema = createProductSchema(priceData);
    pushSchemaToGTM(productSchema, 'price_page_view');
  }, []);

  return (
    <section
      id="price"
      className="bg-white py-4 px-4 lg:px-6 max-w-7xl mx-auto"
    >
      {/* Page Title */}
      <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 text-center mb-8 lg:mb-12">
        Satyam Metro Showstopper Price & Plan
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* --- PRICING SECTION --- */}
        <div className="grow w-full">
          {/* Desktop Table: Hidden on Mobile, Visible on LG+ */}
          <div className="hidden lg:block border border-orange-200 rounded-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-orange-300">
                  <th className="p-4 text-xl text-slate-900">Type</th>
                  <th className="p-4 text-xl text-slate-900">Carpet Area</th>
                  <th className="p-4 text-xl text-slate-900">Price</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {priceData.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b border-orange-100 last:border-0 ${
                      index % 2 === 1 ? "bg-slate-50/50" : ""
                    }`}
                  >
                    <td className="p-4 text-lg font-medium text-slate-700">
                      {item.type}
                    </td>
                    <td className="p-4 text-lg text-slate-600">{item.area}</td>
                    <td className="p-4 text-lg font-bold text-slate-900">
                      {item.price}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => onOfferPriceClick('price-breakup')}
                        className="bg-[#A67C48] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#8e693c] transition-colors shadow-sm whitespace-nowrap cursor-pointer"
                      >
                        Price Breakup
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards: Visible on Mobile, Hidden on LG+ */}
          <div className="lg:hidden border border-orange-400 rounded-[30px] flex flex-col gap-2">
            {priceData.map((item, index) => (
              <div
                key={index}
                className={` flex flex-col items-center text-center p-2`}
              >
                {/* BHK Type */}
                <h3 className="text-2xl  text-slate-800 mb-2">{item.type}</h3>

                {/* Area */}
                <p className="text-lg text-slate-600 mb-2">
                  {item.area}{" "}
                  <span className="text-sm opacity-80">(Carpet Area)</span>
                </p>

                {/* Price */}
                <p className="text-xl  text-slate-900 mb-2">{item.price}</p>

                {/* Button */}
                <button
                  onClick={() => onOfferPriceClick('price-breakup')}
                  className="bg-[#A67C48] text-white px-10 py-2 rounded-lg font-medium text-xl hover:bg-[#8e693c] transition-all active:scale-95 cursor-pointer mb-2"
                >
                  Price Breakup
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT PREVIEW SECTION --- */}
        <div className="w-full lg:w-[320px] shrink-0 flex flex-col items-center">
          <div className="border border-orange-300 p-2 bg-white shadow-sm w-full">
            <div className="border border-gray-300 aspect-[3/2.2] relative overflow-hidden backdrop-blur-2xl bg-white group">
              <img
                src={oneCrestPriceSheet}
                alt="One Crest price detail sheet - Payment schedule Satyam Metro Showstopper Kharghar pricing"
                className="w-full h-full object-cover opacity-80 "
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-transparent transition-colors">
                <span className="sr-only">
                  Detail Sheet and Payment Schedule
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onOfferPriceClick('costing-details')}
            className="mt-6 w-full animated-gradient text-white px-6 py-4 lg:py-3 rounded-full text-md font-semibold shadow-md hover:bg-[#b07848] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            Complete Costing Details
          </button>
        </div>
      </div>
    </section>
  );
};

export default Price;
