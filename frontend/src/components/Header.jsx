import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Info,
  IndianRupee,
  Sparkles,
  LayoutGrid,
  MapPin,
  Download,
  Menu,
  X,
  Camera,
} from "lucide-react";
import logo from "../assets/showstopper-logo.webp";

const Header = ({ onBrochureClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: "Home", section: "hero", path: "/", icon: <Home size={18} /> },
    { name: "About", section: "about", path: "/about", icon: <Info size={18} /> },
    { name: "Price", section: "price", path: "/price", icon: <IndianRupee size={18} /> },
    {
      name: "Amenities",
      section: "amenities",
      path: "/amenities",
      icon: <Sparkles size={18} />,
    },
    { name: "Floor Plan", section: "floorplan", path: "/floorplan", icon: <LayoutGrid size={18} /> },
    { name: "Location", section: "location", path: "/location", icon: <MapPin size={18} /> },
    { name: "Gallery", section: "gallery", path: "/gallery", icon: <Camera size={18} /> },
  ];

  useEffect(() => {
    const path = location.pathname;
    const sectionMap = {
      '/': 'hero',
      '/about': 'about',
      '/price': 'price', 
      '/amenities': 'amenities',
      '/floorplan': 'floorplan',
      '/location': 'location',
      '/gallery': 'gallery'
    };
    
    const section = sectionMap[path] || 'hero';
    setActiveSection(section);
    
    if (section !== 'hero') {
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.pathname]);

  const handleNavClick = (section, path) => {
    setIsOpen(false);
    setActiveSection(section);
    navigate(path);
    
    setTimeout(() => {
      const element = document.getElementById(section === 'hero' ? 'hero' : section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const isActive = (section) => {
    return activeSection === section;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-100 font-sans border-b-2 border-[#A67C48]/20">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center cursor-pointer">
          <div onClick={() => handleNavClick('hero', '/')}>
            <img
              src={logo}
              alt="Satyam Metro Showstopper Logo"
              className="h-15 w-46 border-2 border-[#A67C48] p-1 bg-black rounded-sm hover:scale-105 transition-transform duration-200"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1 text-sm font-semibold">
          {navLinks.map((link) => (
            <div
              key={link.name}
              onClick={() => handleNavClick(link.section, link.path)}
              className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 group ${
                isActive(link.section)
                  ? "text-[#A67C48] bg-gradient-to-r from-[#f09051]/20 to-[#9e7242]/20 border border-[#A67C48]/30"
                  : "text-gray-700 hover:text-[#A67C48] hover:bg-gradient-to-r hover:from-[#f09051]/10 hover:to-[#9e7242]/10"
              }`}
            >
              <span className="group-hover:scale-110 transition-transform duration-200">{link.icon}</span>
              {link.name}
            </div>
          ))}

          <button
            onClick={onBrochureClick}
            className="animated-gradient flex items-center gap-2 text-white px-5 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 ml-3 hover:scale-105"
          >
            <Download size={18} className="animate-bounce" /> BROCHURE
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#A67C48] focus:outline-none hover:bg-[#A67C48]/10 p-2 rounded-lg transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden fixed left-0 w-full bg-gradient-to-b from-white to-gray-50 shadow-2xl transition-all duration-300 ease-in-out z-50 
    ${
      isOpen
        ? "top-16 opacity-100 translate-y-0 visible"
        : "top-10 opacity-0 -translate-y-4 invisible pointer-events-none"
    }`}
      >
        <div className="px-6 py-4 space-y-2">
          {navLinks.map((link, index) => (
            <div
              key={link.name}
              onClick={() => handleNavClick(link.section, link.path)}
              className={`flex items-center gap-3 font-semibold py-3 px-4 rounded-lg cursor-pointer active:scale-95 transition-all duration-200 border ${
                isActive(link.section)
                  ? "text-[#A67C48] bg-gradient-to-r from-[#f09051]/30 to-[#9e7242]/30 border-[#A67C48]/50"
                  : "text-gray-700 hover:bg-gradient-to-r hover:from-[#f09051]/20 hover:to-[#9e7242]/20 hover:text-[#A67C48] border-transparent hover:border-[#A67C48]/30"
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="text-[#A67C48]">{link.icon}</span>
              {link.name}
            </div>
          ))}
          
          <button
            onClick={() => {
              onBrochureClick();
              setIsOpen(false);
            }}
            className="animated-gradient w-full flex items-center justify-center gap-2 text-white py-3 px-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 mt-4"
          >
            <Download size={18} /> DOWNLOAD BROCHURE
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
