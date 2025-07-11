import React, { useState } from 'react';
import Logo from '../../assets/logo.png'; // Assuming you have a logo image

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-white bg-opacity-90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <img
            src={Logo}
            alt="Yolec Logo"
            className="h-10 w-auto"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="https://yolechub.com.ng/" className="nav-link text-gray-800 hover:text-primary font-medium">Home</a>
          {/* <a href="#about" className="nav-link text-gray-800 hover:text-primary font-medium">About</a>
          <a href="#events" className="nav-link text-gray-800 hover:text-primary font-medium">Events</a>
          <a href="#testimonials" className="nav-link text-gray-800 hover:text-primary font-medium">Testimonials</a>
          <a href="#contact" className="nav-link text-gray-800 hover:text-primary font-medium">Contact</a> */}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center text-gray-800"
        >
          <i className="ri-menu-line ri-2x"></i>
        </button>
      </div>

      {/* Mobile Navigation */}
      {/* {mobileMenuOpen && (
        <div className="md:hidden bg-white w-full">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#home" className="text-gray-800 hover:text-primary font-medium py-2">Home</a>
            <a href="#about" className="text-gray-800 hover:text-primary font-medium py-2">About</a>
            <a href="#events" className="text-gray-800 hover:text-primary font-medium py-2">Events</a>
            <a href="#testimonials" className="text-gray-800 hover:text-primary font-medium py-2">Testimonials</a>
            <a href="#contact" className="text-gray-800 hover:text-primary font-medium py-2">Contact</a>
          </div>
        </div>
      )} */}
    </header>
  );
};

export default Header;
