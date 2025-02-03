"use client";
import { useDispatch, useSelector } from "react-redux";
import { Order, StateProps } from "../type";
import { useEffect, useState } from "react";
import FormattedPrice from "./FormattedPrice";
import { resetOrder, setOrderData } from "@/redux/shoppingSlice";
import Link from "next/link";
import { Button } from "./ui/button";
import toast, { Toaster } from "react-hot-toast";

const OrderDetails = ({ item }: any) => {
  const dispatch = useDispatch();
  const orderData = useSelector((state: StateProps) => state.shopping.orderData);

  const [totalAmount, setTotalAmount] = useState(0);
  const { userInfo }: any = useSelector(
    (state: StateProps) => state.shopping
  );

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/orders?user_id=${userInfo ? userInfo.unique_id : "Anonymous"}`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders data");
        }
        const data = await response.json();

        // Assuming that the API returns allOrdersData as an array of orders
        const orders = data.allOrdersData;

        // Dispatch the orders data to the store
        dispatch(setOrderData(orders));

      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (userInfo) {
      fetchOrders();
    }
  }, [userInfo, dispatch]);

  const handleResetOrder = async () => {
    // Show confirmation popup before resetting the order
    const isConfirmed = window.confirm("Are you sure you want to reset the order?");

    if (isConfirmed) {
      try {
        const res = await fetch("/api/orders", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userInfo ? userInfo.unique_id : "Anonymous",
          }),
        });

        if (!res.ok) {
          const error = await res.json();
          console.error("Error response from server:", error);
          throw new Error(error.message || "Failed to reset order.");
        }

        const result = await res.json();
        console.log("Reset Order response:", result);

        dispatch(resetOrder());
        toast.success("Order reset successfully!");

      } catch (error) {
        console.error("Error resetting order:", error);
        toast.error(`An error occurred: ${(error as Error).message}`);
      }
    } else {
      // If the user clicks "No", do nothing (optional)
      console.log("Order reset cancelled.");
    }
  };


  useEffect(() => {
    let amt = 0;
    orderData?.forEach((item: Order) => {
      amt += item.unit_price * item.quantity;
    });
    setTotalAmount(amt);
  }, [orderData]);

  return (
    <div className="my-28">
      {orderData?.length > 0 ? (
        <div>
          <h2 className="font-bold text-5xl -mt-10 mb-4 font-logo text-darkText">Your Orders</h2>
          <div className="grid sm:grid-cols-6 grid-cols-4 text-sm font-medium py-2 border-b-[1px] bg-[#D6CFB4] p-2 border-b-gray-300">
            <p className="sm:col-span-3 justify-center uppercase">Items</p>
            <p className="hidden md:block text-center">Quantity</p>
            <p className="block md:hidden text-center">Qty.</p>
            <p className="hidden md:block text-center">Amount</p>
            <p className="block md:hidden text-center">Amt.</p>
            <p className="hidden md:block text-center">Payment</p>
            <p className="block md:hidden text-center">Pay.</p>
          </div>
          <div className="py-2 flex flex-col gap-2 mt-3">
            {orderData?.map((item: Order) => (
              <div
                key={item?.orderId}
                className="py-2 border-b-[1px] grid sm:grid-cols-6 grid-cols-4 items-center"
              >
                <div className="sm:col-span-3 flex items-center gap-4">
                  <Link href={{ pathname: `https://www.alwahabclothings.com/product/${item?.product_id}`}}
                  aria-label="View Single Product">
                    <h3 className="text-base font-semibold">{item?.title}</h3>
                  </Link>
                </div>
                <p className="text-center">{item?.quantity}</p>
                <p className="text-center">
                  <FormattedPrice amount={item?.unit_price * item.quantity} />
                </p>
                <p className="text-center">{item?.payment}</p>
              </div>
            ))}
          </div>
          <div className="py-2 mt-4 border-b-[1px]">
            <p>Shipment: <span className="font-semibold">PKR 200</span></p>
          </div>
          <p className="py-2">
            Total Payment:{" "}
            <span className="text-xl font-semibold">
              <FormattedPrice amount={totalAmount + 200} />
            </span>
          </p>
          <Button
            onClick={handleResetOrder}
            className="bg-red-700 text-white hover:bg-red-800 mt-5 px-4 py-1 rounded-md"
          >
            Reset Order
          </Button>
        </div>
      ) : (
        <div className="py-14 text-center">
          <p className="text-xl font-semibold">You have&apos;nt place any order yet!</p>
          <Link href="/" aria-label="Back to Home page">
            <button className="bg-darkText font-bold text-white hover:text-darkText py-2 px-6 rounded-md hover:bg-[#D6CFB4] duration-200 mt-4">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default OrderDetails;