'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FEF5E3]">
      <Navbar />
      
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
    </div>
  );
}