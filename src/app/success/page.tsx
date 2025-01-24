"use client";

import Link from "next/link";
import Container from "@/components/Container";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { StateProps } from "@/type";

const SuccessPage = () => {

    const { userInfo }: any = useSelector(
        (state: StateProps) => state.shopping
    );

    const { data: session } = useSession();

    return (
        <Container className="flex items-center justify-center py-20">
            <div className="min-h-[400px] flex flex-col items-center justify-center gap-y-5 mx-3">
                <h2 className="sm:text-4xl text-3xl font-bold text-darkText">
                    Your Order has been placed <span>{session?.user?.name || userInfo?.username}</span>!
                </h2>
                <p className="sm:text-xl text-lg font-bold text-darkText">
                    Soon you will get confirmation email from <span className="font-logo">Al Wahab Clothings</span>
                </p>
                <p className="font-medium">Now you can view your Orders or continue Shopping with us</p>
                <div className="grid md:grid-cols-2 items-center gap-4">
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