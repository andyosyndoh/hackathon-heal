'use client';

import React from 'react';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const quickLinks = [
  { label: 'About Heal', href: '/#about' },
  { label: 'We Listen – Safe Space', href: '/anonymous' },
  { label: 'Chat Anonymously – Chat Space', href: '/anonymous' },
  { label: 'Report - Seek Help', href: '/report' },
  { label: 'Get In Touch', href: '/#contact' },
];

const contactEmails = [
  'contactheal.org@gmail.com',
  'producer@healprojectmanger.com',
  'partnership@heal communications.com',
  'media@healmedia.com',
];

const socialIcons = [
  { Icon: FacebookIcon, label: 'Facebook', href: '#' },
  { Icon: TwitterIcon, label: 'Twitter', href: '#' },
  { Icon: InstagramIcon, label: 'Instagram', href: '#' },
  { Icon: LinkedinIcon, label: 'LinkedIn', href: '#' },
  { Icon: YoutubeIcon, label: 'YouTube', href: '#' },
];

export const Footer = (): JSX.Element => {
  return (
    <footer className="flex flex-col items-center w-full bg-[#2a4045]">
      {/* Main Footer Content */}
      <div className="w-full max-w-[1140px] px-6 lg:px-8 pt-[65px] pb-[15px]">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-0 justify-between">
          {/* Logo and Tagline */}
          <div className="w-full lg:w-[302px] flex flex-col items-start">
            <div className="flex flex-col items-start pb-5 w-full">
              <div className="w-full h-[95px] flex items-center justify-start">
                {/* Logo placeholder - you can add your logo here */}
              </div>
            </div>

            <div className="flex flex-col items-start w-full">
              <p className="font-acme text-[#b0b8b8] text-sm text-center lg:text-left leading-7">
                Navigating Mental Health Care with your Listening, Caring Partner
                <br /> Anytime, Anywhere
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="w-full lg:w-[268px] flex flex-col items-start">
            <div className="flex flex-col items-start pb-5 w-full">
              <h3 className="font-acme text-white text-[17px] tracking-[0] leading-7 whitespace-nowrap">
                QUICK LINKS
              </h3>
            </div>

            <ul className="flex flex-col items-start pt-1 pb-3.5 w-full space-y-1">
              {quickLinks.map((link, index) => (
                <li key={index} className="flex flex-col items-start w-full">
                  <a
                    href={link.href}
                    className="font-acme text-[#9ca3a3] text-sm tracking-[0] leading-7 whitespace-nowrap hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get In Touch */}
          <div className="w-full lg:w-[285px] flex flex-col items-start">
            <div className="flex flex-col items-start pb-5 w-full">
              <h3 className="font-acme text-white text-lg tracking-[0] leading-7 whitespace-nowrap">
                GET IN TOUCH
              </h3>
            </div>

            <address className="flex flex-col items-start w-full not-italic">
              <div className="flex flex-col items-start w-full">
                <div className="font-acme text-[#b0b8b8] text-sm tracking-[0] leading-7">
                  {contactEmails.map((email, index) => (
                    <React.Fragment key={index}>
                      {email}
                      {index < contactEmails.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </address>
          </div>

          {/* Subscribe & Follow */}
          <div className="w-full lg:w-[285px] flex flex-col items-start">
            <div className="flex flex-col items-start pb-5 w-full">
              <h3 className="font-acme text-white text-[17px] tracking-[0] leading-7 whitespace-nowrap">
                SUBSCRIBE &amp; FOLLOW US
              </h3>
            </div>

            <div className="flex flex-col gap-4 w-full">
              <div className="flex gap-2 w-full">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent border-[#b0b8b8] text-white placeholder:text-[#b0b8b8] font-acme"
                />
                <Button className="bg-white text-[#2a4045] hover:bg-[#b0b8b8] h-auto font-acme">
                  Subscribe
                </Button>
              </div>

              <div className="flex gap-3 items-center">
                {socialIcons.map(({ Icon, label, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    aria-label={label}
                    className="text-white hover:text-[#b0b8b8] transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full max-w-[1140px] px-6 lg:px-8">
        <div className="border-t border-[#c9d0d8] my-2.5" />
      </div>

      {/* Copyright */}
      <div className="w-full max-w-[1140px] px-6 lg:px-8 pb-[30px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center py-2.5">
            <p className="font-acme text-[#6b7280] text-base tracking-[0] leading-7 whitespace-nowrap">
              Copyright © 2025 Heal.org – All Rights Reserved.
            </p>
          </div>

          <div className="flex items-center py-2.5">
            <p className="font-acme text-[#6b7280] text-base tracking-[0] leading-7 whitespace-nowrap">
              Powered by Heal.Org
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

