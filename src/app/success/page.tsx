import Container from "@/components/Container";
import Link from "next/link";
import React from "react";

const SuccessPage = () => {
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