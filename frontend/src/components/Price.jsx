import React, { useEffect } from "react";
import oneCrestPriceSheet from "../assets/Prices/one-crest-price-detail-sheet.jpg";
import { createProductSchema, pushSchemaToGTM } from '../utils/schemaUtils';
import { trackButtonClick } from '../utils/gtm';

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
    className="bg-white py-8 px-4 lg:px-6 max-w-7xl mx-auto"
  >
    {/* Page Title */}
    <div className="text-center mb-7 lg:mb-9">
     <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold text-[#9e7242]">
      Explore Prices & Floor Plans
      </span>

     <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">
       Satyam Metro Showstopper{" "}
        <span className="text-[#9e7242]">Price & Plan</span>
      </h2>

      <div className="w-12 h-[2px] mx-auto mt-3 animated-gradient" />
    </div>

    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

      {/* PRICING SECTION */}
      <div className="grow w-full min-w-0">

        {/* Desktop Pricing Table */}
        <div className="hidden lg:block border border-[#9e7242]/25 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#9e7242]/[0.06]">
              <tr className="border-b border-[#9e7242]/25">
                <th className="px-4 py-3 text-xs font-semibold text-slate-800">
                  Type
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-800">
                  Carpet Area
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-800">
                  Price
                </th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>

            <tbody>
              {priceData.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b border-[#9e7242]/15 last:border-0 transition-colors hover:bg-[#9e7242]/[0.03] ${
                    index % 2 === 1 ? "bg-slate-50/50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-4 text-sm font-semibold text-slate-800">
                    {item.type}
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-600">
                    {item.area}
                  </td>

                  <td className="px-4 py-4 text-sm font-bold text-slate-900">
                    {item.price}
                  </td>

                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => {
                        onOfferPriceClick("price-breakup");
                        trackButtonClick("price_breakup_desktop");
                      }}
                      className="bg-[#9e7242] text-white px-4 py-2 text-xs font-semibold rounded-sm hover:bg-[#805b35] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Price Breakup
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Pricing Cards */}
        <div className="lg:hidden border border-[#9e7242]/30 divide-y divide-[#9e7242]/20">
          {priceData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center px-3 py-4 bg-white"
            >
              <h3 className="text-lg font-semibold text-slate-800 mb-1">
                {item.type}
              </h3>

              <p className="text-xs text-gray-600 mb-2">
                {item.area}{" "}
                <span className="text-gray-400">(Carpet Area)</span>
              </p>

              <p className="text-base font-bold text-slate-900 mb-3">
                {item.price}
              </p>

              <button
                onClick={() => {
                  onOfferPriceClick("price-breakup");
                  trackButtonClick("price_breakup_mobile");
                }}
                className="bg-[#9e7242] text-white px-6 py-2 rounded-sm font-semibold text-xs hover:bg-[#805b35] transition-all active:scale-[0.98] cursor-pointer"
              >
                Price Breakup
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PREVIEW SECTION */}
      <div className="w-full lg:w-[280px] shrink-0 flex flex-col items-center">

        <div className="border border-[#9e7242]/30 p-1.5 bg-white shadow-sm w-full">
          <div className="border border-gray-200 aspect-[3/2.2] relative overflow-hidden bg-white group">
            <img
              src={oneCrestPriceSheet}
              alt="One Crest price detail sheet - Payment schedule Satyam Metro Showstopper Kharghar pricing"
              className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/[0.03] group-hover:bg-transparent transition-colors">
              <span className="sr-only">
                Detail Sheet and Payment Schedule
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            onOfferPriceClick("costing-details");
            trackButtonClick("complete_costing_details");
          }}
          className="mt-4 w-full animated-gradient text-white px-4 py-3 rounded-sm text-xs font-semibold shadow-sm transition-all hover:shadow-md active:scale-[0.98] cursor-pointer"
        >
          Complete Costing Details
        </button>
      </div>
    </div>
  </section>
);

};

export default Price;
