'use client';

import { useState, useEffect } from 'react';
import { 
  Heart, 
  Shield, 
  Brain, 
  Users, 
  Phone, 
  ArrowRight,
  Star,
  CheckCircle,
  Menu,
  X,
  Play,
  Volume2,
  MessageCircle
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const playWelcomeAudio = () => {
    if (isPlayingAudio) return;
    
    setIsPlayingAudio(true);
    const audio = new Audio('/sounds/Welcome_ to Heal_Text_to_Speech_audio.mp3');
    audio.play().catch(console.error);
    audio.onended = () => setIsPlayingAudio(false);
    audio.onerror = () => setIsPlayingAudio(false);
  };

  const PrivacyModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
            <button onClick={() => setShowPrivacyModal(false)} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">
              At Heal, we prioritize your privacy and data security. This policy outlines how we collect, use, and protect your information.
            </p>
            <h3 className="text-lg font-semibold mb-2">Data Collection</h3>
            <p className="text-gray-600 mb-4">
              We collect only the information necessary to provide our mental health services, including account information and conversation data for AI improvement.
            </p>
            <h3 className="text-lg font-semibold mb-2">Data Protection</h3>
            <p className="text-gray-600 mb-4">
              All data is encrypted end-to-end and stored securely. We never share personal information with third parties without explicit consent.
            </p>
            <h3 className="text-lg font-semibold mb-2">Your Rights</h3>
            <p className="text-gray-600 mb-4">
              You have the right to access, modify, or delete your data at any time. Contact us for any privacy-related concerns.
            </p>
          </div>
          <button 
            onClick={() => setShowPrivacyModal(false)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Support',
      description: 'Advanced AI companions provide 24/7 emotional support with personalized conversations and evidence-based therapeutic techniques.'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'End-to-end encryption ensures your conversations remain completely private and secure with zero-knowledge architecture.'
    },
    {
      icon: Phone,
      title: 'Crisis Management',
      description: 'Immediate emergency response protocols with location-based services and direct connection to crisis professionals.'
    },
    {
      icon: Users,
      title: 'Expert Network',
      description: 'Access to licensed therapists and mental health professionals for comprehensive care when you need it most.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Student',
      content: 'Heal has been a lifeline during my anxiety struggles. The AI support is surprisingly understanding and helpful.',
      rating: 5
    },
    {
      name: 'Dr. James K.',
      role: 'Clinical Psychologist',
      content: 'The clinical accuracy and safety protocols make this a valuable tool for mental health support.',
      rating: 5
    },
    {
      name: 'Maria L.',
      role: 'Working Professional',
      content: 'Having 24/7 access to support has made managing my mental health so much more manageable.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-[#FCF4E3] border-b border-gray-200 sticky top-0 z-50" style={{ fontFamily: 'Acme, sans-serif' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Enlarged */}
            <div className="flex items-center">
              <Image 
                src="/images/healLOGO.png" 
                alt="HEAL Logo" 
                width={120}
                height={120}
                className="h-20 w-auto"
                priority
              />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-10">
              <Link href="/" className="text-[#061020] hover:text-[#044750] transition-colors text-base font-semibold">
                HOME
              </Link>
              <Link href="#about" className="text-[#044750] hover:text-[#061020] transition-colors text-base font-semibold">
                ABOUT HEAL
              </Link>
              <Link href="/services" className="text-[#044750] hover:text-[#061020] transition-colors text-base font-semibold">
                SERVICES
              </Link>
              <Link href="/resources" className="text-[#044750] hover:text-[#061020] transition-colors text-base font-semibold">
                RESOURCES
              </Link>
              <Link href="/report" className="text-[#044750] hover:text-[#061020] transition-colors text-base font-semibold">
                REPORT
              </Link>
              <Link href="/contact" className="text-[#044750] hover:text-[#061020] transition-colors text-base font-semibold">
                CONTACT US
              </Link>
            </div>

            {/* Donate Button */}
            <div className="hidden lg:block">
              <Link href="/donate" className="bg-[#016A79] hover:bg-[#014d5a] text-white px-8 py-3 rounded-full text-base font-semibold transition-colors duration-200 flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>DONATE</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden bg-[#FCF4E3] border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="text-gray-800 hover:text-[#016A79] transition-colors px-4 text-sm font-medium">
                  HOME
                </Link>
                <Link href="#about" className="text-gray-800 hover:text-[#016A79] transition-colors px-4 text-sm font-medium">
                  ABOUT HEAL
                </Link>
                <Link href="/services" className="text-gray-800 hover:text-[#016A79] transition-colors px-4 text-sm font-medium">
                  SERVICES
                </Link>
                <Link href="/resources" className="text-gray-800 hover:text-[#016A79] transition-colors px-4 text-sm font-medium">
                  RESOURCES
                </Link>
                <Link href="/report" className="text-gray-800 hover:text-[#016A79] transition-colors px-4 text-sm font-medium">
                  REPORT
                </Link>
                <Link href="/contact" className="text-gray-800 hover:text-[#016A79] transition-colors px-4 text-sm font-medium">
                  CONTACT US
                </Link>
                <div className="px-4">
                  <Link href="/donate" className="bg-[#016A79] hover:bg-[#014d5a] text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                    <Heart className="h-4 w-4" />
                    <span>DONATE</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Exact replica of screenshot */}
      <section className="relative min-h-screen bg-[#FCF4E3] flex flex-col overflow-hidden" style={{ fontFamily: 'Acme, sans-serif' }}>
        {/* Decorative Stars scattered across the page */}
        <div className="absolute inset-0 pointer-events-none opacity-80">
          <Image src="/images/stars.png" alt="" width={120} height={120} className="absolute top-16 left-20" />
          <Image src="/images/stars.png" alt="" width={100} height={100} className="absolute top-32 right-24" />
          <Image src="/images/stars.png" alt="" width={90} height={90} className="absolute top-1/2 left-16" />
          <Image src="/images/stars.png" alt="" width={110} height={110} className="absolute top-1/3 right-12" />
          <Image src="/images/stars.png" alt="" width={85} height={85} className="absolute bottom-32 left-32" />
          <Image src="/images/stars.png" alt="" width={120} height={120} className="absolute bottom-20 right-28" />
          <Image src="/images/stars.png" alt="" width={95} height={95} className="absolute top-24 left-1/2" />
          <Image src="/images/stars.png" alt="" width={80} height={80} className="absolute bottom-40 left-1/4" />
          <Image src="/images/stars.png" alt="" width={105} height={105} className="absolute top-40 right-1/3" />
        </div>
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
              {/* Left Side - Illustration */}
              <div className="flex justify-center lg:justify-start relative">

                
                <Image
                  src="/images/HomeHerosection.png"
                  alt="Caring couple illustration"
                  width={400}
                  height={400}
                  className=""
                  priority
                />
              </div>
              
              {/* Right Side - Text */}
              <div className="text-center relative">

                
                <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-[#006775] mb-6 leading-tight">
                  Welcome To HEAL
                </h1>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#006775] leading-tight">
                  Your Listening Caring Partner
                </h2>
              </div>
            </div>
          </div>
          
          {/* Anonymous Access Button - Right side above white band */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="flex items-center justify-end gap-4">
              <Image
                src="/images/homepagearrow1.png"
                alt="Arrow pointing to button"
                width={100}
                height={100}
                className=""
              />
              <Link 
                href="/chat?anonymous=true" 
                className="bg-[#006775] hover:bg-[#004d5a] text-white py-3 px-8 rounded-full text-sm transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Anonymous Access
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bottom White Band */}
        <div className="bg-white py-6 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Left - Privacy Policy Text */}
            <div className="text-base text-gray-700 text-center sm:text-left">
              By clicking the arrow, you acknowledge and agree to our{' '}
              <button 
                onClick={() => setShowPrivacyModal(true)}
                className="text-[#006775] hover:underline font-medium"
              >
                Privacy Policy
              </button>
              , and to activate your audio
            </div>
            
            {/* Center - Audio Play Button */}
            <button
              onClick={playWelcomeAudio}
              disabled={isPlayingAudio}
              className="bg-[#006775] hover:bg-[#004d5a] text-white p-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 flex items-center justify-center"
              aria-label="Play welcome audio"
            >
              {isPlayingAudio ? (
                <Volume2 className="h-7 w-7 animate-pulse" />
              ) : (
                <Play className="h-7 w-7" />
              )}
            </button>
            
            {/* Right - Audio Timer (countdown) */}
            <div className="flex items-center gap-2">
              <div className="text-base text-gray-600 font-mono bg-gray-50 px-4 py-2 rounded-full">
                00:00 / 01:14:49
              </div>
            </div>
          </div>
        </div>
        
        {/* Privacy Modal */}
        {showPrivacyModal && <PrivacyModal />}
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Mental Health Support
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Our platform combines cutting-edge AI technology with human expertise 
              to provide the support you need, when you need it.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="heal-card p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Built by Mental Health Professionals
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                Heal was created by a team of licensed therapists, AI researchers, and security experts 
                to provide accessible, effective mental health support that prioritizes your privacy and safety.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Evidence-based therapeutic approaches</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">24/7 crisis intervention protocols</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Continuous clinical supervision</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Regular safety and efficacy audits</span>
                </div>
              </div>
            </div>
            <div className="heal-card p-6 sm:p-8">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  To make professional mental health support accessible to everyone, 
                  breaking down barriers of cost, availability, and stigma through 
                  innovative technology and compassionate care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              See how Heal has made a difference in the lives of our users and 
              earned the trust of mental health professionals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="heal-card p-4 sm:p-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-3 sm:mb-4 italic text-sm sm:text-base">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</div>
                  <div className="text-xs sm:text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Begin Your Healing Journey?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 leading-relaxed">
            Join thousands who have found support, healing, and hope through our platform. 
            Your mental health matters, and we're here to help every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/auth?mode=signup" className="bg-white text-blue-600 hover:bg-gray-50 font-medium py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-200 text-base sm:text-lg">
              Start Free Today
            </Link>
            <Link href="/crisis" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-medium py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-200 text-base sm:text-lg">
              Need Immediate Help?
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 sm:py-12">
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