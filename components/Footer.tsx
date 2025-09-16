import React from "react";
import {
  FaTwitter,
  FaLinkedin,
  FaLinkedinIn,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#123136] text-gray-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center space-x-2">
              <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#123136"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-full h-full"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                  <path d="M16 12a4 4 0 1 0-8 0 4 4 0 0 0 8 0z" />
                  <path d="M16 12a4 4 0 1 0-8 0 4 4 0 0 0 8 0z" />
                </svg>
              </div>
              <span className="text-3xl font-bold">HEAL</span>
            </div>
            <span className="text-xs">YOUR SUSTAINING CARE PARTNER</span>
          </div>
          <p className="text-sm mt-4">
            Navigating Mental Health Care with your Listening, Caring Partner
            Anytime, Anywhere
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-xl font-semibold mb-4">QUICK-LINKS</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                About Heal
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                We Listen - Safe Space
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Chat Anonymously - Chat Space
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Report - Seek Help
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Get In Touch
              </a>
            </li>
          </ul>
        </div>

        {/* Get In Touch Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-xl font-semibold mb-4">GET IN TOUCH</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="mailto:contact@heal.org" className="hover:underline">
                contactheal.org@gmail.com
              </a>
            </li>
            <li>
              <a
                href="mailto:producer@healprojectmanager"
                className="hover:underline"
              >
                producer@healprojectmanager
              </a>
            </li>
            <li>
              <a
                href="mailto:partnership@heal.communications.com"
                className="hover:underline"
              >
                partnership@heal.communications.com
              </a>
            </li>
            <li>
              <a href="mailto:media@healmedia.com" className="hover:underline">
                media@healmedia.com
              </a>
            </li>
          </ul>
        </div>

        {/* Subscribe & Follow Us Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-xl font-semibold mb-4">SUBSCRIBE & FOLLOW US</h4>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-2xl">
            {/* Social media icons replaced with emojis due to unresolved dependency */}
            <a
              href="#"
              className="hover:text-blue-400 transition-colors duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="hover:text-blue-700 transition-colors duration-300"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="hover:text-purple-600 transition-colors duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="hover:text-green-500 transition-colors duration-300"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="hover:text-gray-400 transition-colors duration-300"
            >
              <FaYoutube />
            </a>
            <a
              href="#"
              className="hover:text-red-500 transition-colors duration-300"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-600 text-sm flex flex-col md:flex-row items-center justify-between text-center md:text-left space-y-4 md:space-y-0">
        <span>Copyright © 2025 heal.org — All Rights Reserved.</span>
        <span>Powered by heal.org</span>
      </div>
    </footer>
  );
};

export default Footer;
