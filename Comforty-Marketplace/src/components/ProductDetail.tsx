'use client';

import { useCart } from "@/app/context/CartContext";
import { FC } from "react";
import { useState } from "react";
import { BsCartDash } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import WishlistIcon from "./WishlistIcon";


const ProductDetail: FC<{ product: any; products: any[] }> = ({ product, products }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryProducts, setCategoryProducts] = useState<any[]>([]);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.slug,
      title: product.title,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
      color: ""
    });
  };

  const [currentIndex, setCurrentIndex] = useState(0); 

  const openModal = () => {
    const filteredCategoryProducts = products.filter(
      (item) =>
        item.category?.title === product.category?.title &&
        item.slug !== product.slug
    );
    setCategoryProducts(filteredCategoryProducts);
    setIsModalOpen(true);
    setCurrentIndex(0); // Reset index when modal opens
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < categoryProducts.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : categoryProducts.length - 1
    );
  };
  

  return (
    <main>
      <div>
        <div className="flex md:flex-row flex-col mt-5 gap-10 lg:gap-5 lg:p-10 p-3 mx-3 ">
          <div className="md:w-1/2 mx-auto">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="rounded-2xl object-cover w-[260px] h-[260px] hover:drop-shadow-xl sm:w-full sm:h-full"
            />
          </div>
          <div className="md:w-1/2 flex flex-col mx-5 lg:mx-14">
            <div className="lg:pb-10 pb-5 border-b border-[#D9D9D9]">
              <h2 className="lg:text-5xl text-2xl md:text-4xl text-[#272343] font-bold mb-4">{product.title}</h2>
              {/* <span className="w-fit rounded-2xl md:text-lg text-sm px-2 md:px-3.5 py-3  text-white bg-[#029FAE]">${product.price}.00 USD</span>
              {product.priceWithoutDiscount && (
              <del className="ml-1 md:text-base w-fit rounded-2xl text-sm px-2 md:px-3.5 py-3 text-white bg-[#9A9CAA]">${product.priceWithoutDiscount}.00 USD</del>
                      )} */}
                {/* <div className="mb-3"><FaStar /></div> */}
               <span className="lg:text-3xl text-lg text-[#272343] font-medium "><span className="text-4xl">$</span> {product.price}.00 USD</span> 
               {product.priceWithoutDiscount && (
              <del className="ml-2 lg:text-lg text-[#9A9CAA] ">${product.priceWithoutDiscount}.00 USD</del>
                      )}
            </div>
            <div className="mt-3">
              <p className="text-[#272343]/60 tracking-wide text-sm md:text-lg">{product.description}</p>
            <div className="flex gap-2 items-center">
            <button
                onClick={handleAddToCart}
                className="w-fit rounded-lg md:mt-5 mt-2 md:px-4 px-2 items-center md:gap-3 gap-1 py-2 md:py-3 text-white bg-[#029FAE] hover:bg-[#007580] flex">
                <BsCartDash className="size-5" /> Add to Cart
              </button>
              <div className=" rounded-lg size-4 ">
                     <WishlistIcon product={{ ...product, id: product.slug || "default-id" }} />
              </div>
            </div>
            </div>
            {/* Open modal button */}
            <button
              onClick={openModal}
              className="w-fit rounded-lg md:mt-5 mt-2 md:px-4 px-2 items-center md:gap-3 gap-1 py-2 md:py-3 text-white bg-[#029FAE] hover:bg-[#007580] flex">
              Compare Products
            </button>
          </div>
        </div>
      </div>



{/* Modal */}
{isModalOpen && (
  <div className="modal-backdrop" onClick={closeModal}>
    <div className="modal flex flex-col" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header flex items-center justify-between">
        <h3 className="sm:text-4xl text-3xl text-[#272343] font-semibold ">Compare Products</h3>
        <button onClick={closeModal} className="text-2xl text-[#272343] font-semibold border-2 px-2 py-1 rounded-sm">X</button>
      </div>

      <div className="modal-content justify-center items-center flex sm:flex-row  ">
        {/* Current Product */}
        <div className="modal-left w-1/2">
          <h4 className="text-xl text-[#272343] my-2"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2, // Limit title to 2 lines
            overflow: "hidden",
          }}
          >Current Product</h4>
          <img src={product.imageUrl} alt={product.title} className="md:w-[380px] sm:w-[100px] w-[100px] md:h-[300px] rounded-lg"/>
          <p className="text-[#272343]/60 pr-8 py-2 hidden md:block tracking-wide">{product.description}</p>
          <p className="text-white bg-[#272343]/90 rounded-sm w-fit text-lg py-1 px-4">Price: ${product.price}</p>
        </div>
        {/* Sliding Other Products */}
        <div className="modal-right w-1/2">
          {categoryProducts.length > 0 && (
            <div className="slider">
              <div
                className="slide"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  transition: "transform 0.5s ease-in-out",
                }}
              >
                {categoryProducts.map((item, index) => (
                  <div
                    key={index}
                    className="product-card w-full flex flex-col justify-end"
                  >
                     <h4 className="text-xl text-[#272343] text-left my-2"
                     style={{
                      // display: "-webkit-box",
                      // WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2, // Limit title to 2 lines
                      overflow: "hidden",
                    }}
                     >{item.title}</h4>
                    <img src={item.imageUrl} alt={item.title} className="md:w-[380px] sm:w-[300px] w-[150px] md:h-[300px] rounded-lg"/>
                    <p className="text-[#272343]/60 text-left pr-6 hidden md:block py-2 tracking-wide">{item.description}</p>
                    <p className="text-white bg-[#272343]/90 rounded-sm w-fit text-lg py-1 px-4">Price: ${item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Pagination Buttons */}
      <div className="flex gap-3 mt-4 text-white justify-end">
           <button className="md:p-3 p-2 bg-[#029fae] hover:bg-[#027d8f] cursor-pointer rounded-full" onClick={handlePrevious} ><GoArrowLeft className="md:size-7 size-6 "/></button>    
           <button className="md:p-3 p-2 bg-[#029fae] hover:bg-[#027d8f] cursor-pointer rounded-full" onClick={handleNext} ><GoArrowRight className="md:size-7 size-6  "/></button>    
        </div>
    </div>
  </div>
)}
</main>
    
  );
};

export default ProductDetail;







