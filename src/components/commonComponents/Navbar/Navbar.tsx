"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { navItems } from "@/src/utils/data/appData";

export default function Navbar() {
  const router = useRouter();
  const pathName = usePathname();

  const handleNavItemClick = (href: string) => {
    if (pathName === href) {
      window.location.reload();
    }
  };

  return (
    <nav className="w-[20vw] bg-primary text-white py-4 px-8 hidden sml:block">
      <div className="text-2xl font-bold mb-8">
        <Image
          src="/rgm-logo.svg"
          alt="Vercel Logo"
          width={176}
          height={46}
          priority
        />
      </div>
      <ul>
        {navItems.map((item) => {
          const isActive = pathName.startsWith(item.href);
          return (
            <li
              key={item.name}
              className={`mb-4 px-4 py-3 rounded-md ${
                isActive ? "bg-secondary" : "hover:bg-secondary/50"
              }`}
            >
              <Link
                href={item.href}
                className={`flex items-center font-poppins text-[14px] font-[500] ${
                  isActive
                    ? "text-white text-[16px] font-[600]"
                    : "text-gray-300 hover:text-white"
                }`}
                onClick={() => handleNavItemClick(item.href)}
              >
                <Image
                  src={item.icon}
                  width={24}
                  height={24}
                  alt={item.alt}
                  className="mr-3"
                />
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
