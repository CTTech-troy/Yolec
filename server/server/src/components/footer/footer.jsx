import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <p className="text-gray-400 mb-6">
              Transforming education through innovative and impactful events that connect professionals worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-facebook-fill"></i>
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-twitter-fill"></i>
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-linkedin-fill"></i>
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-instagram-fill"></i>
                </div>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#events" className="text-gray-400 hover:text-white transition-colors">Events</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Event Calendar</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partnerships</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-5 h-5 flex items-center justify-center text-gray-400 mr-3 mt-1">
                  <i className="ri-map-pin-line"></i>
                </div>
                <span className="text-gray-400">Yolechub House, Ibadan Oko, Ogun State</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 flex items-center justify-center text-gray-400 mr-3 mt-1">
                  <i className="ri-phone-line"></i>
                </div>
                <span className="text-gray-400">+234 803 721 6846</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 flex items-center justify-center text-gray-400 mr-3 mt-1">
                  <i className="ri-mail-line"></i>
                </div>
                <span className="text-gray-400">info@yolec.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 Yolec. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
