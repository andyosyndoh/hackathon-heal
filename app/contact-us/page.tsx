import Link from "next/link";
import Image from "next/image";
import { Contact } from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { GetInTouch } from "@/components/GetInTouch";

export default function ContactUs() {
  return (
    <>
      <Header></Header>
      <GetInTouch></GetInTouch>
      <Contact></Contact>
      <Footer></Footer>
    </>
  );
}

export function Header() {
  return (
    <header className="bg-[#FAF3E7] border-b border-gray-200">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          {/* Replace with actual SVG/logo */}
          <div className="flex-shrink-0">
            <Image
              src="images/logo.png"
              width={30}
              height={30}
              alt="HEAL logo"
              className="h-12 w-auto"
            />
          </div>
          <div>
            <span className="font-bold text-xl text-[#23706A] tracking-wide">
              HEAL
            </span>
            <br />
            <span className="text-xs text-[#23706A]">
              You Are Letting Go & Healing
            </span>
          </div>
        </div>
        {/* Navigation Links */}
        <nav className="flex items-center space-x-8">
          <Link href="/" passHref>
            <span className="text-[#23706A] text-sm font-semibold flex items-center">
              <span className="bg-[#FFEECF] rounded-full w-[7px] h-[7px] mr-2">
                &nbsp;
              </span>
              HOME
            </span>
          </Link>
          <Link
            href="/about-heal"
            className="text-[#23706A] text-sm font-semibold"
          >
            ABOUT HEAL
          </Link>
          <Link
            href="/services"
            className="text-[#23706A] text-sm font-semibold"
          >
            SERVICES
          </Link>
          <Link
            href="/resources"
            className="text-[#23706A] text-sm font-semibold"
          >
            RESOURCES
          </Link>
          <Link href="/report" className="text-[#23706A] text-sm font-semibold">
            REPORT
          </Link>
          <Link
            href="/contact-us"
            className="text-[#23706A] text-sm font-semibold"
          >
            CONTACT US
          </Link>
        </nav>
        {/* Donate Button */}
        <Link href="/donate" passHref>
          <button
            className="bg-[#087D89] flex items-center px-6 py-2 rounded-full text-white font-semibold hover:bg-[#06636f] transition"
            type="button"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5 mr-2"
              stroke="currentColor"
            >
              <path
                d="M12 21C12 21 7.5 15.7 5.07 13.29C2.64 10.89 2.64 7.17 5.07 4.77C7.5 2.36 11.24 2.36 13.67 4.77C16.09 7.17 16.09 10.89 13.67 13.29C12 14.97 12 21 12 21Z"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            DONATE
          </button>
        </Link>
      </div>
    </header>
  );
}
