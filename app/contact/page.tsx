import { Contact } from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { GetInTouch } from "@/components/GetInTouch";
import MapSection from "@/components/MapSection";
import Navbar from "@/components/Navbar";

export default function ContactUs() {
  return (
    <>
      <Navbar></Navbar>
      <GetInTouch></GetInTouch>
      <Contact></Contact>
      <MapSection></MapSection>
      <Footer></Footer>
    </>
  );
}
