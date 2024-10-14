import React from "react";
import Image from "next/image";
import { AuthLayoutProps } from "@/src/interfaces";

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="bg-[#fff] h-screen text-[#fff]">
      <div className="bg-primary h-screen p-2 sml:py-4 sml:px-16 mdl:p-16 flex justify-between authLayoutStyle">
        <div className="w-[100%] sml:w-[50%]">
          <Image
            src="/rgm-logo.svg"
            alt="Vercel Logo"
            width={215}
            height={57}
            priority
          />
          {children}
        </div>
        <div className="hidden sml:block mdl:block relative mr-32 lgl:mr-14 self-center w-[370px] h-[370px] lgl:w-[523px] lgl:h-[523px]">
          <Image src="/auth-cover.png" alt="Vercel Logo" fill priority />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
