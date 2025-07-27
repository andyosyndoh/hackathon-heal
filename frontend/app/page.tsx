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
  X
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <span className="text-xl sm:text-2xl font-bold text-gray-900">Heal</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link href="#features" className="text-gray-700 hover:text-blue-600 transition-colors text-sm lg:text-base">
                Features
              </Link>
              <Link href="#about" className="text-gray-700 hover:text-blue-600 transition-colors text-sm lg:text-base">
                About
              </Link>
              <Link href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors text-sm lg:text-base">
                Testimonials
              </Link>
              <Link href="/donate" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors text-sm lg:text-base">
                <Heart className="h-4 w-4" />
                Donate
              </Link>
              <Link href="/auth" className="text-blue-600 hover:text-blue-700 font-medium text-sm lg:text-base">
                Sign In
              </Link>
              <Link href="/auth?mode=signup" className="heal-button">
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <Link href="#features" className="text-gray-700 hover:text-blue-600 transition-colors px-4 text-sm">
                  Features
                </Link>
                <Link href="#about" className="text-gray-700 hover:text-blue-600 transition-colors px-4 text-sm">
                  About
                </Link>
                <Link href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors px-4 text-sm">
                  Testimonials
                </Link>
                <Link href="/donate" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors px-4 text-sm">
                  <Heart className="h-4 w-4" />
                  Donate
                </Link>
                <Link href="/auth" className="text-blue-600 hover:text-blue-700 font-medium px-4 text-sm">
                  Sign In
                </Link>
                <div className="px-4">
                  <Link href="/auth?mode=signup" className="heal-button block text-center">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className={`${isLoaded ? 'fade-in-up' : 'opacity-0'}`}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6">
                Your Mental Health,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                  Our Priority
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
                Professional mental health support powered by AI, with 24/7 availability, 
                crisis management, and privacy-first design. Your journey to wellness starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
                <Link href="/auth?mode=signup" className="heal-button text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
                <Link href="/crisis" className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-200 text-base sm:text-lg w-full sm:w-auto text-center">
                  Crisis Support
                </Link>
              </div>
            </div>
            
            {/* Trust Indicators */}
            <div className={`${isLoaded ? 'fade-in-up' : 'opacity-0'} grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-16 px-4`}>
              <div className="flex items-center justify-center space-x-2">
                <Shield className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                <span className="text-gray-700 font-medium text-sm sm:text-base">HIPAA Compliant</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                <span className="text-gray-700 font-medium text-sm sm:text-base">Clinically Verified</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Star className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-500" />
                <span className="text-gray-700 font-medium text-sm sm:text-base">5-Star Rated</span>
              </div>
            </div>
          </div>
        </div>
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
