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
    </div>
  );
}