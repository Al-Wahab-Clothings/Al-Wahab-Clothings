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
      return;
    }});
    setTotalAmt(amt);
  }, [productData]);

  // =============  Stripe Payment Start here ==============
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
  const { data: session } = useSession();
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch("/api/checkout", {
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
      stripe?.redirectToCheckout({ sessionId: data.id });
    } else {
      throw new Error("Failed to create Stripe Payment");
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
          <Button variant="destructive" className="bg-darkText text-slate-100 mt-4 py-3 px-6 hover:bg-red-700 cursor-not-allowed duration-200 font-bold">
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