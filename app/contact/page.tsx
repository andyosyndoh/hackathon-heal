import { Contact } from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { GetInTouch } from "@/components/GetInTouch";
import Navbar from "@/components/Navbar";

export default function ContactUs() {
  return (
    <>
      <Navbar></Navbar>
      <GetInTouch></GetInTouch>
      <Contact></Contact>
      <Footer></Footer>
    </>
  );
}
