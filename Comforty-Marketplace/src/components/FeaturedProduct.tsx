"use client"
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsCartDash } from "react-icons/bs";
import WishlistIcon from "./WishlistIcon";

const FeaturedProduct = ({ Featuredproducts }: { Featuredproducts: any[] }) => {

  // Add TO Cart 

   const { addToCart } = useCart();
  
    const handleAddToCart = (product: any) => {
      console.log("Product data:", product); // Log the entire product object
      addToCart({
        id: product.slug, // Just use product.slug if it's already the string value
        title: product.title,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrl,
        color: ""
      });
    };

  const [animatedProjects, setAnimatedProjects] = useState<string[]>([]);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]); // Ref to track elements

  useEffect(() => {
    // Creating Intersection Observer to watch elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const slug = entry.target.getAttribute("data-slug");
          if (slug) {
            setAnimatedProjects((prev) => [...prev, slug]); 
          }
        }
      });
    }, { threshold: 0.5 });

    // Attach observer to each product
    productRefs.current.forEach((product) => {
      if (product) observer.observe(product);
    });

    return () => {
      observer.disconnect(); // Clean up observer on unmount
    };
  }, [Featuredproducts]);

  return (
    <div className='lg:mx-20 sm:mx-10 mx-3 mb-16 lg:mb-52'>
      <div>
        <h2 className='text-[#272343] md:text-5xl lg:mt-20 lg:mb-16 sm:my-10 text-4xl lg:text-left text-center tracking-normal font-semibold'>
          Featured Product
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 xl:gap-10">
          {Featuredproducts.map((prod: any, index) => {
            
            return (
              <>
              {!prod.slug ? prod.slug = "no slug":(
              <div
                key={prod.slug}
                ref={(el) => {
                  // Properly assigning the ref to each product element
                  if (el) productRefs.current[index] = el;
                }}
                data-slug={prod.slug}
                className={`product md:w-[300px] sm:w-[245px] max-[400px]:w-[280px] h-[400px] mb-16 mt-5 hover:scale-105  ${
                  animatedProjects.includes(prod.slug) ? "visible" : ""
                }`}
              >
                <div className="img relative">
                  <Link href={`/products/${prod.slug}`}>
                    <img
                      src={prod.imageUrl}
                      alt={prod.title}
                      className="w-[350px] h-[320px] hover:brightness-90 rounded-md object-cover"
                    />
                  </Link>
                  {prod.color ? (
                    <span
                      className="absolute top-2 left-4 rounded-lg text-sm px-3 py-1"
                      style={{ backgroundColor: prod.color, color: "white" }}
                    >
                      {prod.badge}
                    </span>
                  ):(<div>no color</div>)}                
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="text gap-[10px]">
                    <h4 className="text-[#272343] text-xl font-semibold">{prod.title}</h4>
                    <div>
                      <span className="text-[#272343] text-xl font-medium">${prod.price}</span>
                      {prod.priceWithoutDiscount && (
                        <del className="ml-1 text-lg text-[#9A9CAA]">${prod.priceWithoutDiscount}</del>
                      )}
                    </div>
                    <div>
                      Reviews
                    </div>
                  </div>
                   <div className="absolute top-2 right-6 rounded-lg size-4 ">
                     <WishlistIcon product={{ ...prod, id: prod.slug || "default-id" }} />
                   </div>
                </div>
                 <div>
                  <button className="cart mt-3 w-full flex gap-5 py-3 items-center justify-center  bg-[#029FAE] hover:bg-[#272343] text-white rounded-lg" onClick={() => handleAddToCart(prod)}>
                    <span className="text-lg">Add To Cart</span>
                    <BsCartDash className="size-6" />
                  </button>
                 </div>

              </div>
            )}
            </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FeaturedProduct;


//  bg-[#F0F2F3]