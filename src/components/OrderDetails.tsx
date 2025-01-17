"use client";
import { useDispatch, useSelector } from "react-redux";
import { Product, StateProps } from "../type";
import { useEffect, useState } from "react";
import Image from "next/image";
import FormattedPrice from "./FormattedPrice";
import { resetOrder } from "@/redux/shoppingSlice";
import Link from "next/link";
import { Button } from "./ui/button";
import { urlForImage } from "@/sanity/lib/image";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderData } = useSelector((state: StateProps) => state?.shopping);

  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    let amt = 0;
    orderData?.order?.map((item: Product) => {
      amt += item.price * item.quantity;
      return;
    });
    setTotalAmount(amt);
  }, [orderData.order]);

  return (
    <div className="my-28">
      {orderData?.order?.length > 0 ? (
        <div>
          <h2 className="font-bold text-5xl -mt-10 mb-4 font-logo text-darkText">Your Orders</h2>
          <div className="grid sm:grid-cols-6 grid-cols-4 uppercase text-sm font-medium py-2 border-b-[1px] bg-[#D6CFB4] p-2 border-b-gray-300 ">
            <p className="sm:col-span-3 justify-center">Items</p>
            <p className="flex items-center justify-end hidden md:block md:ml-9 lg:ml-12 xl:ml-16">Quantity</p>
            <p className="flex items-center justify-center block md:hidden">Qty.</p>
            <p className="flex items-center justify-center">Per Unit</p>
            <p className="flex items-center justify-center">Amount</p>
          </div>
          <div className="py-2 flex flex-col justify-center gap-2 mt-3">
            {orderData?.order?.map((item: Product) => (
              <div
                key={item?.id}
                className="py-2 border-b-[1px] border-darkText border-opacity-50 grid sm:grid-cols-6 grid-cols-4 items-center"
              >
                <div className="sm:col-span-3 flex items-center gap-4 text-sm">
                  <Image
                    src={urlForImage(item?.image).url()}
                    alt="product image"
                    width={500}
                    height={500}
                    className="w-12 h-12 object-cover"
                  />
                  <div>
                    <h3 className="text-base font-semibold mb-.5 sm:block hidden">
                      {item?.title}
                    </h3>
                    <p className="hidden sm:block">{item?.description}</p>
                  </div>
                </div>
                <p className="flex items-center justify-center">
                  {item?.quantity}
                </p>
                <p className="flex items-center justify-center">
                  <FormattedPrice amount={item?.price} />
                </p>
                <p className="flex items-center justify-center">
                  <FormattedPrice amount={item?.price * item.quantity} />
                </p>
              </div>
            ))}
          </div>
          <div className="text-lg font-medium py-2 mt-4 border-b-[1px] border-b-gray-300">
            <p>Payment Details</p>
          </div>
          <p className="py-2">
            Total Paid{" "}
            <span className="text-xl font-semibold">
              <FormattedPrice amount={totalAmount} />
            </span>
          </p>
          <Button
            onClick={() => dispatch(resetOrder())}
            className="text-white bg-red-700 hover:bg-red-800 mt-5 border-[1px] py-1 px-4 font-medium rounded-md cursor-pointer duration-200"
          >
            Reset Order
          </Button>
        </div>
      ) : (
        <div className="py-14 text-black text-2xl text-center">
          <p>Nothing to show</p>
          <Link href={"/"}>
            <button className="mt-4 bg-darkText text-[#D6CFB4] w-44 h-12 rounded-full text-base font-semibold hover:bg-[#D6CFB4] hover:text-darkText duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;