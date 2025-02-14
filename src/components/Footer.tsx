"use client";
import {
  BsFacebook,
  BsInstagram,
  BsWhatsapp
} from "react-icons/bs";
import { FaGlobe } from "react-icons/fa";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="w-full bg-darkText text-[#D6CFB4]">
      <Container className="grid md:grid-cols-2 gap-10 place-items-center justify-between">
        <div className="flex flex-col justify-center gap-8 gap-y-4">
          <h3 className="font-logo text-4xl hover:text-orange-600 cursor-pointer duration-200">
            Al Wahab Clothings
          </h3>
          <p className="hidden sm:block">
            Al Wahab Clothing is an online fashion store specializing in trendy and affordable apparel. The website offers a seamless shopping experience with its sleek design and easy navigation. It caters to diverse styles, ensuring quality and customer satisfaction.
          </p>
          <p className="font-bold hover:scale-105">Deliver all over Pakistan! (Shipment charges Applicable)</p>
          <div className="flex items-center justify-center sm:justify-start gap-x-4">
            <Link href="https://wa.me/923242886759" target="_blank" aria-label="Contact us on Whatsapp">
              <span className="socialLink">
                <BsWhatsapp />
              </span>
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=61571705360963&mibextid=ZbWKwL" target="_blank" aria-label="Visit Facebook">
              <span className="socialLink">
                <BsFacebook />
              </span>
            </Link>
            <Link href="https://www.instagram.com/wahab_clothings/" target="_blank" aria-label="Visit Instagram">
              <span className="socialLink">
                <BsInstagram />
              </span>
            </Link>
          </div>
        </div>
        <div className="justify-items-center mb-2 text-[#D6CFB4]">
          <p className="text-xl font-bold underline mb-4 ">Developed by :</p>
          <div className="flex gap-4 -ml-1 items-center justify-center">
            <Image
              src="/Ridalogo.png"
              alt="Rida logo"
              width={30}
              height={30}
              className="cursor-pointer hover:animate-slowspin"
            />
            <Link href="https://ridanaz.vercel.app/" aria-label="Visit the Developer Portfolio">
              <h3 className="text-2xl font-logo hover:scale-110">Rida Naz</h3>
            </Link>
          </div>
          <p className="mt-1 font-semibold text-center">Transforming ideas into impactful online solutions!</p>
          <p className="mt-3 hidden sm:block text-center">Looking to bring your business online with a unique and modern website? Let&apos;s collaborate to create something amazing for your brand.</p>

          <div className="sm:flex items-center justify-center gap-4 mt-4 text-[#D6CFB4]">
            <Link
              href="https://wa.me/923136488867"
              target="_blank"
              aria-label="Contact the Developer on Whatsapp"
              className="flex items-center gap-3 text-lg font-semibold hover:text-[#F9F7F1] transition-colors"
            >
              <BsWhatsapp />
              Contact Me
            </Link>
            <span className="hidden sm:block">|</span>
            <Link
              href="https://ridanaz-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the Developer Portfolio"
              className="flex items-center gap-3 text-lg font-semibold hover:text-[#F9F7F1] transition-colors"
            >
              <FaGlobe />
              Visit My Portfolio
            </Link>
          </div>

        </div>
      </Container>
      <div className="flex justify-center gap-10 -mt-[1.4rem] pb-2 mx-auto text-[#D6CFB4] opacity-70 text-xs md:text-sm">
        &#169; Al-Wahab 2025 Inc. all rights reserved
      </div>
    </div>
  );
};

export default Footer;