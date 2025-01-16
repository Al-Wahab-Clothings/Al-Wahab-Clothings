"use client";
import {
  BsYoutube,
  BsLinkedin,
  BsFacebook,
  BsInstagram,
  BsWhatsapp
} from "react-icons/bs";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import payment from "@/images/payment.png";

const Footer = () => {
  return (
    <div className="w-full bg-darkText text-slate-100">
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 justify-items-center">
        <div className="flex flex-col justify-center gap-8 sm:flex-col col-span-2 gap-y-4">
          <div className="flex gap-4">
            <Image
              src="/logo.png"
              alt="logo"
              width={75}
              height={75}
              className="-my-6 cursor-pointer hover:animate-slowspin"
            />
            <h3 className="font-logo text-4xl text-[#D6CFB4] hover:text-orange-600 cursor-pointer duration-200">
              Al Wahab
            </h3>
          </div>
          <p className="hidden sm:block">
            Al Wahab Clothing is an online fashion store specializing in trendy and affordable apparel. The website offers a seamless shopping experience with its sleek design and easy navigation. It caters to diverse styles, ensuring quality and customer satisfaction.
          </p>
          <div className="flex items-center gap-x-4">
            <Link href="https://wa.me/923242886759" target="_blank">
              <span className="socialLink">
                <BsWhatsapp />
              </span>
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=61571705360963&mibextid=ZbWKwL" target="_blank">
              <span className="socialLink">
                <BsFacebook />
              </span>
            </Link>
            <Link href="https://www.instagram.com/wahab_clothings/" target="_blank">
              <span className="socialLink">
                <BsInstagram />
              </span>
            </Link>
          </div>
        </div>
        <div>
          <p className="text-xl font-bold text-[#D6CFB4] underline mb-4">Projects</p>
          <ul className="text-sm font-light mt-2 flex flex-col gap-y-2">
            <Link href="https://ridanaz-portfolio.vercel.app/" target="_blank">
              <li className="flex flex-col">
                <span className="text-lg font-semibold text-slate hover:text-[#D6CFB4] cursor-pointer duration-200">
                  Portfolio Website
                </span>
                <span className="text-[#D6CFB4]">February 25, 2024</span>
              </li>
            </Link>
            <Link href="https://rida-portfolio-2.vercel.app/" target="_blank">
              <li className="flex flex-col">
                <span className="text-lg font-semibold text-slate hover:text-[#D6CFB4] cursor-pointer duration-200">
                  Portfolio Website
                </span>
                <span className="text-[#D6CFB4]">April 7, 2024</span>
              </li>
            </Link>
            <Link href="https://its-naz-gallery.vercel.app/" target="_blank">
              <li className="flex flex-col">
                <span className="text-lg font-semibold text-slate hover:text-[#D6CFB4] cursor-pointer duration-200">
                  Gallery Website
                </span>
                <span className="text-[#D6CFB4]">April 28, 2024</span>
              </li>
            </Link>
          </ul>
        </div>
        <div className="items-center">
          <p className="text-2xl font-bold underline mb-4 text-[#D6CFB4]">Pay</p>
          <p className="text-lg mb-2">with your trusted services</p>
          <Image
            src={payment}
            alt="payment banner image"
            width={400}
            height={400}
            className="w-full h-10 object-cover"
          />
        </div>
      </Container>
      <div className="flex justify-center gap-10 -mt-[1.4rem] pb-1 w-[80%] mx-auto text-[#D6CFB4] opacity-70">
        &#169; Al-Wahab 2025 Inc. all rights reserved
      </div>
    </div>
  );
};

export default Footer;