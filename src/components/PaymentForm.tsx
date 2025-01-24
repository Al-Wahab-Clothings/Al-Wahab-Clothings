"use client";

import { useDispatch, useSelector } from "react-redux";
import { Product, StateProps } from "../type";
import FormattedPrice from "./FormattedPrice";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { resetCart, saveOrder } from "@/redux/shoppingSlice";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

const PaymentForm = () => {
  const { productData } = useSelector((state: StateProps) => state?.shopping);
  const dispatch = useDispatch();

  const { userInfo }: any = useSelector(
    (state: StateProps) => state.shopping
  );

  const [totalAmt, setTotalAmt] = useState(0);
  useEffect(() => {
    let amt = 0;
    productData.map((item: Product) => {
      if (item.price) {
        amt += (item.price || 0) * (item.quantity || 0);
      }
    });
    setTotalAmt(amt);
  }, [productData]);

  const handleResetCart = async () => {
    try {
      const res = await fetch("/api/postgres", {
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
        throw new Error(error.message || "Failed to reset cart.");
      }

      const result = await res.json();
      console.log("Reset cart response:", result);

      dispatch(resetCart());
      toast.success("Cart reset successfully!");
    } catch (error) {
      console.error("Error resetting cart:", error);
      toast.error(`An error occurred: ${(error as Error).message}`);
    }
  };

  const handleAddOrders = async (
    productData: Product[],
    userInfo: any,
    session: any,
    payment: string
  ) => {
    try {
      // Construct the order data
      const orderItems = productData.map((item) => {
        // Make sure item.id exists and is valid
        if (!item.id) {
          throw new Error(`Product ID is missing for product: ${item.title}`);
        }
        console.log("Product Data:", productData);  // Check if product_id exists for each item

        return {
          product_id: item.id, // Make sure product_id is correctly populated
          quantity: item.quantity || 1,
          price: item.price,
          description: item.description,
          title: item.title,
        };
      });

      // Send POST request to create or update the order
      const createOrderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: orderItems, // Includes product_id for each item
          user_id: userInfo ? userInfo.unique_id : "Anonymous",
          username: session?.user?.name || userInfo?.username || "Anonymous",
          payment: payment, // "pending" or "paid"
        }),
      });

      const orderData = await createOrderResponse.json();

      console.log("Order Data Response:", orderData);

      if (!createOrderResponse.ok || !orderData.res) {
        toast.error("Failed to create order");
        console.error("Error response from /api/orders:", orderData);
        return;
      }

      // Assuming orderData contains the order ID after successful creation
      const { id: orderId } = orderData.res;

      // Dispatch the saveOrder action to Redux
      dispatch(saveOrder({ order: productData, id: orderId }));

      // Optionally, redirect or notify the user
      toast.success("Order added successfully!");
      console.log("Order added successfully:", orderData);

      return orderData.res; // Return the orderData (e.g., for further processing)

    } catch (error) {
      console.error("Error during order creation:", error);
      toast.error("An error occurred while adding the order.");
    }
  };

  // =============  Stripe Payment Start here ==============
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
  const { data: session } = useSession();

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    if (!stripe) {
      toast.error("Stripe failed to load");
      return;
    }

    try {
      const orderPayment = "COD";
      const orderData = await handleAddOrders(productData, userInfo, session, orderPayment);

      if (!orderData) {
        throw new Error("Order creation failed");
      }

      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: productData,
          email: session?.user?.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(saveOrder({ order: productData, id: data.id }));

        const result = await stripe?.redirectToCheckout({ sessionId: data.id });
        if (result?.error) {
          console.error("Stripe redirection error:", result.error.message ?? "Unknown error");
          toast.error(result.error.message ?? "An error occurred during checkout");
        }
      } else {
        console.error("Failed to create Stripe Payment:", data);
        throw new Error(data.error || "Stripe payment failed");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  // =============  Stripe Payment End here ================

  return (
    <div className="w-full bg-[#D6CFB4] p-4 font-medium">
      <h2 className="font-bold mb-4">Cart Totals</h2>
      <div className="border-b-[1px] border-b-orange-600 py-2">
        <div className="flex items-center justify-between">
          <p>Subtotal</p>
          <p>
            <FormattedPrice amount={totalAmt} />
          </p>
        </div>
      </div>
      <div className="border-b-[1px] border-b-orange-600 py-2">
        <div className="flex items-center justify-between">
          <p>Shipping</p>
          <p>
            <FormattedPrice amount={200} />
          </p>
        </div>
      </div>
      <div className="border-b-[1px] border-b-orange-600 py-2">
        <div className="flex items-center justify-between">
          <p>Total Price</p>
          <p>
            <FormattedPrice amount={totalAmt + 200} />
          </p>
        </div>
      </div>
      {userInfo ? (
        <Button
          variant="default"
          onClick={handleCheckout}
          className="font-bold bg-darkText text-[#D6CFB4] mt-4 py-3 px-6 hover:bg-green-800 cursor-pointer duration-200"
        >
          Proceed to checkout
        </Button>
      ) : (
        <div>
          <Button
            variant="destructive"
            className="bg-darkText text-slate-100 mt-4 py-3 px-6 hover:bg-red-700 cursor-not-allowed duration-200 font-bold"
          >
            Proceed to checkout
          </Button>
          <p className="text-base mt-1 text-red-700 font-semibold animate-bounce">
            Please login to continue
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;