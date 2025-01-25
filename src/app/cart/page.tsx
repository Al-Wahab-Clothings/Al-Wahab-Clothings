"use client";

import Container from "@/components/Container";
import { useDispatch, useSelector } from "react-redux";
import { StateProps } from "../../type";
import CartItem from "@/components/CartItem";
import { resetCart } from "@/redux/shoppingSlice";
import PaymentForm from "@/components/PaymentForm";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { Product as IProduct } from "@/type";

const CartPage = () => {
  const dispatch = useDispatch();
  const { userInfo }: any = useSelector(
    (state: StateProps) => state.shopping
  );

  const cartData = useSelector((state: StateProps) => state.shopping.productData);

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

  const { productData } = useSelector((state: StateProps) => state?.shopping);
  return (
    <Container>
      {cartData.length > 0 ? (

        <Container>
          <h2 className="font-bold text-5xl -mt-8 mb-4 font-logo text-darkText">Cart</h2>
          <div className="flex flex-col gap-5">
            <div className="hidden lg:inline-flex items-center justify-between font-semibold bg-[#D6CFB4] p-3">
              <p className="w-1/3">Product</p>
              <p className="w-1/3 flex items-center justify-center">Quantity</p>
              <p className="w-1/3 flex items-center justify-end">Subtotal</p>
            </div>
            {cartData.map((product: IProduct) => (
              <CartItem key={product.id} item={product} />
            ))}
            <div className="flex items-center justify-end">
              <Button
                variant="destructive"
                onClick={handleResetCart}
                className="bg-red-700 text-base font-semibold text-slate-100 py-2 px-6 hover:bg-red-800 hover:text-white duration-200"
              >
                Reset cart
              </Button>
            </div>
            {/* Payment Form */}
            <PaymentForm />
          </div>
        </Container>
      ) : (
        <div className="flex flex-col gap-y-6 items-center justify-center h-[500px] px-4">
          <p className="font-semibold w-full text-center text-xl">
            Your product cart is currently empty!
          </p>
          <Link href={"/"}>
            <button className="bg-darkText font-bold text-white hover:text-darkText py-2 px-6 rounded-md hover:bg-[#D6CFB4] duration-200">
              Return to Shop
            </button>
          </Link>
        </div>
      )}
      <Toaster />
    </Container>
  );
};

export default CartPage;