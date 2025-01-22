"use client";
import { GiSofa } from "react-icons/gi";
import { FaCartShopping } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "../../app/context/cardContext"; // Adjust the path as needed

export default function Navbar() {
  const { state } = useCart(); // Access the cart state from your context
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
  const dropdownRef = useRef<HTMLUListElement | null>(null); // Reference to dropdown menu

  // Calculate the total number of items in the cart
  const totalItemsInCart = state.items.reduce((total, item) => total + item.quantity, 0);

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Persist dropdown state across page reloads
  useEffect(() => {
    const savedDropdownState = localStorage.getItem('isDropdownOpen');
    if (savedDropdownState) {
      setIsDropdownOpen(JSON.parse(savedDropdownState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('isDropdownOpen', JSON.stringify(isDropdownOpen));
  }, [isDropdownOpen]);

  return (
    <div className="flex flex-col text-white max-w-screen-2xl mx-auto">
      {/* First Section */}
      <div className="flex justify-between items-center px-12 sm:px-16 md:px-28 lg:px-40 bg-purple-950 text-slate-300 py-2 text-xs sm:text-sm">
        <div>
          <h1>✔ Free Shipping On All Orders $50+</h1>
        </div>
        <div>
          <ul className="flex gap-6">
            <li>Eng</li>
            <Link href={"/Faq"}>Faqs</Link>
            <li>Need Help</li>
          </ul>
        </div>
      </div>

      {/* Second Section */}
      <div className="flex justify-between items-center px-12 sm:px-16 md:px-28 lg:px-40 bg-slate-50 text-black py-2 flex-wrap">
        <div className="flex items-center gap-4">
          <GiSofa className="text-emerald-500 h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
          <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold">
            Comforty
          </h1>
        </div>
        <div>
          <ul className="flex items-center gap-6 text-xs sm:text-sm">
            <li>
              <Link href={"/summary"}>
                <FaCartShopping className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500" />
              </Link>
            </li>
            <li>Cart</li>
            <li>
              {totalItemsInCart > 0 && (
                <span className="rounded-full text-white bg-emerald-600 px-2 py-1 text-xs">
                  {totalItemsInCart}
                </span>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Third Section */}
      <div className="flex flex-col md:flex-row justify-between items-center px-12 sm:px-16 md:px-28 lg:px-40 py-4 gap-3">
        <ul className="flex gap-6 text-xs sm:text-sm md:text-base text-black items-center relative">
          <li>
            <a href={"/"}>Home</a>
          </li>
          <li>
            <Link href={"/summary"}>Shop</Link>
          </li>
          <li>
            <Link href={"/Product"}>Product</Link>
          </li>
          <li>
            <Link href={"/About"}>About</Link>
          </li>
          <li>
            <Link href={"/Contact"}>Contact</Link>
          </li>
          <li className="relative">
            {/* Categories Button */}
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-1 text-black hover:underline"
            >
              Categories
              <span className="text-xs">&#9660;</span> {/* Down arrow */}
            </button>
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <ul
                ref={dropdownRef}
                className="absolute top-8 left-0 text-sm text-black bg-white shadow-md rounded-md w-32 transition-all duration-300 z-10"
              >
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link href={"/Categorychair"}>Chair</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link href={"/Stool"}>Stool</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link href={"/Sofa"}>Sofa</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
        <h1 className="text-xs sm:text-sm md:text-base text-black">
          Contact: +92 3112387225
        </h1>
      </div>
    </div>
  );
}
