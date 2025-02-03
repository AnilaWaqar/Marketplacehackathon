# Comforty Marketplace Project 












import { client } from "@/sanity/lib/client"
import Link from "next/link"
import { BsCartDash } from "react-icons/bs"

const AllProduct = async () => {

const products = await client.fetch(`*[_type == "products"]{       
  "slug":slug.current,
  title,
  price,
  priceWithoutDiscount,
  badge,
  color,
  "imageUrl": image.asset->url, }`)
 const repeatedProducts = [...products, ...products.slice(0, 16 - products.length)];

  return (
    <div className='lg:mx-20 mx-3 sm:mx-10 mb-40'>
    <div>
        <h2 className='text-[#272343] lg:text-[32px] text-2xl mt-6  tracking-normal font-semibold text-center'>All Products</h2>
        <div className="products flex flex-wrap justify-center lg:mt-10 mt-3 gap-5 gap-y-20 lg:gap-y-28">
          {repeatedProducts.map((prod:any)=>{
           return(
            
            <div className='w-[280px] h-[280px]' key={prod.slug}>
           <div className="img relative">
           <Link href={`/products/${prod.slug}`}>
              <img src={prod.imageUrl} alt={prod.title} className="w-full h-full object-cover rounded-xl cursor-pointer" /></Link>
               {prod.color && (
                 <span
                 className="absolute top-4 left-4 rounded-lg text-sm px-3 py-1"
                 style={{ backgroundColor: prod.color, color: "white" }}
                >
                {prod.badge}
              </span>
              )}
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="text gap-[10px]">
                <h4 className="text-[#272343]">{prod.title}</h4>
                <div>
                    <span className="text-[#272343] text-[18px] font-medium">{prod.price}</span>
                    <del className="ml-1 text-[#9A9CAA]">{prod.priceWithoutDiscount}</del>
                </div>
            </div>
            <div className="cart px-3 py-2 bg-[#F0F2F3] hover:bg-[#029FAE] text-[#272343] hover:text-white rounded-lg">
              <BsCartDash  className="size-6"/>
            </div>
          </div>
         </div>          
          ) })}
        </div>
    </div>
    </div>
  )
}

export default AllProduct