"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "../navbar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      setIsScrolled(true);
      return;
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);
  return (
    <header>
      <Navbar isScrolled={isScrolled} isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};
export default Header;
