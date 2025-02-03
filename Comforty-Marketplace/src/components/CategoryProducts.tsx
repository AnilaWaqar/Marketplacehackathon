"use client";

import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import WishlistIcon from "./WishlistIcon";
import { BsCartDash } from "react-icons/bs";

const CategoryProducts = ({
  products,
  category,
}: {
  products: any[];
  category: string;
}) => {
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
          }, { threshold: 0.5 }); // Trigger when 50% of the element is in the viewport
      
          // Attach observer to each product
          productRefs.current.forEach((product) => {
            if (product) observer.observe(product);
          });
      
          return () => {
            observer.disconnect(); // Clean up observer on unmount
          };
        }, [products]);

        if (!products || products.length === 0) {
          return (
            <div className="text-center my-20">
              <h2>No products found for {category}!</h2>
            </div>
          );
        }

  return (
    <div className="lg:mx-20 sm:mx-10 mx-3 mb-10 lg:mb-32">
      <h2 className="text-[#272343] lg:text-[32px] text-2xl text-center font-semibold">
        {category} Products
      </h2>
      <div className="products flex md:flex-nowrap justify-center flex-wrap mt-5 gap-3 xl:gap-6">
          {products.map((prod: any, index : any) => {
            return (
              <div
                key={prod.slug}
                ref={(el) => {
                  // Properly assigning the ref to each product element
                  if (el) productRefs.current[index] = el;
                }}
                data-slug={prod.slug}
                className={`product w-[280px] h-[280px] mb-16 mt-5  ${
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
                  {prod.color && (
                    <span
                      className="absolute top-2 left-4 rounded-lg text-sm px-3 py-1"
                      style={{ backgroundColor: prod.color, color: "white" }}
                    >
                      {prod.badge}
                    </span>
                  )}                 
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
            );
          })}
        </div>
    </div>
  );
};

export default CategoryProducts;
