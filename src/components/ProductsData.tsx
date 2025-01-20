"use client";

import { useState } from "react";
import Slider from "react-slick";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import ProductsCard from "./ProductsCard";

const ProductsData = ({ lawn, embroided, chickenKari, khaddar }: any) => {
  const [selectedOption, setSelectedOption] = useState("chickenKari"); // default
  const options = [
    { id: "lawn", label: "Lawn", data: lawn },
    { id: "embroided", label: "Embroidered", data: embroided },
    { id: "chickenKari", label: "Chicken Kari", data: chickenKari },
    { id: "khaddar", label: "Khaddar", data: khaddar },
  ];

  // Function to handle selection of option
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  // Logic for rendering products based on selected option
  const currentData = options.find(option => option.id === selectedOption)?.data || [];

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        className="p-2 rounded-2xl bg-[#D6CFB4] text-darkText absolute left-2 top-1/6 z-10"
        onClick={onClick}
      >
        <IoIosArrowBack />
      </div>
    );
  };

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        className="p-2 rounded-2xl bg-[#D6CFB4] text-darkText absolute right-2 top-1/6 z-10"
        onClick={onClick}
      >
        <IoIosArrowForward />
      </div>
    );
  };

  // Responsive slider settings
  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    slidesToShow: 4, // Default to 4 slides on large screens
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280, // For tablets and smaller desktops
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024, // For tablets and smaller desktops
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // For mobile devices (portrait)
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // For very small devices
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // For very small devices
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      {/* Option selection slider */}
      <div className="mt-10 relative items-center text-center md:px-24 lg:px-36">
        <Slider {...settings}>
          {options.map(option => (
            <div
              key={option.id}
              className={`text-sm sm:text-base ${selectedOption === option.id ? 'text-darkText font-bold underline decoration-2 underline-offset-3 decoration-darkText' : 'text-darkText font-semibold'}`}
              onClick={() => handleOptionSelect(option.id)}
            >
              {option.label}
            </div>
          ))}
        </Slider>
      </div>

      {/* Slider to display products for selected option */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
        {/* Display products for the selected category */}
        {currentData.map((item: any) => (
          <div className="w-full p-2" key={item.id}>
            <ProductsCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsData;