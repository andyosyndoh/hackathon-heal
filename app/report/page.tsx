'use client';

import { useState } from 'react';
import {
  Heart,
  Shield,
  Menu,
  X,
  AlertTriangle,
  Phone,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import NextImage from 'next/image';

export default function ReportPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    incidentType: '',
    urgencyLevel: '',
    description: '',
    submitAnonymously: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Report submitted successfully. Your safety is our priority.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-[#FEF5E3] flex flex-col">
      {/* Navigation - Same as landing page */}
      <nav className="bg-[#EFE6D1] sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Left */}
            <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
              <Image
                src="/Heal-logo.webp"
                alt="HEAL Logo"
                width={80}
                height={80}
                className="h-30 w-30 object-contain transition-all duration-500 drop-shadow-[0_4px_10px_rgba(0,0,0,0.25)] group-hover:scale-115 group-hover:rotate-3 group-hover:drop-shadow-[0_6px_16px_rgba(0,0,0,0.35)]"
                priority
              />
              <span className="font-acme text-3xl font-bold text-brand-primary group-hover:text-brand-dark transition-all duration-300 group-hover:tracking-wider">
                HEAL
              </span>
            </Link>

            {/* Center Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1 space-x-6 xl:space-x-8 mx-8">
              <Link
                href="/"
                className="font-acme text-brand-primary hover:text-brand-dark transition-all duration-300 text-sm uppercase tracking-wide relative group/nav hover:scale-110 hover:tracking-wider"
              >
                HOME
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-dark group-hover/nav:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/#about"
                className="font-acme text-brand-primary hover:text-brand-dark transition-all duration-300 text-sm uppercase tracking-wide relative group/nav hover:scale-110 hover:tracking-wider"
              >
                ABOUT HEAL
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-dark group-hover/nav:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/#services"
                className="font-acme text-brand-primary hover:text-brand-dark transition-all duration-300 text-sm uppercase tracking-wide relative group/nav hover:scale-110 hover:tracking-wider"
              >
                SERVICES
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-dark group-hover/nav:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/#resources"
                className="font-acme text-brand-primary hover:text-brand-dark transition-all duration-300 text-sm uppercase tracking-wide relative group/nav hover:scale-110 hover:tracking-wider"
              >
                RESOURCES
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-dark group-hover/nav:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/report"
                className="font-acme text-brand-primary hover:text-brand-dark transition-all duration-300 text-sm uppercase tracking-wide relative group/nav hover:scale-110 hover:tracking-wider border-b-2 border-brand-primary"
              >
                REPORT
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-dark"></span>
              </Link>
            </div>

            {/* Right Side Buttons */}
            <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
              <Link
                href="#contact"
                className="font-acme text-brand-primary hover:text-brand-dark transition-all duration-300 text-sm uppercase tracking-wide relative group/nav hover:scale-110 hover:tracking-wider"
              >
                CONTACT US
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-dark group-hover/nav:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="#donate"
                className="font-acme bg-brand-primary hover:bg-brand-accent text-white py-2.5 px-6 rounded-full transition-all duration-300 text-sm uppercase tracking-wide shadow-md hover:shadow-xl hover:scale-105 active:scale-95 hover:-translate-y-0.5"
              >
                DONATE
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-brand-primary rounded-lg hover:bg-brand-light/50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden bg-brand-cream border-t border-brand-light py-4">
              <div className="flex flex-col space-y-3">
                <Link
                  href="/"
                  className="font-acme text-brand-primary hover:text-brand-dark transition-all duration-300 px-4 py-2 text-sm uppercase tracking-wide hover:bg-brand-light/50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  HOME
                </Link>
                <Link
                  href="/#about"
                  className="font-acme text-brand-primary hover:text-brand-dark transition-all duration-300 px-4 py-2 text-sm uppercase tracking-wide hover:bg-brand-light/50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ABOUT HEAL
                </Link>
                <Link
                  href="/#services"
                  className="font-acme text-brand-primary hover:text-brand-dark transition-all duration-300 px-4 py-2 text-sm uppercase tracking-wide hover:bg-brand-light/50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  SERVICES
                </Link>
                <Link
                  href="/#resources"
                  className="font-acme text-brand-primary hover:text-brand-dark transition-all duration-300 px-4 py-2 text-sm uppercase tracking-wide hover:bg-brand-light/50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  RESOURCES
                </Link>
                <Link
                  href="/report"
                  className="font-acme text-brand-primary hover:text-brand-dark transition-all duration-300 px-4 py-2 text-sm uppercase tracking-wide hover:bg-brand-light/50 rounded-lg bg-brand-light/30"
                  onClick={() => setIsMenuOpen(false)}
                >
                  REPORT
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative min-h-[calc(100vh-10rem)]">
          {/* Decoration elements - positioned relative to the main content area */}
          <div className="absolute z-10 w-full h-full">
            {/* Top left */}
            <div className="absolute top-[5%] left-[5%] transform -rotate-12">
              <NextImage 
                src="/images/decoration.png" 
                alt="" 
                width={64}
                height={64}
                className="w-12 sm:w-20 sm:h-20"
                priority 
              />
            </div>
            
            {/* Top right */}
            <div className="absolute top-[15%] right-[5%] transform rotate-25">
              <NextImage 
                src="/images/decoration.png" 
                alt="" 
                width={80}
                height={80}
                className="w-18 h-18 sm:w-20 sm:h-20"
                priority 
              />
            </div>
            
            {/* Middle left */}
            <div className="absolute top-[40%] left-[3%] transform -rotate-15">
              <NextImage 
                src="/images/decoration.png" 
                alt="" 
                width={72}
                height={72}
                className="w-18 h-18 sm:w-20 sm:h-20"
                priority 
              />
            </div>
            
            {/* Middle right */}
            <div className="absolute bottom-[30%] right-[5%] transform rotate-15">
              <NextImage 
                src="/images/decoration.png" 
                alt="" 
                width={64}
                height={64}
                className="w-18 h-18 sm:w-20 sm:h-20"
                priority 
              />
            </div>
            
            {/* Bottom center */}
            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 transform rotate-12">
              <NextImage 
                src="/images/decoration.png" 
                alt="" 
                width={56}
                height={56}
                className="w-18 h-18 sm:w-20 sm:h-20"
                priority 
              />
            </div>
          </div>
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-acme text-[72px] sm:text-5xl font-bold text-brand-primary mb-4">
              Report A Case
            </h1>
            <p className="font-acme text-[48px] mb-2 text-black">
              Your safety and privacy are our priority.
            </p>
            <p className="font-acme text-[48px] text-black whitespace-nowrap">
              Submit a detailed report about any GBV incident.
            </p>
          </div>

          

          {/* Emergency Situation Alert */}
          <div className="bg-transparent p-6 pt-0 mb-8 ml-14">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-acme text-[24px] text-red-900">Emergency Situation?</h3>
                  <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0" />
                </div>
                <p className="text-[20px] font-acme text-red-800 mb-4">
                  If you are in immediate danger, please contact emergency services immediately.
                </p>
                <div className="flex justify-center justify-space-between items-center flex-wrap gap-20">
                  <a
                    href="tel:911"
                    className="w-[30%] justify-center bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-acme text-[20px] transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
                  >
                    <Phone className="h-18 w-18" />
                    Call 911
                  </a>
                  <a
                    href="tel:1195"
                    className="w-[40%] justify-center bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-acme text-[20px] transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
                  >
                    <Phone className="h-18 w-18" />
                    Call GBV Hotline: 1195
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Report Form */}
          <div className="bg-transparent p-6 sm:p-8">
            <div className="flex items-start gap-3 mb-6">
              <Shield className="h-18 w-18 text-brand-teal flex-shrink-0 mt-1" strokeWidth={3} />
              <div>
                <h2 className="font-acme text-xl text-brand-primary mb-1">Incident Report Form</h2>
                <p className="text-xl font-acme text-brand-secondary">
                  Please provide as much detail as possible. All information is confidential.
                </p>
              </div>
            </div>

            {/* Anonymous Submission Toggle */}
            <div className="bg-brand-teal rounded-lg p-4 mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="submitAnonymously"
                  checked={formData.submitAnonymously}
                  onChange={handleChange}
                  className="w-5 h-5 text-brand-teal border-brand-teal/30 rounded focus:ring-brand-teal"
                />
                <span className="font-acme text-black text-lg">Submit this report anonymously</span>
              </label>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Incident Information Section */}
              <div>
                <h3 className="font-acme text-lg text-brand-teal mb-4">Incident Information</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Type of Incident */}
                  <div>
                    <label className="font-acme text-lg font-medium text-brand-primary mb-2">
                      Type of Incident <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="incidentType"
                      value={formData.incidentType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-[#ECF5F7]  border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent bg-white text-brand-primary"
                    >
                      <option value="">Select incident type</option>
                      <option value="physical">Physical Violence</option>
                      <option value="sexual">Sexual Violence</option>
                      <option value="emotional">Emotional Abuse</option>
                      <option value="financial">Financial Abuse</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Urgency Level */}
                  <div>
                    <label className="font-acme text-lg font-medium text-brand-primary mb-2">
                      Urgency Level <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="urgencyLevel"
                      value={formData.urgencyLevel}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-[#ECF5F7] border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent bg-white text-brand-primary"
                    >
                      <option value="">Select urgency level</option>
                      <option value="low">Low - Past incident</option>
                      <option value="medium">Medium - Ongoing concern</option>
                      <option value="high">High - Recent incident</option>
                      <option value="critical">Critical - Immediate danger</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="font-acme text-lg font-medium text-brand-primary mb-2">
                    Description of Incident <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Please tell us more about the incident"
                    className="w-full px-4 py-3 bg-[#ECF5F7] border border-brand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent resize-none bg-white text-brand-primary placeholder:text-brand-gray"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-4 border-t border-brand-light">
                <div className="flex items-center gap-2 text-sm text-brand-secondary">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>All reports are encrypted and secure</span>
                </div>
                <button
                  type="submit"
                  className="bg-brand-primary hover:bg-brand-accent text-white px-8 py-3 rounded-full font-acme text-base transition-all shadow-md hover:shadow-lg hover:scale-105"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer - Same as landing page */}
      <footer className="bg-gray-900 text-gray-300 py-8 sm:py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                <span className="text-lg sm:text-xl font-bold text-white">Heal</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Professional mental health support powered by AI,
                designed with privacy and safety as our top priorities.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/crisis" className="hover:text-white transition-colors">Crisis Support</Link></li>
                <li><Link href="/resources" className="hover:text-white transition-colors">Resources</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Emergency</h3>
              <div className="space-y-2 text-sm">
                <p className="text-red-400 font-medium">If you're in crisis:</p>
                <p>Call 999 (Suicide & Crisis Lifeline)</p>
                <p>Text "HELLO" to 741741</p>
                <p>Or call 911</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400">
            <p>&copy; 2024 Heal. All rights reserved. This platform is designed for informational and support purposes only and does not replace professional medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

