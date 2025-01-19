import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"}>
      <h3 className="font-logo text-3xl text-[#D6CFB4] hover:text-orange-600 cursor-pointer duration-200">
        Al Wahab
      </h3>
      <p className="-tracking-[-0.30em] -mt-2 font-semibold text-[#D6CFB4]">Clothings</p>
    </Link>
  );
};

export default Logo;