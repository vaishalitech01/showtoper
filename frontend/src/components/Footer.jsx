import showstopperLogo from '../assets/mahaReraQr.avif';
const Footer = () => {
  return (
    <footer className="w-full font-sans text-[#333]">
      {/* Upper Section: RERA Link */}
   

      {/* Lower Section: Disclaimer */}
      <div className="bg-[#eef6ff] px-6 py-10 md:px-20 ">
         <div className="py-4 text-center">
      <img
        src={showstopperLogo}
        alt="Showstopper Logo"
        className="h-24 w-auto mx-auto mb-3 object-contain"
      />

      <h3 className="text-md font-semibold mb-2">
        RERA Number PR1270002601519
      </h3>

      
    </div>
        <div className="max-w-6xl mx-auto text-center leading-relaxed text-xs lg:text-base">
          <p className="mb-4 font sm:text-xs lg:text-sm">
            <span className="font-bold">Disclaimer:</span> The content is for information purposes only and does not constitute an offer to avail of any service. Prices mentioned are subject to change without notice and properties mentioned are subject to availability. Images for representation purpose only. This is not the official website. Website maintained by Authorized Channel Partner Maha Rera. We may share data with rera registered brokers/companies for further procession.
          </p>
          
          {/* Developer Info */}
          <p className="mb-4 sm:text-xs lg:text-sm">
            <span className="font-semibold">Satyam Metro Developers</span> - Premium real estate developer in Navi Mumbai. Previous successful project: <span className="font-semibold text-[#A67C48]">One Crest</span>, a landmark residential development showcasing our commitment to luxury and quality construction.
          </p>
          
          {/* Links */}
          <div className="flex justify-center space-x-2 text-blue-600 mb-4 sm:text-xs lg:text-sm">
            <a href="/privacy" className="hover:underline">Privacy Policy | Terms & Conditions</a>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-300 pt-4 text-xs lg:text-xs text-gray-600">
            <p>&copy; 2026 Satyam Metro Developers. All rights reserved. | Showstopper Kharghar | One Crest Developer</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;