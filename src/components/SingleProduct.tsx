"use client";

import Image from "next/image";
import FormattedPrice from "./FormattedPrice";
import { IoMdCart } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/shoppingSlice";
import toast, { Toaster } from "react-hot-toast";
import { StateProps } from "@/type";
import { BsWhatsapp } from "react-icons/bs";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import RenderDescription from "./Description";

const SingleProduct = ({ product }: any) => {
  const dispatch = useDispatch();

  const whatsappLink = `https://wa.me/923242886759?text=${encodeURIComponent(`Hi, I'm interested in this product: *${product.title}*.\n\nHere is the link: https://www.alwahabclothings.com/product/${product.id}`)}`;

  const { userInfo }: any = useSelector(
    (state: StateProps) => state.shopping
  );
  const handleAddToCart = async () => {
    try {
      const res = await fetch("/api/postgres", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product_id: product?.id,
          user_id: userInfo ? userInfo.unique_id : "Anonymous",
          quantity: 1  // Default quantity to add
        })
      });
      const result = await res.json();
      console.log(result);

      if (res.ok) {
        dispatch(addToCart({ ...product, quantity: 1 }));
        toast.success(`${product?.title.substring(0, 15)} added successfully!`);
      } else {
        toast.error("Failed to add item to cart.");
      }
    } catch (error) {
      console.log("Error adding to cart:", error);
      toast.error("An error occurred while adding item to cart.");
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-10 bg-[#D6CFB4] p-4 rounded-lg">
      <div>
        <Image
          src={urlForImage(product?.image).url()}
          alt="product image"
          width={1000}
          height={1000}
          className="w-full max-h-[500px] object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-center gap-y-10">
        <div>
          <p className="text-3xl font-semibold">{product?.title}</p>
          <p className="text-xl font-semibold">
            <FormattedPrice amount={product?.price} />
          </p>
        </div>
        <p className="text-darkText opacity-80">
        {product?.description && RenderDescription(product?.description)}
        </p>
        <div className="text-sm text-darkText flex flex-col">
          <span>
            SKU: <span className="text-darkText">{product?.id}</span>
          </span>
          <span>
            Category: <span className="text-darkText">{product?.category.name}</span>
          </span>
          <span>
            Brand: <span className="text-darkText font-bold">{product?.brand.name}</span>
          </span>
        </div>
        <div className="flex sm:flex-row items-center sm:justify-between justify-items-center flex-col">
          <div
            onClick={handleAddToCart}
            className="flex items-center cursor-pointer group"
          >
            <button className="bg-darkText text-slate-100 px-6 py-3 text-sm uppercase flex items-center border-r-[1px] border-r-slate-500 font-bold" >
              Add to cart
            </button>
            <span className="bg-[#D6CFB4] text-xl text-darkText w-12 flex items-center justify-center group-hover:bg-darkText group-hover:text-[#D6CFB4] duration-200 py-3">
              <IoMdCart />
            </span>
          </div>
          <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <div
              className="flex sm:flex-row-reverse items-center cursor-pointer group mt-2 sm:mt-0"
            >
              <button className="bg-darkText text-slate-100 px-6 py-3 text-sm uppercase flex items-center border-r-[1px] border-r-slate-500 font-bold" >
                WhatsApp
              </button>
              <span className="bg-[#D6CFB4] text-xl text-darkText w-12 flex items-center justify-center group-hover:text-[#D6CFB4] group-hover:bg-darkText duration-200 py-3">
                <BsWhatsapp />
              </span>
            </div>
          </Link>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default SingleProduct;