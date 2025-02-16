"use client";
import Slider from "react-slick";
import bannerone from "@/images/bannerone.jpg";
import bannertwo from "@/images/bannertwo.jpg";
import bannerthree from "@/images/bannerthree.jpg";
import { PiCaretLeftLight, PiCaretRightLight } from "react-icons/pi";
import Image from "next/image";
import BannerText from "./BannerText";

const Banner = () => {
  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        className="hidden sm:block md:p-2 p-1 bg-[#D6CFB4] text-darkText hover:text-[#D6CFB4] hover:bg-darkText cursor-pointer duration-200 rounded-full text-2xl flex items-center justify-center z-20 absolute left-2 top-1/2"
        onClick={onClick}
      >
        <PiCaretLeftLight />
      </div>
    );
  };
  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        className="hidden sm:block md:p-2 p-1 bg-[#D6CFB4] text-darkText hover:text-[#D6CFB4] hover:bg-darkText cursor-pointer duration-200 rounded-full text-2xl flex items-center justify-center z-20 absolute right-2 top-1/2"
        onClick={onClick}
      >
        <PiCaretRightLight />
      </div>
    );
  };
  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className="relative">
      <Slider {...settings}>
        <div className="w-full h-full relative">
          <Image
            src={bannerone}
            alt="bannerone"
            className="w-full h-full relative"
            loading="lazy" // Defers offscreen image loading
            decoding="async"
            priority
          />
          <BannerText title="Outware Picks" />
        </div>
        <div className="w-full h-full relative">
          <Image
            src={bannertwo}
            alt="bannertwo"
            className="w-full h-full relative"
            loading="lazy" // Defers offscreen image loading
            decoding="async"
            priority={false} // Removes high load priority
          />
          <BannerText title="Seasonal Offers" />
        </div>
        <div className="w-full h-full relative">
          <Image
            src={bannerthree}
            alt="bannerthree"
            className="w-full h-full relative"
            loading="lazy" // Defers offscreen image loading
            decoding="async"
            priority={false} // Removes high load priority
          />
          <BannerText title="Best for men" />
        </div>
      </Slider>
      <div className="absolute w-full h-44 bg-gradient-to-t from-darkText to-transparent bottom-0 left-0 z-10" />
    </div>
  );
};

export default Banner;