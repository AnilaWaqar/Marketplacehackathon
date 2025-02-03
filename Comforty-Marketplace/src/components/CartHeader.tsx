"use client"
import { BsCartDash } from "react-icons/bs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FiMenu } from "react-icons/fi";
import Link from 'next/link'
import { usePathname } from "next/navigation";
import { HiPhone } from "react-icons/hi2";
import { useCart } from "@/app/context/CartContext";
import WishlistButton from "./WishlistButton";
import { Link2 } from "lucide-react";

const CartHeader = () => {

  const { totalItems } = useCart();
  const currentPath = usePathname(); 
  return (
    <div className="bg-[#F0F2F3] xl:py-5 py-2 sm:py-3 px-3 sm:px-8 xl:px-20">
        <div className="flex justify-between">
         <Link href="/" className="logo flex items-center gap-1 sm:gap-2">
            <img src="/Logo Icon.png" alt="Logo" className="sm:w-auto max-[450px]:w-[30px] w-[35px]" />
            <span className="text-[#272343] text-2xl sm:text-[26px]  font-medium">Comforty</span>
         </Link>
        <div className="flex sm:gap-3 gap-2 items-center">
           {/* Cart */}
        <Link href="/cart" className="cart max-[450px]:hidden flex items-center bg-white sm:gap-3 gap-2 py-[3px] sm:py-[11px] px-2 sm:px-4 rounded-lg hover:shadow-lg">
          <span className="relative ">
            <BsCartDash className="sm:size-8 size-7  text-gray-500"/>          
            {totalItems > 0 && (
            <span className="rounded-full absolute -top-2 -right-2  bg-[#007580] sm:p-[2px] p-[1px] px-[6px] sm:px-2  font-sans text-white text-xs align-middle">
            {totalItems} </span>
          )}
           </span>
         </Link >
         <div className="max-[450px]:hidden hover:shadow-lg">
         <WishlistButton />
         </div>

         <div className="cart flex items-center bg-white sm:gap-3 gap-2 py-2 sm:py-[15px] px-3 sm:px-4 rounded-lg hover:shadow-lg">
          <span className="text-gray-500 sm:text-base text-sm">Sign In</span>
         </div>
                <div className="md:hidden block">
         <Sheet>
              <SheetTrigger><FiMenu className="size-8 " /></SheetTrigger>
              <SheetContent className="flex justify-center gap-4 items-center">
                <SheetHeader className="flex  flex-col items-center">
                  <SheetTitle><Link href="/" className={` hover:text-[#007580] text-xl font-medium ${currentPath === '/' ? ' text-[#007580]' : ''}`} >Home</Link></SheetTitle>
                  <SheetTitle> <Link href="/about" className={` hover:text-[#007580] text-xl font-medium ${currentPath === '/about' ? ' text-[#007580]' : ''}`}>About</Link></SheetTitle>
                  <SheetTitle><Link href="/products" className={` hover:text-[#007580] text-xl font-medium ${currentPath === '/products' ? ' text-[#007580]' : ''}`}>Product</Link></SheetTitle>
                  <SheetTitle><Link href="/cart" className={` hover:text-[#007580] text-xl flex justify-center gap-2 items-center font-medium ${currentPath === '/cart' ? ' text-[#007580]' : ''}`}>Cart <BsCartDash className="size-8 text-gray-500"/></Link></SheetTitle>
                  <SheetTitle><Link href="/wishlist" className={` hover:text-[#007580] text-xl flex justify-center gap-2 items-center font-medium ${currentPath === '/wishlist' ? ' text-[#007580]' : ''}`}>Wishlist <WishlistButton/> </Link></SheetTitle>
                  <div >
                     <Link href="/contact" className="flex gap-2"> <HiPhone className="size-6"/> <span className='ml-2 text-xl text-[#272343]'>(808) 555-0111</span></Link>
                  </div>
                </SheetHeader>
              </SheetContent>
            </Sheet>
         </div>
        </div>

        </div>
    </div>
  )
}

export default CartHeader