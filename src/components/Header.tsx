"use client";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import { IoMdCart } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
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
import { BiDotsVerticalRounded } from "react-icons/bi"; // Import 3-dots icon

const Header = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { productData } = useSelector(
    (state: StateProps) => state.shopping
  );

  const orderData = useSelector((state: StateProps) => state.shopping.orderData);

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

  useEffect(() => {
    console.log("Order Data Updated:", orderData); // Debugging
  }, [orderData]);

  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

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
        <div className="justify-end flex gap-2 items-center sm:gap-5 xl:gap-3">
          {/* Cart button */}
          <div>
            <Link href={"/cart"}>
              <div className="bg-[#D6CFB4] hover:bg-darkText rounded-full text-black hover:text-[#D6CFB4] flex items-center justify-center gap-x-1 sm:px-3 sm:py-1.5 px-2 py-1 border-[1px] border-darkText hover:border-[#D6CFB4] duration-200 relative mt-1">
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
            <div onClick={() => signIn()} className="headerDiv ml-1 cursor-pointer bg-darkText text-[#D6CFB4] hover:text-darkText hover:bg-[#D6CFB4]">
              <AiOutlineUser className="text-2xl" />
              <p className="text-sm font-semibold md:block hidden">Login</p>
            </div>
          )}
          {/* Order button */}
          {orderData?.length > 0 && session && (
            <Link
              href={"/order"}
              className="gap-x-1 cursor-pointer text-[#D6CFB4] hover:bg-darkText">
              <BsBookmarks className="sm:text-3xl text-2xl ml-1" />
            </Link>
          )}
          {/* user Image */}
          {session && (
            <Image
              src={session?.user?.image as string}
              alt="user image"
              width={40}
              height={40}
              className="rounded-full ml-2 object-cover "
            />
          )}
          {/* Logout button */}
          {session && (
            <div className="relative">
              {/* Three Dots Button */}
              <div
                onClick={() => setShowLogoutConfirmation(!showLogoutConfirmation)}
                className="gap-x-1 cursor-pointer flex items-center justify-center"
              >
                <BiDotsVerticalRounded className="text-2xl text-[#D6CFB4] -mr-2" /> {/* Three Dots Icon */}
              </div>

              {/* Logout Confirmation */}
              {showLogoutConfirmation && (
                <div className="absolute right-0 mt-2 bg-[#D6CFB4] shadow-lg rounded-md border border-darkText py-2 px-4 z-50 border-opacity-30">
                  <p className="text-sm mb-2">Are you sure you want to logout?</p>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowLogoutConfirmation(false)}
                      className="text-sm text-darkText px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => signOut()}
                      className="text-sm px-3 py-1 bg-red-700 text-white hover:bg-red-800 rounded"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Header;