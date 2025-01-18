"use client";
import {
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
            <h3 className="font-logo text-4xl text-[#D6CFB4] hover:text-orange-600 cursor-pointer duration-200">
              Al Wahab
            </h3>
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
        <div className="items-center">
          <p className="text-2xl font-bold underline mb-4 text-[#D6CFB4]">Pay</p>
          <p className="text-lg mb-2">Designed and Developed by <span className="font-logo">Rida Naz</span></p>
          <Image
              src="/Ridalogo.png"
              alt="Rida logo"
              width={75}
              height={75}
              className="-my-6 cursor-pointer hover:animate-slowspin"
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