'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Heart,
  Shield,
  Brain,
  Users,
  Phone,
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);


  // Pause audio when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to play audio
  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error('Audio playback failed:', error);
        alert('Could not play audio. Check that /public/sounds/Heal_audio.mp3 exists and is a valid MP3 file.');
      });
    }
  };


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



  return (
    <div className="min-h-screen bg-[#FEF5E3]">
      <Navbar />

      {/* Hero Section */}
      {/* <section className="relative overflow-hidden py-12 sm:py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className={`${isLoaded ? 'fade-in-up' : 'opacity-0'}`}>
              <h1 className=" font-acme text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6">
                Welcome To Heal
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#056173] via-[#81A9AD] to-[#0C444B]">
                  Your Listening, Caring Patner
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
                AI powered Mental health care and support anytime, anywhere
                Immediate • Confidential • Judgment-Free and Culturally-sensitive Care designed with you in mind.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
                <Link href="/auth/signup" className="heal-button text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
                <Link href="/crisis" className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-200 text-base sm:text-lg w-full sm:w-auto text-center">
                  Crisis Support
                </Link>
              </div>
            </div> */}

      {/* Trust Indicators */}
      {/* <div className={`${isLoaded ? 'fade-in-up' : 'opacity-0'} grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-16 px-4`}>
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
           <br />
           <br />
           <br />   */}

      {/* Hero Section */}
      <section 
        className="relative overflow-hidden py-12 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/Hero-bg-image.png)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center space-x-10">
            {/* Left: Image */}
            <div className={`${isLoaded ? 'fade-in-up' : 'opacity-0'} flex justify-center lg:justify-start`}>
              <Image
                src="images/Heal-hero-section.png"
                alt="Heal Hero Section"
                width={80}
                height={80}
                className="w-full object-contain"
                priority
              />
            </div>
            {/* Right: Text Content */}
            <div className="text-center">
              <div className={`${isLoaded ? 'fade-in-up' : 'opacity-0'}`}>
                <h1 className="font-acme text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Welcome To Heal
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#056173] via-[#81A9AD] to-[#0C444B] whitespace-nowrap">
                    Your Listening, Caring Partner
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  AI powered Mental health care and support anytime, anywhere
                  Immediate • Confidential • Judgment-Free and Culturally-sensitive Care designed with you in mind.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12">
                  <Link
                    href="/auth/signup"
                    className="bg-[#044750] hover:bg-[#056173] text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 font-acme inline-flex items-center justify-center whitespace-nowrap"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                  <Link href="/crisis" className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-200 text-base sm:text-lg w-full sm:w-auto text-center">
                    Crisis Support
                  </Link>
                </div>
              </div>
              {/* Trust Indicators */}
              <div className={`${isLoaded ? 'fade-in-up' : 'opacity-0'} grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6`}>
                <div className="flex items-center justify-center space-x-2">
                  <Shield className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                  <span className="text-gray-700 font-medium text-sm sm:text-base">HIPAA Compliant</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Clinically Verified</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <Star className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-500" />
                  <span className="text-gray-700 font-medium text-sm sm:text-base">5-Star Rated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />



        {/* White footer section */}
        <div className="bg-white mt-12 sm:mt-20 py-4 sm:py-6 text-center border-t border-gray-100">
          <div className="font-acme flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-sm sm:text-base text-gray-700">
            <p>
              By clicking the arrow, you acknowledge and agree to our{" "}
              <Link href="/privacy-policy" className="font-acme text-[#056173] underline hover:text-[#0C444B] transition-colors">
                Privacy Policy
              </Link>
              , and to activate your audio
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePlayAudio}
                className="bg-[#056173] hover:bg-[#0C444B] text-white rounded-full p-3 transition-all duration-200 hover:scale-105"
                aria-label="Play audio"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
              <span className="text-gray-600 text-sm">00:00 / 01:46:59</span>
            </div>
          </div>

          {/* Hidden audio element */}
          <audio ref={audioRef} src="/sounds/Heal_audio.mp3" preload="auto" />

        </div>

      </section>


      {/* Features Section */}
      <section id="features" className="py-12 sm:py-20 bg-[#FEF5E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#044750] mb-4 font-acme">
              Comprehensive Mental Health Support
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto px-4 font-acme">
              Our platform combines cutting-edge AI technology with human expertise
              to provide the support you need, when you need it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300 rounded-lg border border-[#81A9AD]/20 hover:scale-105 hover:bg-[#F5F5DC] cursor-pointer group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#81A9AD]/20 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-[#044750] transition-colors duration-300">
                  <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#044750] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-[#044750] mb-2 font-acme">{feature.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-acme">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-20 bg-[#FEF5E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#044750] mb-4 sm:mb-6 font-acme">
                Built by Mental Health Professionals
              </h2>
              <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed font-acme">
                Heal was created by a team of licensed therapists, AI researchers, and security experts
                to provide accessible, effective mental health support that prioritizes your privacy and safety.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#81A9AD] flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base font-acme">Evidence-based therapeutic approaches</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#81A9AD] flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base font-acme">24/7 crisis intervention protocols</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#81A9AD] flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base font-acme">Continuous clinical supervision</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#81A9AD] flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base font-acme">Regular safety and efficacy audits</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              {[
                { title: 'Heal', content: '"You deserve healing — not shame. This is a safe space to begin."' },
                { title: 'Healing', content: '"Healing is not a moment. It\'s a journey — and you don\'t have to walk it alone."' },
                { title: 'Empowerment', content: '"We place survivors at the center — restoring voice, agency, and dignity."' },
                { title: 'Action', content: '"We turn support into action — connecting you to tools, people, and care that create real change."' },
                { title: 'Liberation', content: '"Liberation means freedom beyond the trauma — freedom to live fully, confidently, and joyfully."' }
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-[#81A9AD]/20 hover:shadow-lg transition-all duration-300 hover:scale-102 cursor-pointer group">
                  <h4 className="text-lg font-bold text-[#044750] mb-2 font-acme">{item.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed font-acme italic">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Healing Without Barriers Section */}
      <section 
        className="py-16 sm:py-24 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: 'url(/images/home-no3.png)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 font-acme">
              Healing Without Barriers
            </h2>
            <p className="text-lg sm:text-xl text-white mb-8 font-acme">
              Hope • Empowerment • Action • Love
            </p>
            <Link 
              href="/auth/signup" 
              className="text-black font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 font-acme hover:bg-opacity-90" style={{backgroundColor: '#FEF0D3'}}
            >
              Let's Start Here
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="flex items-center justify-center w-full bg-[#fef0d3] py-20 px-4">
        <div className="w-full max-w-7xl rounded-[20px] shadow-sm bg-gradient-to-r from-white to-[#e8f3ff] flex flex-col lg:flex-row items-center justify-between gap-10 px-8 lg:px-16 py-12">
          {/* LEFT CONTENT */}
          <div className="flex flex-col w-full align-center justify-end lg:w-1/2">
            <h2 className="font-acme text-[#2a4045] text-2xl lg:text-[34px] leading-[42px] mb-3">
              Sign up for our newsletter!
            </h2>
            <p className="font-acme text-[#6b7c93] text-base lg:text-lg leading-7 max-w-[480px]">
              Get notified about updates, join us in building a world where mental health care is accessible without barriers.
            </p>
          </div>

          {/* RIGHT FORM */}
          <form className="w-full lg:w-1/2 flex flex-col items-center gap-3 lg:gap-4">
            <input
              type="text"
              placeholder="Enter Your First Name"
              className="flex-1 w-full px-5 py-[14px] bg-white rounded-[25px] border border-[#ecf2f7] shadow-sm font-acme text-[#7a7a7a] focus:outline-none focus:ring-2 focus:ring-[#016a79]"
            />
            <input
              type="text"
              placeholder="Enter Your Last Name"
              className="flex-1 w-full px-5 py-[14px] bg-white rounded-[25px] border border-[#ecf2f7] shadow-sm font-acme text-[#7a7a7a] focus:outline-none focus:ring-2 focus:ring-[#016a79]"
            />
            <input
              type="email"
              placeholder="Enter Your Email"
              className="flex-1 w-full px-5 py-[14px] bg-white rounded-[25px] border border-[#ecf2f7] shadow-sm font-acme text-[#6b7c93] focus:outline-none focus:ring-2 focus:ring-[#016a79]"
            />
            <div className="flex w-full">
              <button
                type="submit"
                className="mt-2 ml-auto h-auto px-8 py-[13px] bg-[#1a1a1a] rounded-[25px] font-acme text-white text-sm uppercase tracking-[0.5px] hover:bg-[#333] transition-all"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}