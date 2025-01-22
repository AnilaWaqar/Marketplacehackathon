"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import { client } from '../../../sanity/lib/client';


export default function Feature() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "product" && slug.current in ["0", "1", "2", "3"]]{
        title,
        price,
        stock,
        slug,
        "imageUrl": image.asset->url
      }`;

      const data = await client.fetch(query);
      setProducts(data);
    };

    fetchData();
  }, []);

  return (
    <div className="px-4 sm:px-8 md:px-48 py-8 max-w-screen-2xl m-auto">
      <div>
        <h1 className="text-2xl font-bold mb-4 pl-4">Featured Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {products.map((product:any, i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="w-full h-64 overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between w-full px-4 py-2">
                <div className="flex flex-col items-start">
                  <h2 className="font-medium text-lg mb-1">{product.title}</h2>
                  <span className="text-black text-lg font-bold">
                    ${product.price}
                  </span>
                </div>
                <div className="flex items-center">
                  <FaCartShopping className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500 cursor-pointer transition-transform duration-300 hover:scale-110" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
