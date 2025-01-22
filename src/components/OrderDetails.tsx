"use client";
import { useDispatch, useSelector } from "react-redux";
import { Order, Product, StateProps } from "../type";
import { useEffect, useState } from "react";
import Image from "next/image";
import FormattedPrice from "./FormattedPrice";
import { resetOrder, saveOrder } from "@/redux/shoppingSlice";
import Link from "next/link";
import { Button } from "./ui/button";
import { urlForImage } from "@/sanity/lib/image";
import toast from "react-hot-toast";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderData }: any = useSelector((state: StateProps) => state.shopping);

  const [totalAmount, setTotalAmount] = useState(0);

  // const fetchOrders = async () => {
  //   try {
  //     const res = await fetch(`/api/orders?user_id=${userInfo?.unique_id || "Anonymous"}`);
  //     if (!res.ok) throw new Error("Failed to fetch orders.");

  //     const data = await res.json();
  //     if (data?.allOrdersData) {
  //       dispatch(saveOrder(data.allOrdersData)); // Ensure the API returns the correct structure
  //     } else {
  //       toast.error("No orders found.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching orders:", error);
  //     toast.error("Failed to fetch orders.");
  //   }
  // };

  useEffect(() => {
    let amt = 0;
    orderData?.order?.forEach((item: Product) => {
      amt += item.price * item.quantity;
    });
    setTotalAmount(amt);
  }, [orderData.order]);

  // useEffect(() => {
  //   if (userInfo?.unique_id) {
  //     fetchOrders();
  //   }
  // }, [userInfo]);

  return (
    <div className="my-28">
      {orderData?.order?.length > 0 ? (
        <div>
          <h2 className="font-bold text-5xl -mt-10 mb-4 font-logo text-darkText">Your Orders</h2>
          <div className="grid sm:grid-cols-6 grid-cols-4 uppercase text-sm font-medium py-2 border-b-[1px] bg-[#D6CFB4] p-2 border-b-gray-300">
            <p className="sm:col-span-3 justify-center">Items</p>
            <p className="hidden md:block text-center">Quantity</p>
            <p className="block md:hidden text-center">Qty.</p>
            <p className="text-center">Per Unit</p>
            <p className="text-center">Amount</p>
          </div>
          <div className="py-2 flex flex-col gap-2 mt-3">
            {orderData?.order?.map((item: Order) => (
              <div
                key={item?.orderId}
                className="py-2 border-b-[1px] grid sm:grid-cols-6 grid-cols-4 items-center"
              >
                <div className="sm:col-span-3 flex items-center gap-4">
                  <Image
                    src={urlForImage(item?.image).url()}
                    alt="product image"
                    width={500}
                    height={500}
                    className="w-12 h-12 object-cover"
                  />
                  <div>
                    <h3 className="text-base font-semibold sm:block hidden">{item?.title}</h3>
                  </div>
                </div>
                <p className="text-center">{item?.quantity}</p>
                <p className="text-center">
                  <FormattedPrice amount={item?.price} />
                </p>
                <p className="text-center">
                  <FormattedPrice amount={item?.price * item.quantity} />
                </p>
                <p className="text-center">{item?.status}</p>
              </div>
            ))}
          </div>
          <div className="py-2 mt-4 border-b-[1px]">
            <p>Shipment: <span className="font-semibold">PKR 200</span></p>
          </div>
          <p className="py-2">
            Total Paid:{" "}
            <span className="text-xl font-semibold">
              <FormattedPrice amount={totalAmount+200} />
            </span>
          </p>
          <Button
            onClick={() => dispatch(resetOrder())}
            className="bg-red-700 text-white hover:bg-red-800 mt-5 px-4 py-1 rounded-md"
          >
            Reset Order
          </Button>
        </div>
      ) : (
        <div className="py-14 text-center">
          <p className="text-2xl font-semibold">Nothing to show</p>
          <Link href="/">
            <button className="mt-4 bg-darkText text-[#D6CFB4] w-44 h-12 rounded-full font-semibold hover:bg-[#D6CFB4] hover:text-darkText duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;