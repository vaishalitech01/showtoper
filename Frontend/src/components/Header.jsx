import React, { useState } from "react";
import { Link } from "react-scroll"; // Import Link from react-scroll
import {
  Home,
  Info,
  IndianRupee,
  TreeDeciduous,
  Layout,
  MapPin,
  Download,
  Menu,
  X,
} from "lucide-react";
import logo from "../assets/showstopper-logo.webp";
import { useNavigate } from "react-router-dom";

const Header = ({ onBrochureClick }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", target: "hero", icon: <Home size={18} /> },
    { name: "About", target: "about", icon: <Info size={18} /> },
    { name: "Price", target: "price", icon: <IndianRupee size={18} /> },
    {
      name: "Amenities",
      target: "amenities",
      icon: <TreeDeciduous size={18} />,
    },
    { name: "Floor Plan", target: "floorplan", icon: <Layout size={18} /> },
    { name: "Location", target: "location", icon: <MapPin size={18} /> },
  ];

  const handleNavClick = (target) => {
    navigate("/");
    setIsOpen(false);

    setTimeout(() => {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 120);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-100 font-sans">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo - Also scrolls to top */}
        <div className="flex items-center cursor-pointer">
          <Link to="hero" smooth={true} duration={500}>
            <img
              src={logo}
              alt="Logo"
              className="h-15 w-46 border border-amber-900 p-1 bg-black"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-700">
          {navLinks.map((link) => (
            <span
              key={link.name}
              onClick={() => handleNavClick(link.target)}
              className="flex items-center gap-1 cursor-pointer hover:text-indigo-700 transition-colors py-5"
            >
              {link.icon} {link.name}
            </span>
          ))}

          <button
            onClick={onBrochureClick}
            className="flex items-center gap-2 bg-[#FF7F5C] text-white px-4 py-2 rounded shadow-md hover:bg-[#e06b4a] transition-all ml-4"
          >
            <Download size={16} /> BROCHURE
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-700 focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden fixed left-0 w-full bg-white shadow-2xl transition-all duration-300 ease-in-out z-50 
    ${
      isOpen
        ? "top-14 opacity-100 translate-y-0 visible"
        : "top-10 opacity-0 -translate-y-4 invisible pointer-events-none"
    }`}
      >
        <div className="px-6 py-6 space-y-4 border-t border-gray-100">
          {navLinks.map((link) => (
            <div
              key={link.name}
              onClick={() => handleNavClick(link.target)}
              className="flex items-center gap-3 text-slate-700 font-medium py-3 border-b border-gray-50 cursor-pointer active:bg-gray-50 transition-colors"
            >
              <span className="text-indigo-700">{link.icon}</span>
              {link.name}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Header;
