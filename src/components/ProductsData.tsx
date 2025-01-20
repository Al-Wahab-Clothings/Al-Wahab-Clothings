"use client";

import { useState } from "react";
import Slider from "react-slick";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import ProductsCard from "./ProductsCard";

const ProductsData = ({ lawn, embroided, chickenKari, khaddar }: any) => {
  const [selectedOption, setSelectedOption] = useState("chickenKari"); // default
  const options = [
    { id: "lawn", label: "Lawn", data: lawn },
    { id: "embroided", label: "Embroided", data: embroided },
    { id: "chickenKari", label: "Chicken Kari", data: chickenKari },
    { id: "khaddar", label: "Khaddar", data: khaddar },
  ];

  // Function to handle selection of option
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  // Logic for rendering products based on selected option
  const currentData = options.find(option => option.id === selectedOption)?.data || [];

  // Updated PrevArrow
  const PrevArrow = (props: any) => {
    const { onClick } = props;

    const handlePrevClick = () => {
      const currentIndex = options.findIndex(option => option.id === selectedOption);
      const prevIndex = (currentIndex - 1 + options.length) % options.length; // Wraps around
      setSelectedOption(options[prevIndex].id);
      onClick(); // Calls the slick slider's function to move the slide
    };

    return (
      <div
        className="-mt-1 text-[#D6CFB4] absolute left-2 top-1/6 z-10"
        onClick={handlePrevClick}
      >
        <IoIosArrowBack size={30}/>
      </div>
    );
  };

  // Updated NextArrow
  const NextArrow = (props: any) => {
    const { onClick } = props;

    const handleNextClick = () => {
      const currentIndex = options.findIndex(option => option.id === selectedOption);
      const nextIndex = (currentIndex + 1) % options.length; // Wraps around
      setSelectedOption(options[nextIndex].id);
      onClick(); // Calls the slick slider's function to move the slide
    };

    return (
      <div
        className="-mt-7 text-[#D6CFB4] absolute right-2 top-1/6 z-10"
        onClick={handleNextClick}
      >
        <IoIosArrowForward size={30}/>
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
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div>
      {/* Option selection slider */}
      <div className="mt-6 relative items-center text-center sm:mx-24 lg:mx-52 xl:mx-64 py-6 px-4 rounded-full bg-darkText border-[#D6CFB4] border">
        <Slider {...settings}>
          {options.map(option => (
            <div
              key={option.id}
              className={`text-sm sm:text-base ${selectedOption === option.id ? 'text-[#D6CFB4] font-bold underline decoration-2 underline-offset-4 decoration-[#D6CFB4]' : 'text-[#D6CFB4] font-semibold'}`}
              onClick={() => handleOptionSelect(option.id)}
            >
              {option.label}
            </div>
          ))}
        </Slider>
      </div>

      {/* Slider to display products for selected option */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-14">
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