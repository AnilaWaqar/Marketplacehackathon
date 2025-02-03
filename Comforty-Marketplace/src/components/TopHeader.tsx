import Link from "next/link";
import { FaCheck } from "react-icons/fa6";
import { IoAlertCircleOutline } from "react-icons/io5";

const TopHeader = () => {
  return (
    <div className="bg-[#272343] text-[#ffffff]/70  text-xs sm:text-sm xl:text-[13px] lg:px-20 sm:px-10 px-3 py-2 lg:py-[14px]">
       <div className="flex justify-between">
       <div className="flex gap-2 items-center">
        <span><FaCheck/></span>
        <span>Free Shipping On All Order Over $50</span>
        </div> 
        <div className="flex items-center gap-2 xl:gap-6">
            <select name="language" id="languauge" className="bg-inherit w-[47px] border-none outline-none ">
                <option value="">Eng</option>
                <option value="">Urdu</option>
                <option value="">Hindi</option>
                <option value="">Turkey</option>
            </select>
            <Link href="/FAQ">Faqs</Link>
           <div className="max-[450px]:hidden block">
           <div className="flex items-center gap-[6px]">
                <span><IoAlertCircleOutline className="size-4"/></span>
                <span>Need Help</span>
            </div>
           </div>
        </div>
       </div>
    </div>
  )
}

export default TopHeader