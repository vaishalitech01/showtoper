import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full font-sans text-[#333]">
      {/* Upper Section: RERA Link */}
      <div className="py-2 text-center">
        <h2 className="text-2xl mb-2">RERA Number</h2>
        <p className="text-md">
          This project is RERA registered –{' '}
          <a 
            href="https://maharera.maharashtra.gov.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            maharera.maharashtra.gov.in
          </a>
        </p>
      </div>

      {/* Lower Section: Disclaimer */}
      <div className="bg-[#eef6ff] px-6 py-10 md:px-20 mb-6">
        <div className="max-w-6xl mx-auto text-center leading-relaxed text-xs lg:text-base">
          <p className="mb-4">
            <span className="font-bold">Disclaimer:</span> The content is for information purposes only and does not constitute an offer to avail of any service. Prices mentioned are subject to change without notice and properties mentioned are subject to availability. Images for representation purpose only. This is not the official website. Website maintained by Authorized Channel Partner Maha Rera. We may share data with rera registered brokers/companies for further procession.
          </p>
          
          {/* Developer Info */}
          <p className="mb-4 text-sm lg:text-base">
            <span className="font-semibold">Satyam Metro Developers</span> - Premium real estate developer in Navi Mumbai. Previous successful project: <span className="font-semibold text-[#A67C48]">One Crest</span>, a landmark residential development showcasing our commitment to luxury and quality construction.
          </p>
          
          {/* Links */}
          <div className="flex justify-center space-x-2 text-blue-600 mb-4">
            <a href="/privacy" className="hover:underline">Privacy Policy | Terms & Conditions</a>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-300 pt-4 text-xs lg:text-sm text-gray-600">
            <p>&copy; 2026 Satyam Metro Developers. All rights reserved. | Showstopper Kharghar | One Crest Developer</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;