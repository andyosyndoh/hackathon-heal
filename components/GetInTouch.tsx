import Image from "next/image";
import { Facebook, Twitter, Linkedin, Youtube, Instagram, MessageCircle } from 'lucide-react';

export function GetInTouch() {
  return (
    <section className="relative min-h-[500px] flex items-center justify-center bg-[#222] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/phone-bg.jpeg"
          alt="Hand holding phone with social icons"
          className="object-cover w-full h-full opacity-40"
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <h1 className="text-white font-extrabold font-acme text-[4rem] md:text-[5rem] text-center drop-shadow-lg">
          Get In Touch
        </h1>
        <p className="text-white text-lg text-center mt-2 font-semibold max-w-xl font-acme">
          We love hearing from you, and we take your feedback very seriously.
          <br />
          Email us at{" "}
          <span className="font-bold font-acme">contactheal.org@gmail.com</span>
        </p>
        <div className="mt-8 text-white text-xl font-semibold text-center font-acme">
          Subscribe To Our Socials:
        </div>
        <div className="flex flex-wrap justify-center gap-5 mt-6">
          {/* Social Buttons */}
          {[
            { icon: <Facebook className="w-5 h-5" />, label: "Facebook", url: "#" },
            { icon: <Twitter className="w-5 h-5" />, label: "Twitter", url: "#" },
            { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", url: "#" },
            { icon: <Youtube className="w-5 h-5" />, label: "YouTube", url: "#" },
            { icon: <Instagram className="w-5 h-5" />, label: "Instagram", url: "#" },
            { icon: <MessageCircle className="w-5 h-5" />, label: "WhatsApp", url: "#" },
          ].map(({ icon, label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#444b50] text-white rounded-full p-3 shadow-md hover:bg-[#666] transition-all hover:scale-110"
              aria-label={label}
              title={label}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}