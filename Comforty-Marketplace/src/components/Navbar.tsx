"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const currentPath = usePathname(); 
  return (
   <div className='bg-white lg:py-8 md:px-10 py-4 lg:px-20 md:block hidden'>
     <div className=' text-[#636270] flex justify-between font-medium text-lg'>
    <nav className=' space-x-8  '>
    <Link href="/" className={` hover:text-[#007580] ${currentPath === '/' ? ' text-[#007580]' : ''}`} >Home</Link>
    {/* <Link href="/shop" className={` hover:text-[#007580] ${currentPath === '/shop' ? ' text-[#007580]' : ''}`}>Shop</Link> */}
    <Link href="/products" className={` hover:text-[#007580] ${currentPath === '/products' ? ' text-[#007580]' : ''}`}>Product</Link>
    {/* <Link href="/pages" className={` hover:text-[#007580] ${currentPath === '/pages' ? ' text-[#007580]' : ''}`}>Pages</Link> */}
    <Link href="/about" className={` hover:text-[#007580] ${currentPath === '/about' ? ' text-[#007580]' : ''}`}>About</Link>
    <Link href="/contact" className={` hover:text-[#007580] ${currentPath === '/contact' ? ' text-[#007580]' : ''}`}>Contact</Link>
    </nav>
    <div>
        <p>Contact: <span className='ml-2 text-[#272343]'>(808) 555-0111</span></p>
    </div>
    </div>
   </div>
  )
}

export default Navbar