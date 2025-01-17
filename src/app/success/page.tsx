"use client";

import Link from "next/link";
import Container from "@/components/Container";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { resetCart, saveOrder } from "@/redux/shoppingSlice";
import { StateProps } from "@/type";
import toast from "react-hot-toast";

const SuccessPage = () => {

    const { productData } = useSelector((state: StateProps) => state?.shopping);
    const dispatch = useDispatch();
    const { userInfo }: any = useSelector(
        (state: StateProps) => state.shopping
    );

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

    handleResetCart();

    return (
        <Container className="flex items-center justify-center py-20">
            <div className="min-h-[400px] flex flex-col items-center justify-center gap-y-5 mx-3">
                <h2 className="text-4xl font-bold text-darkText">
                    Your Payment Accepted by <span className="font-logo">Al-Wahab</span>
                </h2>
                <p>Now you can view your Orders or continue Shopping with us</p>
                <div className="flex items-center gap-x-5">
                    <Link href={"/order"}>
                        <button className="bg-darkText text-[#D6CFB4] w-44 h-12 rounded-full text-base font-semibold hover:bg-[#D6CFB4] duration-300 hover:text-darkText">
                            View Orders
                        </button>
                    </Link>
                    <Link href={"/"}>
                        <button className="bg-darkText text-[#D6CFB4] w-44 h-12 rounded-full text-base font-semibold hover:bg-[#D6CFB4] duration-300 hover:text-darkText">
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            </div>
        </Container>
    );
};

export default SuccessPage;