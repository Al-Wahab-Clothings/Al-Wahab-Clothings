"use client";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import { IoMdCart } from "react-icons/io";
import { FiSearch, FiLogOut } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import FormattedPrice from "./FormattedPrice";
import Link from "next/link";
import { addUser, deleteUser } from "@/redux/shoppingSlice";
import { BsBookmarks } from "react-icons/bs";
import { Product, StateProps } from "@/type";
import Logo from "./Logo";

const Header = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { productData, orderData } = useSelector(
    (state: StateProps) => state.shopping
  );

  useEffect(() => {
    if (session) {
      dispatch(
        addUser(session?.user)
      );
    } else {
      dispatch(deleteUser());
    }
  }, [session, dispatch]);

  const [totalAmt, setTotalAmt] = useState(0);

  useEffect(() => {
    let amt = 0;
    productData.map((item: Product) => {
      amt += item.price * item.quantity;
      return;
    });
    setTotalAmt(amt);
  }, [productData]);

  return (
    <div className="bg-darkText h-20 top-0 sticky z-50">
      <Container className="w-full h-full flex items-center md:gap-x-5 justify-between">
        <Logo />

        {/* Search Field */}
        <div className="w-2/3 bg-[#D6CFB4] hidden xl:flex items-center gap-x-1 border-[1px] border-lightText/50 rounded-full px-4 py-1.5 focus-within:border-orange-700 group">
          <FiSearch className="text-darkText group-focus-within:text-darkText duration-200" />
          <input
            type="text"
            placeholder="Search for products"
            className="placeholder:text-sm flex-1 outline-none bg-[#D6CFB4] text-darkText"
          />
        </div>
        <div className="justify-end flex gap-2 sm:gap-5 xl:gap-3">
          {/* Cart button */}
          <div>
            <Link href={"/cart"}>
              <div className="bg-[#D6CFB4] hover:bg-darkText rounded-full text-black hover:text-[#D6CFB4] flex items-center justify-center gap-x-1 px-3 py-1.5 border-[1px] border-darkText hover:border-[#D6CFB4] duration-200 relative">
                <p className="text-sm font-semibold hidden sm:block">
                  <FormattedPrice amount={totalAmt ? totalAmt : 0} />
                </p>
                <IoMdCart className="sm:text-xl text-2xl" />
                <span className="bg-[#D6CFB4] text-darkText rounded-full text-xs font-semibold absolute -right-2 -top-1 w-5 h-5 flex items-center justify-center shadow-xl shadow-black border-[0.2px] border-darkText">
                  {productData ? productData?.length : 0}
                </span>
              </div> 
            </Link>
          </div>
          {/* Login/Register */}
          {!session && (
            <div onClick={() => signIn()} className="headerDiv cursor-pointer bg-darkText text-[#D6CFB4] hover:text-darkText hover:bg-[#D6CFB4]">
              <AiOutlineUser className="text-2xl" />
              <p className="text-sm font-semibold">Login</p>
            </div>
          )}
          {/* Order button */}
          {orderData?.order?.length > 0 && session && (
            <Link
              href={"/order"}
              className="headerDiv px-2 gap-x-1 cursor-pointer bg-[#D6CFB4] text-darkText hover:bg-darkText hover:text-[#D6CFB4]"
            >
              <BsBookmarks className="text-xl" />
              {/* <p className="text-sm font-semibold">Orders</p> */}
            </Link>
          )}
          {/* user Image */}
          {session && (
            <Image
              src={session?.user?.image as string}
              alt="user image"
              width={40}
              height={40}
              className="rounded-full object-cover "
            />
          )}
          {/* Logout button */}
          {session && (
            <div
              onClick={() => signOut()}
              className="headerDiv px-1 gap-x-1 cursor-pointer bg-[#D6CFB4] text-darkText hover:bg-darkText hover:text-[#D6CFB4]"
            >
              <FiLogOut className="text-sm" />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Header;