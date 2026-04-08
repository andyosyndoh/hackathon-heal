'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FEF5E3]">

      <Navbar />
      {/*Hero section*/}
    <section className="relative lg:h-[66.66666667vh] text-white pt-28 lg:pt-20 lg:pb-0 overflow-hidden flex items-center -mt-20" style={{background: 'linear-gradient(180deg, #DCE7E1 0%, #016A79 100%)'}}>
      
      {/* Decorative Sunbursts */}
      <Image 
        src="/images/decoration.png" 
        alt="Decorative sunburst" 
        className="absolute"
        style={{ inset: '15% 5% auto 50%' }}
        width={50}
        height={50}
        priority 
      />
      <Image 
        src="/images/decoration.png" 
        alt="Decorative sunburst" 
        className="absolute hidden lg:block -rotate-6"
        style={{ inset: '20% auto auto 48%' }}
        width={70}
        height={70}
        priority 
      />
      <Image 
        src="/images/decoration.png" 
        alt="Decorative sunburst" 
        className="absolute"
        style={{ inset: '15% 5% auto auto' }}
        width={50}
        height={50}
        priority 
      />
      <Image 
        src="/images/decoration.png" 
        alt="Decorative sunburst" 
        className="absolute -rotate-6"
        style={{ inset: '20% auto auto 88%' }}
        width={70}
        height={70}
        priority 
      />
      <Image 
        src="/images/decoration.png" 
        alt="Decorative sunburst" 
        className="absolute rotate-12"
        style={{ inset: '20% auto auto 8%' }}
        width={70}
        height={70}
        priority 
      />
      <Image 
        src="/images/decoration.png" 
        alt="Decorative sunburst" 
        className="absolute rotate-45 z-30"
        style={{ inset: '75% 60% auto auto' }}
        width={70}
        height={70}
        priority 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10" >
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-2 md:gap-8">
          
          {/* Left: Text Content */}
          <div className="text-center lg:text-left space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-acme tracking-tight">
              About Us
            </h1>
            <p className="lg:max-w-md text-base sm:text-lg lg:text-xl font-inter font-medium leading-relaxed opacity-90 whitespace-pre-line">
              HEAL is an AI-powered mental health support platform
              providing confidential, culturally-sensitive care for survivors
              of SGBV — anytime, anywhere.
            </p>
          </div>

          {/* Right: Cutout Image Positioned at the bottom */}
          <div className="relative h-full flex justify-center lg:justify-end items-end">
            <div className="relative w-full max-w-[350px] rounded-[100px] mx-auto]">
              <Image
                src="/images/about-hero-women.png"
                alt="Supportive embrace"
                width={400}
                height={400}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* The Wavy Bottom Edge using SVG */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-20">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[200px]"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#DCE7E1" />
              <stop offset="100%" stopColor="#016A79" />
            </linearGradient>
          </defs>
          <path 
            d="M0,120V60.29C400,20,800,100,1200,60.29V120H0Z" 
            fill="url(#waveGradient)"
          />
        </svg>
      </div>
    </section>
      
      {/* Our History Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-acme">
              Our History
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#056173] to-[#81A9AD] mx-auto"></div>
          </div>
          
          <div className="flex justify-center mb-12">
            <div className="w-full max-w-6xl">
              <Image
                src="/images/about-our-history.png"
                alt="Our History - KIEP Skies Project Closure Event"
                width={1000}
                height={800}
                className="w-full h-auto rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Success Numbers Section */}
      <section className="py-12 sm:py-20 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/images/Success-Numbers-Background.png')"}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-acme" style={{color: '#044750'}}>
              Our Success Numbers
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Cases Reported */}
            <div className="text-center">
              <div className="mb-4">
                <svg className="w-12 h-12 mx-auto" fill="#044750" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
              </div>
              <h3 className="text-4xl font-bold mb-2" style={{color: '#044750'}}>500.00</h3>
              <p style={{color: '#044750'}}>Cases Reported Yearly</p>
            </div>

            {/* Average Service Review */}
            <div className="text-center">
              <div className="mb-4">
                <div className="flex justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6" fill="#044750" viewBox="0 0 24 24">
                      <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                    </svg>
                  ))}
                </div>
              </div>
              <h3 className="text-4xl font-bold mb-2" style={{color: '#044750'}}>+1,000</h3>
              <p style={{color: '#044750'}}>Average Service review.</p>
              <p className="text-sm" style={{color: '#044750'}}>4,5 stars</p>
            </div>

            {/* Number of People Touched */}
            <div className="text-center">
              <div className="mb-4">
                <svg className="w-12 h-12 mx-auto" fill="#044750" viewBox="0 0 24 24">
                  <path d="M16,4C18.21,4 20,5.79 20,8C20,10.21 18.21,12 16,12C13.79,12 12,10.21 12,8C12,5.79 13.79,4 16,4M16,14C18.67,14 24,15.33 24,18V20H8V18C8,15.33 13.33,14 16,14M8,4C10.21,4 12,5.79 12,8C12,10.21 10.21,12 8,12C5.79,12 4,10.21 4,8C4,5.79 5.79,4 8,4M8,14C10.67,14 16,15.33 16,18V20H0V18C0,15.33 5.33,14 8,14Z" />
                </svg>
              </div>
              <h3 className="text-4xl font-bold mb-2" style={{color: '#044750'}}>+20,000</h3>
              <p style={{color: '#044750'}}>Number of people</p>
              <p style={{color: '#044750'}}>touched</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision and Mission Section */}
      <section className="py-12 sm:py-20 bg-[#FEF5E3] relative overflow-hidden">
        {/* Decorative sparkles */}
        <div className="absolute top-10 left-20 text-yellow-400 text-2xl">✨</div>
        <div className="absolute top-32 right-32 text-yellow-400 text-lg">✦</div>
        <div className="absolute bottom-20 left-40 text-yellow-400 text-xl">✨</div>
        <div className="absolute bottom-40 right-20 text-yellow-400 text-sm">✦</div>
        <div className="absolute top-1/2 left-1/2 text-yellow-400 text-lg">✨</div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Vision - Left aligned */}
            <div className="text-left">
              <div className="mb-8">
                <div className="w-16 h-1 bg-[#044750] mb-4"></div>
                <h3 className="text-sm font-medium text-[#044750] mb-2 font-acme">Our</h3>
                <h2 className="text-4xl font-bold text-[#044750] font-acme mb-6">Vision</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg italic font-acme">
                "A world where every SGBV survivor has immediate, confidential, and culturally-sensitive access to healing and empowerment - anytime, anywhere, without barriers."
              </p>
            </div>

            {/* Mission - Right aligned and lower */}
            <div className="text-right mt-20">
              <div className="mb-8">
                <h3 className="text-sm font-medium text-[#044750] mb-2 font-acme">Our</h3>
                <h2 className="text-4xl font-bold text-[#044750] font-acme mb-6">Mission</h2>
                <div className="w-16 h-1 bg-[#044750] ml-auto mb-4"></div>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg italic font-acme">
                "To make mental health support radically accessible to SGBV survivors through AI-powered technology -bridging gaps in mental-health care with reliable, survivor-centered support that enhances well-being, restores dignity, and fosters survivors' reintegration into the community."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Theory of Change Section */}
      <section className="py-12 sm:py-20 bg-[#2C4A4E] relative overflow-hidden">
        {/* Decorative sparkles */}
        <div className="absolute top-10 left-10 text-yellow-400 text-lg">✨</div>
        <div className="absolute top-20 right-20 text-yellow-400 text-sm">✦</div>
        <div className="absolute bottom-20 left-20 text-yellow-400 text-lg">✨</div>
        <div className="absolute bottom-10 right-40 text-yellow-400 text-sm">✦</div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white font-acme">Our Theory of Change</h2>
          </div>
          
          {/* Theory boxes layout */}
          <div className="relative min-h-[600px]">
            {/* Top Left - Radical Access */}
            <div className="absolute top-0 left-0 w-72 bg-[#F5F5DC] p-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#E8F5E8] hover:shadow-2xl cursor-pointer group">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#4A9B8E] rounded-full flex items-center justify-center mr-3 group-hover:bg-[#2C4A4E] transition-colors duration-300">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3"/>
                    <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="font-bold text-[#2C4A4E] font-acme text-sm group-hover:text-[#4A9B8E] transition-colors duration-300">Radical Access to Mental Health</h3>
              </div>
              <p className="text-xs text-[#2C4A4E] leading-relaxed font-acme group-hover:text-gray-700 transition-colors duration-300">
                When survivors are provided with instant, confidential, and culturally-sensitive digital mental health support (AI-powered chat + USSD for low-connectivity areas), they will seek help earlier, begin healing immediately, and reclaim their voice without fear of stigma or judgment. This ultimately breaks them free from the triple threat of unwanted pregnancies, new HIV infections, continued cycles of GBV, and deaths linked to untreated trauma.
              </p>
            </div>

            {/* Connecting line from top left to center */}
            <div className="absolute top-48 left-72 w-40 h-0.5 bg-[#4A9B8E]"></div>
            <div className="absolute top-48 left-[440px] w-0.5 h-24 bg-[#4A9B8E]"></div>

            {/* Top Right - Strong Referral */}
            <div className="absolute top-0 right-0 w-72 bg-[#F5F5DC] p-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#E8F5E8] hover:shadow-2xl cursor-pointer group">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#4A9B8E] rounded-full flex items-center justify-center mr-3 group-hover:bg-[#2C4A4E] transition-colors duration-300">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <h3 className="font-bold text-[#2C4A4E] font-acme text-sm group-hover:text-[#4A9B8E] transition-colors duration-300">Strong Referral Pathways</h3>
              </div>
              <p className="text-xs text-[#2C4A4E] leading-relaxed font-acme group-hover:text-gray-700 transition-colors duration-300">
                If survivors are seamlessly connected through HEAL to trusted medical, legal, and community-based services, then they will access comprehensive care, pursue justice, and be protected from further harm — breaking cycles of silence and impunity.
              </p>
            </div>

            {/* Connecting line from top right to center */}
            <div className="absolute top-48 right-72 w-40 h-0.5 bg-[#4A9B8E]"></div>
            <div className="absolute top-48 right-[440px] w-0.5 h-24 bg-[#4A9B8E]"></div>

            {/* Bottom Right - Survivor-Centered */}
            <div className="absolute bottom-0 right-0 w-72 bg-[#F5F5DC] p-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#E8F5E8] hover:shadow-2xl cursor-pointer group">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#4A9B8E] rounded-full flex items-center justify-center mr-3 group-hover:bg-[#2C4A4E] transition-colors duration-300">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9M15 11.5C15.8 12.3 16 13.4 16 14.5V22H14V16H10V22H8V14.5C8 13.4 8.2 12.3 9 11.5L12 8.5L15 11.5Z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-[#2C4A4E] font-acme text-sm group-hover:text-[#4A9B8E] transition-colors duration-300">Survivor-Centered Systems Change</h3>
              </div>
              <p className="text-xs text-[#2C4A4E] leading-relaxed font-acme group-hover:text-gray-700 transition-colors duration-300">
                If survivors are seamlessly connected through HEAL to trusted medical, legal, and community-based services with case management using community systems like CHVs for robust survivor tracking and tracing, then they will access comprehensive care, pursue justice, and be protected from further harm — breaking cycles of silence and impunity.
              </p>
            </div>

            {/* Connecting line from bottom right to center */}
            <div className="absolute bottom-48 right-72 w-40 h-0.5 bg-[#4A9B8E]"></div>
            <div className="absolute bottom-48 right-[440px] w-0.5 h-24 bg-[#4A9B8E]"></div>

            {/* Center - Main Theory */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-[#2C4A4E] border-2 border-[#4A9B8E] p-6 rounded-lg shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#1A3A3E] hover:border-[#6BB6AB] hover:shadow-2xl cursor-pointer group">
              <p className="text-white leading-relaxed text-center font-acme text-sm group-hover:text-[#E8F5E8] transition-colors duration-300">
                When GBV survivors are provided with immediate, confidential, and culturally-sensitive access to mental health support coupled with strong and effective referral pathways - anytime, anywhere, without barriers, they reclaim their dignity and agency by reporting, healing and speaking against GBV, creating community resilience and awareness. At scale this generates survivor-driven data that powers evidence-based advocacy and policy reform in Kenya and across the continent, positioning Africa as a leader in bold, inclusive mental health and gender justice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section className="py-12 sm:py-20 bg-[#FEF5E3] relative overflow-hidden">
        {/* Decorative sparkles */}
        <div className="absolute top-10 right-20 text-yellow-400 text-lg">✨</div>
        <div className="absolute bottom-20 left-20 text-yellow-400 text-sm">✦</div>
        <div className="absolute top-1/2 right-40 text-yellow-400 text-xl">✨</div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="mb-16">
            <div className="w-16 h-1 bg-[#044750] mb-4"></div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#044750] font-acme">What makes us</h2>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#044750] font-acme">Different</h2>
          </div>
          
          {/* Three cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Radical Accessibility */}
            <div className="bg-[#B8D4A8] p-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-[#A5C896] cursor-pointer group min-h-[280px] flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#2C4A4E] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#2C4A4E] font-acme text-lg">Radical Accessibility</h3>
              </div>
              <p className="text-sm text-[#2C4A4E] leading-relaxed font-acme flex-1">
                HEAL provides 24/7 confidential support anytime, anywhere—through AI chat or low-connectivity areas. Survivors don't have to wait for office hours, travel long distances, or risk exposure; they can access help the exact moment they need it.
              </p>
            </div>

            {/* Survivor-Centered & Survivor-Built */}
            <div className="bg-[#B8D4A8] p-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-[#A5C896] cursor-pointer group min-h-[280px] flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#2C4A4E] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16,4C18.21,4 20,5.79 20,8C20,10.21 18.21,12 16,12C13.79,12 12,10.21 12,8C12,5.79 13.79,4 16,4M16,14C18.67,14 24,15.33 24,18V20H8V18C8,15.33 13.33,14 16,14M8,4C10.21,4 12,5.79 12,8C12,10.21 10.21,12 8,12C5.79,12 4,10.21 4,8C4,5.79 5.79,4 8,4M8,14C10.67,14 16,15.33 16,18V20H0V18C0,15.33 5.33,14 8,14Z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#2C4A4E] font-acme text-lg">Survivor-Centered & Survivor-Built</h3>
              </div>
              <p className="text-sm text-[#2C4A4E] leading-relaxed font-acme flex-1">
                Unlike many top-down initiatives, HEAL is designed with survivors, for survivors. Every feature—from the AI companion to referral pathways—is informed by lived experiences, ensuring dignity, empathy, and relevance, making HEAL a trusted safe space, not just another app.
              </p>
            </div>

            {/* Trust & Integrity Through Innovation */}
            <div className="bg-[#B8D4A8] p-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-[#A5C896] cursor-pointer group min-h-[280px] flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#2C4A4E] rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#2C4A4E] font-acme text-lg">Trust & Integrity Through Innovation</h3>
              </div>
              <p className="text-sm text-[#2C4A4E] leading-relaxed font-acme flex-1">
                HEAL integrates a blockchain-powered case management system that guarantees tamper-proof records for CHVs, medical officers, and legal actors. This builds accountability, creates evidence for justice, and restores trust in systems that often fail survivors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join the HEAL's team Section */}
      <section className="py-12 sm:py-16 bg-[#2C4A4E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-acme mb-4">
            Join the HEAL's team!
          </h2>
          <p className="text-white/90 mb-8 font-acme">
            Do you want to be part of Heal's team? click "join team"
          </p>
          <button className="bg-white text-[#2C4A4E] font-bold py-3 px-8 rounded-lg hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition-all duration-300 font-acme transform active:scale-95">
            Join Team
          </button>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 sm:py-20 bg-[#FEF5E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#044750] font-acme mb-4">
              Gallery
            </h2>
          </div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              'image1.jpg', 'Image1.JPG', 'Image2.jpeg', 'image3.jpg', 'Image3.jpg', 'image3(1).jpg',
              'Image4.jpg', 'Image5.jpg', 'image6.jpg', 'Image6.jpg', 'Image7.jpg', 'image1.jpg',
              'image9.jpg', 'image11.jpg', 'Image5.jpg', 'Image13.png'
            ].map((imageName, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
                <img
                  src={`/images/${imageName}`}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/image1.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}