import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import star from "../../public/assets/images/star2.svg";
import { GiTireIronCross } from "react-icons/gi";
import { LINKEDIN_URL, INSTAGRAM_URL, X_URL } from "../lib/socialLinks";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with the Swahilies team — contact@swahilies.com or +255 682 411 725.",
};

function Contact() {
  return (
    <section className="bg-white text-[#3a57b5]">
      <div className="mx-auto max-w-300 px-6 h-[80vh] max-[900px]:h-[68vh]  pt-20 max-[900px]:pt-32 max-[900px]:pb-6 lg:py-24">
        <div className="">
          <div >
            <h1 className="intro-heady text-[clamp(2.4rem,5vw,4.2rem)]  -tracking-[0.07em] font-lighter leading-[0.9]">
              Need support?
              <br />
              Contact us
            </h1>
          </div>

          <div className="mt-6 flex relative items-center gap-0 md:flex">
            <span className="h-px flex-1 bg-[#cfd6ff]" />
            <GiTireIronCross  className="h-4 w-4 rotate-[45deg] text-[#cfd6ff] absolute -bottom-2 left-1/2 -translate-x-0.5 lg:left-1/3 transform lg:-translate-x-1  bg-re-500" />
            <span className="h-px flex-1 bg-[#cfd6ff]" />
          </div>

          <div className="lg:mt-9 mt-10 float-right">
            <h2 className="text-2xl intro-head">
              <a href="mailto:contact@swahilies.com" className="hover:underline">
                contact@swahilies.com
              </a>
            </h2>
            <p className="mt-3 max-w-165 text-sm intro-head leading-relaxed text-[#7a7a7a]">
              Whether it's a quick question or a complex request, we're here to
              support you 24/7 — just drop us a message.
            </p>

            <div className="mt-6 flex items-center gap-2">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Swahilies on LinkedIn"
                className="w-12 h-12 rounded-xs border border-[#3a57b5]/60 flex items-center justify-center text-[1.2rem] hover:bg-[#3a57b5]/10 transition-colors"
              >
                <FaLinkedinIn />
              </a>
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Swahilies on X"
                className="w-12 h-12 rounded-xs border border-[#3a57b5]/60 flex items-center justify-center text-[1.2rem] hover:bg-[#3a57b5]/10 transition-colors"
              >
                <FaXTwitter />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Swahilies on Instagram"
                className="w-12 h-12 rounded-xs border border-[#3a57b5]/60 flex items-center justify-center text-[1.2rem] hover:bg-[#3a57b5]/10 transition-colors"
              >
                <FaInstagram />
              </a>
            </div>

            <p className="mt-3 text-sm intro-head text-[#7a7a7a]">
              Follow us on social media
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
