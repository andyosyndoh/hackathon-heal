'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function ServicesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FEF5E3] flex flex-col">
     <Navbar />

      {/* Main Content */}
      <main className="flex-1 bg-[#fef0d3] mx-4 relative overflow-hidden">
        <div className="relative w-full">
          {/* Decorative sparkles */}
          <img
            className="absolute top-0 right-[270px] w-[200px] h-[200px] hidden lg:block"
            alt="Decorative sparkle"
            src="/sparkj2-svg.svg"
          />
          <img
            className="absolute top-[671px] right-[470px] w-[200px] h-[200px] hidden lg:block"
            alt="Decorative sparkle"
            src="/sparkj2-svg-2.svg"
          />
          <img
            className="absolute top-[476px] left-[162px] w-[200px] h-[200px] hidden lg:block"
            alt="Decorative sparkle"
            src="/sparkj2-svg-11.svg"
          />

          {/* Combined Header and Hero Section */}
          <section className="w-full min-h-screen items-center justify-center relative py-12 px-8">
            <div className="max-w-[1728px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-12">
              {/* Left side - Header Content */}
              <div className="w-full lg:w-1/2 max-w-[600px]">
                <div className="font-acme text-[#012f35] text-xl tracking-[0] leading-[normal] mb-[32px]">
                  WELCOME TO HEAL
                </div>

                <h1 className="font-acme text-[#40707b] text-4xl lg:text-[73px] tracking-[0] leading-tight lg:leading-[87.6px] mb-[60px]">
                  Your Listening, Caring Partner
                  <br />
                  Anywhere, Anytime
                </h1>

                <p className="max-w-[381px] font-acme text-[#221f1f] text-base tracking-[0] leading-[27px] mb-[68px]">
                  &quot;You don't have to go through it alone. With HEAL, your voice
                  matters, you are safe and heard, and you deserve quality support,
                  care, and justice. Every step you take, HEAL is with you—always and
                  everywhere.&quot;
                </p>

                <div className="flex flex-col sm:flex-row gap-[34px] mb-[50px]">
                  <Link
                    href="/auth/signup"
                    className="w-full sm:w-[186px] h-[78px] bg-[#40707b] hover:bg-[#40707b]/90 rounded-[20px] font-acme text-white text-xl tracking-[0] leading-[normal] flex items-center justify-center transition-all"
                  >
                    Get Started
                  </Link>

                  <Link
                    href="#contact"
                    className="w-full sm:w-[190px] h-[82px] rounded-[20px] border-2 border-[#40707b] text-[#40707b] hover:bg-[#40707b]/10 font-acme text-xl tracking-[0] leading-[normal] flex items-center justify-center transition-all"
                  >
                    Contact Us
                  </Link>
                </div>

                <div className="flex flex-col sm:flex-row gap-[60px]">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-start gap-[7px]">
                      <div className="font-acme text-[#2a4045] text-[64px] tracking-[0] leading-[75px] whitespace-nowrap">
                        800
                      </div>
                      <div className="font-acme text-[#ecf4f3] text-2xl tracking-[0] leading-[normal] whitespace-nowrap">
                        +
                      </div>
                    </div>
                    <div className="font-acme text-[#221f1f] text-base tracking-[0] leading-[normal] max-w-[163px]">
                      Positive Reviews
                    </div>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-start gap-[7px]">
                      <div className="font-acme text-[#2a4045] text-[64px] tracking-[0] leading-[75px] whitespace-nowrap">
                        550
                      </div>
                      <div className="font-acme text-[#ecf4f3] text-2xl tracking-[0] leading-[normal] whitespace-nowrap">
                        +
                      </div>
                    </div>
                    <div className="font-acme text-[#221f1f] text-base tracking-[0] leading-[normal] max-w-[163px]">
                      Community Health Volunteers
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Hero Image and Info Cards */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative">
                  <Image
                    className="w-full max-w-[568px] h-auto object-cover"
                    alt="Cheerful african american male student using laptop"
                    src="/cheerful-african-american-male-student-using-lapto-47wvynj-1-800.png"
                    width={568}
                    height={821}
                  />

                  {/* Cards Container - positioned absolutely at the bottom */}
                  <div className="absolute bottom-0 left-0 right-0 w-full px-4 lg:px-0">
                    <div className="relative w-full max-w-[650px] mx-auto">
                      {/* First Card */}
                      <div className="absolute bottom-0 left-0 w-full max-w-[378px] h-[174px] hidden lg:block">
                        <div className="relative w-full h-full">
                          <div className="absolute top-0 left-0 w-full h-full bg-[#40707b]" />
                          <div className="absolute top-7 left-5 w-[60px] h-[60px] bg-white rounded-[30px] flex items-center justify-center">
                            <Image
                              className="w-[40px] h-[28px]"
                              alt="Vector icon"
                              src="/vector-2.svg"
                              width={40}
                              height={28}
                            />
                          </div>
                          <div className="absolute top-[46px] left-[91px] font-acme text-white text-xl tracking-[0] leading-[normal] whitespace-nowrap">
                            Strong Referral Pathways
                          </div>
                          <div className="absolute top-[76px] left-[91px] w-52 font-acme text-white text-xl tracking-[0] leading-[26.2px]">
                            Improve access to comprehensive care
                          </div>
                        </div>
                      </div>

                      {/* Second Card */}
                      <div className="absolute bottom-0 right-0 w-full max-w-[322px] h-[273px] hidden lg:block">
                        <div className="relative w-full h-full">
                          <div className="absolute top-0 left-0 w-full h-full bg-[#2a3c45]" />
                          <div className="absolute top-[23px] left-[17px] w-[60px] h-[60px] bg-white rounded-[30px] flex items-center justify-center">
                            <Image
                              className="w-[29px] h-[36px]"
                              alt="Vector icon"
                              src="/vector-5.svg"
                              width={29}
                              height={36}
                            />
                          </div>
                          <div className="absolute top-[41px] left-[88px] font-acme text-white text-xl tracking-[0] leading-[normal] whitespace-nowrap">
                            Anonymous Report
                          </div>
                          <div className="absolute top-[71px] left-[88px] w-52 font-acme text-white text-xl tracking-[0] leading-[26.2px]">
                            Lorem ipsum dolor sit amet, consectetur.
                          </div>
                          <Image
                            className="absolute top-[148px] left-[17px] w-[60px] h-[60px]"
                            alt="Icon"
                            src="/icon-10.png"
                            width={60}
                            height={60}
                          />
                          <div className="absolute top-[166px] left-[88px] font-acme text-white text-xl tracking-[0] leading-[normal]">
                            24/7 AI Therapist
                          </div>
                          <div className="absolute top-[196px] left-[88px] w-52 font-acme text-white text-xl tracking-[0] leading-[26.2px]">
                            Removing mental access barriers
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Partners Section */}
          <section className="relative w-full mt-[112px] bg-[#2a4045] backdrop-blur-[2.0px] backdrop-brightness-[110%] [-webkit-backdrop-filter:blur(2.0px)_brightness(110%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] py-[140px]">
            <div className="flex flex-col items-center gap-[110px] px-4">
              <div className="font-acme text-white text-[40px] tracking-[0] leading-[normal] text-center">
                Trusted by 50+ Partners Worldwide
              </div>
              <div className="flex flex-wrap items-center justify-center gap-[60px] lg:gap-[141px]">
                {[
                  { src: '/client-9-1536x768.png', alt: 'Client 9' },
                  { src: '/client-4-1536x768.png', alt: 'Client 4' },
                  { src: '/client-2-1536x768.png', alt: 'Client 2' },
                  { src: '/client-5-1536x768.png', alt: 'Client 5' },
                  { src: '/client-6-1536x768.png', alt: 'Client 6' },
                ].map((logo, index) => (
                  <Image
                    key={`partner-${index}`}
                    className="w-[159px] h-[79px] object-cover"
                    alt={logo.alt}
                    src={logo.src}
                    width={159}
                    height={79}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="relative w-full flex justify-center pt-[200px] lg:pt-[448px]">
            <div className="relative w-full max-w-[1440px] px-4 lg:px-[128px]">
              <div className="flex flex-col items-center gap-[100px] lg:gap-[215px]">
                <div className="w-full max-w-[1148px] font-acme text-[#2a4045] text-3xl lg:text-[58px] text-center tracking-[0] leading-tight lg:leading-[70px]">
                  Discover Safe, Confidential, and Empowering Support with HEAL
                </div>

                {/* Service Cards */}
                <div className="w-full flex flex-col items-center gap-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                    {[
                      {
                        icon: '/icon-1.png',
                        title: 'Psychoeducation',
                        description: 'Learn about trauma, healing, and resilience through expert-led resources.',
                      },
                      {
                        icon: '/icon-3.png',
                        title: 'Mental Health',
                        description: 'Access trauma-informed therapists and peer mentors who walk with you step by step.',
                      },
                      {
                        icon: '/icon-2.png',
                        title: 'Peer Mentorship',
                        description: 'Connect with survivors who understand your journey and offer guidance.',
                      },
                      {
                        icon: '/icon-4.png',
                        title: 'Holistic Journeys',
                        description: 'Explore wellness practices that nurture mind, body, and spirit.',
                      },
                    ].map((card, index) => (
                      <div key={index} className="bg-[#012f35] border-none rounded-lg">
                        <div className="flex flex-col items-start p-6 gap-5">
                          <Image
                            className="w-[60px] h-[60px]"
                            alt={`${card.title} icon`}
                            src={card.icon}
                            width={60}
                            height={60}
                          />
                          <h3 className="font-acme text-[#fef0d3] text-[32px] tracking-[0] leading-[normal]">
                            {card.title}
                          </h3>
                          <p className="font-acme text-[#c5e6ea] text-xl tracking-[0] leading-[26.2px]">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col items-center gap-4 mt-4">
                    <p className="font-acme text-[#fef0d3] text-2xl tracking-[0] leading-[normal]">
                      From Survivors, We Worked
                    </p>
                    <Link
                      href="/auth/signup"
                      className="bg-[#fef0d3] text-[#012f35] hover:bg-[#fef0d3]/90 font-acme text-lg px-8 py-6 h-auto rounded-lg transition-all"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>

                {/* Additional Features */}
                <div className="w-full flex flex-col lg:flex-row gap-[50px] lg:gap-[102px]">
                  <div className="flex flex-col gap-[60px] lg:gap-[140px]">
                    {[
                      { icon: '/icon-2.png', label: '24/7 Digital Support' },
                      { icon: '/icon-1.png', label: 'Mental Health' },
                      { icon: '/icon-1.png', label: 'Care & Protection' },
                      { icon: '/icon-1.png', label: 'Survivor Communities' },
                    ].map((item, index) => (
                      <div key={index} className="w-full lg:w-[476px] h-[130px] bg-[#2a4045] rounded-[20px] flex items-center px-[60px]">
                        <Image
                          className="w-[60px] h-[60px]"
                          alt="Icon"
                          src={item.icon}
                          width={60}
                          height={60}
                        />
                        <div className="ml-[80px] font-acme text-[#fef0d3] text-xl tracking-[0] leading-[normal]">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex-1 flex flex-col items-center lg:items-end">
                    <Image
                      className="w-[60px] h-[60px] mb-4"
                      alt="Icon"
                      src="/icon-8.png"
                      width={60}
                      height={60}
                    />
                    <h3 className="font-acme text-[#fef0d3] text-[32px] tracking-[0] leading-[normal] mb-2">
                      Survivor Communities
                    </h3>
                    <p className="font-acme text-[#c5e6ea] text-xl tracking-[0] leading-[26.2px] max-w-[296px] text-center lg:text-right">
                      Join private, anonymous group spaces to share, heal, and grow with others who understand.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="relative w-full mt-[200px] lg:mt-[448px] bg-[#40707b] overflow-hidden py-[100px] lg:py-[262px] px-4 lg:px-[184px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative max-w-7xl mx-auto">
              <div className="flex flex-col gap-6 z-10">
                <div className="font-acme text-[#fef0d3] text-xl tracking-[0] leading-[normal]">
                  GET STARTED
                </div>

                <h2 className="font-acme text-[#fef0d3] text-4xl lg:text-6xl tracking-[0] leading-tight lg:leading-[70px]">
                  Let&#39;s Start Here! <br />
                  Safe Space for World
                </h2>

                <p className="font-acme text-[#9a9a9a] text-base tracking-[0] leading-[27px] max-w-[656px]">
                  Hope Empowerment Action Love, Anywhere, Anytime : HEALing every
                  afflicted Life without barriers
                </p>

                <div className="flex flex-wrap gap-4 mt-6">
                  <Link
                    href="/auth/signup"
                    className="h-auto px-3.5 py-2.5 bg-[#fef0d3] hover:bg-[#fef0d3]/90 rounded-[20px] text-[#016a79] font-acme text-xl transition-all"
                  >
                    Get Started
                  </Link>

                  <Link
                    href="#contact"
                    className="h-auto px-3.5 py-2.5 rounded-[20px] border-2 border-white text-white hover:bg-white/10 font-acme text-xl transition-all"
                  >
                    Join our CHVs
                  </Link>
                </div>
              </div>

              <div className="relative flex items-center justify-center lg:justify-end">
                <Image
                  className="w-full max-w-[651px] h-auto object-cover"
                  alt="Happy black man"
                  src="/happy-black-man-pointing-at-digital-tablet-screen-ywd94ad-1-800x.png"
                  width={651}
                  height={800}
                />
              </div>
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="flex flex-col w-full items-start justify-center px-4 lg:px-[25px] py-[73px] rounded-[10px] mt-[100px] bg-[#fef0d3]">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-6xl mx-auto">
              <div className="flex flex-col w-full lg:w-[454px] items-start px-[15px] py-0">
                <div className="flex flex-col items-start gap-[4.5px] pt-0 pb-[0.5px] px-0 w-full">
                  <h2 className="font-acme text-[#2a4045] text-2xl lg:text-[34.9px] tracking-[-0.88px] leading-[42px]">
                    Sign up for our newsletter!
                  </h2>

                  <p className="font-acme text-[#6b7c93] text-lg tracking-[0] leading-7 mt-2">
                    Get notified about updates, join us in building a world where
                    mental health care is accessible without barriers.
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-[600px]">
                <form className="w-full max-w-[515px] flex flex-col items-start gap-3.5">
                  <div className="gap-1.5 px-0 py-[3px] w-full flex flex-col items-start">
                    <input
                      type="text"
                      placeholder="Enter Your First Name"
                      className="w-full h-auto pl-[21px] pr-4 py-[16.5px] bg-white rounded-[25px] border border-solid border-[#ecf2f7] font-acme text-[#7a7a7a]"
                    />
                    <input
                      type="text"
                      placeholder="Enter Your Last Name"
                      className="w-full h-auto pl-[21px] pr-4 py-[16.5px] bg-white rounded-[25px] border border-solid border-[#ecf2f7] font-acme text-[#7a7a7a]"
                    />
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      className="w-full h-auto pl-[21px] pr-4 py-[16.5px] bg-white rounded-[25px] border border-solid border-[#ecf2f7] font-acme text-[#6b7c93]"
                    />
                  </div>

                  <div className="flex flex-col items-end gap-2.5 w-full">
                    <button
                      type="submit"
                      className="h-auto w-full lg:w-[153.41px] px-[39.55px] py-[11px] bg-[#1a1a1a] rounded-[25px] font-acme text-white text-[13px] text-center tracking-[0] leading-7 whitespace-nowrap hover:bg-[#1a1a1a]/90 transition-all"
                    >
                      SUBSCRIBE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

