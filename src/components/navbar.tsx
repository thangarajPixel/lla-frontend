"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react"
import ImageWidget from "./widgets/ImageWidget";

interface NavbarProps {
  isScrolled: boolean;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Navbar({ isScrolled, isOpen, setIsOpen }: NavbarProps) {  return (
   <nav
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? "bg-white shadow-md text-black" : "bg-transparent"
  }`}
>
  <div className="flex items-center justify-between  px-9 py-2  md:px-12 lg:px-55 font-mulish mx-auto">
        <div className="flex items-center gap-3 ">
          <ImageWidget
            src={{ light: "/logo-1-white.png", dark: "/logo-1-black.png" }}
            alt="Icon"
            width={47}
            height={60}
            isScrolled={isScrolled}
            className="w-10 sm:w-12 md:w-[35px] h-[45px]"
            priority
          />
          <div
            className={`h-[45px] w-[1px] hidden sm:block ${
              isScrolled ? "bg-black" : "bg-white"
            }`}
          />
         <ImageWidget
          src={{ light: "/logo-2-white.png", dark: "/logo-2-black.png" }}
          alt="Logo"
          width={201}
          height={65}
          isScrolled={isScrolled}
          className="w-[200px] sm:w-[180px] md:w-[200px] lg:w-[185px] lg:h-[45px]"
          priority
        />
        </div>

    <div className="hidden lg:flex items-center gap-8 text-xs">
  {[
    { name: "About Us", href: "about", arrow: false },
    { name: "Courses", href: "#courses", arrow: true },
    { name: "Campus", href: "#campus", arrow: true },
    { name: "Faculty", href: "#faculty", arrow: false },
  ].map((item, i) => (
    <div key={i} className="flex items-center gap-1 last:gap-40">
      <Link
        href={item.href}
        className={`hover:text-[#EB8844] transition ${
          isScrolled ? "text-black" : "text-white"
        }`}
      >
        {item.name}
      </Link>
      {item.arrow && (
        <Image
          src="/arrow-down.png"
          alt="down"
          width={16}
          height={16}
          className={`${isScrolled ? "filter invert" : ""} ml-1 w-4 h-4`}
        />
      )}
    </div>
  ))}
  <button
    className="flex items-center h-[35px] bg-[#E97451] text-white px-4  py-2 rounded-full  hover:bg-[#ff984f] transition"
  >
    <span className="text-[14px] font-mulish fond-bold font-[600]">Admissions Open</span>
      <ImageWidget
        src="/arrow-right.png"
        alt="Right Arrow"
        width={18}
        height={18}
        className="ml-2"
      />
  </button>
</div>


      
        {/* ----- Mobile Menu Toggle ----- */}
        <button
          className={`lg:hidden transition-colors duration-300  ${
            isScrolled ? " bg-black text-white" : "text-white"
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* ----- Mobile Menu ----- */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-black/95 text-white flex flex-col items-center py-6  space-y-6 lg:hidden transition-all duration-300">
            {["About Us", "Courses", "Campus", "Faculty"].map((item, i) => (
              <Link
                key={i}
                href={"#" + item.toLowerCase().replace(" ", "")}
                onClick={() => setIsOpen(false)}
                className="text-sm hover:text-[#EB8844] transition"
              >
                {item}
              </Link>
            ))}
            <button className="bg-[#EB8844] text-white px-6 py-3 rounded-full hover:bg-[#ff984f] transition text-sm font-semibold">
              Admissions Open
            </button>
          </div>
        )}
      </div>
   </nav>
  );
}
