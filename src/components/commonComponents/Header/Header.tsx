"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { UserInterface } from "@/src/interfaces";
import { navItems } from "@/src/utils/data/appData";
import { userData } from "@/src/utils/services/service";
import ManageStorage from "@/src/utils/services/cookiesStorage";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  Link,
} from "@nextui-org/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<UserInterface>();
  const router = useRouter();
  const pathName = usePathname();

  const handleLogout = () => {
    ManageStorage.removeItem("access_token");
    router.push("/login");
  };

  const getUserData = async () => {
    const response = await userData();
    setUserDetails(response.data.results);
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <header className="bg-primary sml:bg-[#FFF] shadow-md p-4 px-4 sml:px-12 text-right flex sml:block">
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        classNames={{
          base: "bg-transparent p-0 block sml:hidden",
          wrapper: "p-0 h-full",
          menu: "bg-primary",
        }}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden "
          />
          <NavbarBrand>
            <Image
              src="/rgm-logo.svg"
              alt="Vercel Logo"
              width={100}
              height={32}
              priority
            />
          </NavbarBrand>
        </NavbarContent>

        <NavbarMenu>
          {/* {navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={"primary"}
                className="w-full"
                href={item.href}
                size="lg"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))} */}

          {navItems.map((item) => {
            const isActive = pathName === item.href;
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
        </NavbarMenu>
      </Navbar>

      <div className="flex items-center justify-end">
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <div className="flex items-center w-[170px] justify-end cursor-pointer">
              {/* <div className="h-[35px] w-[35px] bg-secondary rounded-md flex justify-center items-center text-[16px] font-poppins font-[600]">
                MS
              </div>
              <div className="text-[#fff] sml:text-[#2C3E50] text-[14px] font-poppins font-[500]">
                {userDetails?.username}
              </div> */}
              <div>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 text-[#fff] sml:text-[#000]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-8 text-[#fff] sml:text-secondary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </div>
            </div>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="User Actions"
            variant="flat"
            classNames={{
              base: "!w-[177px] text-red",
              list: "font-poppins text-secondary",
            }}
          >
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
}
