// // app/products/[slug]/page.tsx (Server-side)
// import { FC } from "react";
// import { client } from "@/sanity/lib/client";
// import ProductDetail from "@/components/ProductDetail";
// import SinglePagePromotion from "@/components/SinglePagePromotion";

// interface Product {
//   slug: { current: string };
//   title: string;
//   price: number;
//   priceWithoutDiscount: number;
//   badge: string;
//   color: string;
//   imageUrl: string;
//   description: string;
//   inventory: number;
//   category: { title: string };
// }

// const getProduct = async (slug: string): Promise<Product | null> => {
//   try {
//     const products = await client.fetch(`*[_type == "products"] {
//       title,
//       "slug" : slug.current,
//       price,
//       priceWithoutDiscount,
//       badge,
//       color,
//       "imageUrl": image.asset->url,
//       category->{
//         title
//       },
//       description,
//       inventory,
//       tags,
//     }`);
    
//     const foundProduct = products.find((prod: any) => prod.slug === slug);
//     return foundProduct || null;
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     return null;
//   }
// };

// const ProductLink: FC<{ params: { slug: string } }> = async ({ params }) => {
//   const product = await getProduct(params.slug); // Fetch product on the server side
  
//   if (!product) {
//     return <p>Product not found!</p>;
//   }

//   return (
//     <div>
//       <ProductDetail product={product} />
//       <SinglePagePromotion category={product.category.title}/>
//     </div>
//   )
//   ;
// };

// export default ProductLink;

// app/products/[slug]/page.tsx
import { FC, Suspense } from "react";
import { client } from "@/sanity/lib/client";
import ProductDetail from "@/components/ProductDetail";
import SinglePagePromotion from "@/components/SinglePagePromotion";

interface Product {
  slug: { current: string };
  title: string;
  price: number;
  priceWithoutDiscount: number;
  badge: string;
  color: string;
  imageUrl: string;
  description: string;
  inventory: number;
  category: { title: string };
}

const getProduct = async (slug: string): Promise<Product | null> => {
  try {
    const products = await client.fetch(`*[_type == "products"] {
      title,
      "slug" : slug.current,
      price,
      priceWithoutDiscount,
      badge,
      color,
      "imageUrl": image.asset->url,
      category->{
        title
      },
      description,
      inventory,
      tags,
    }`);
    
    const foundProduct = products.find((prod: any) => prod.slug === slug);
    return foundProduct || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

const ProductLink: FC<{ params: { slug: string } }> = async ({ params }) => {
  const product = await getProduct(params.slug); // Fetch product on the server side
  
  if (!product) {
    return <p>Product not found!</p>;
  }

  // Fetch all products for category filter
  const allProducts = await client.fetch(`*[_type == "products"] {
    title,
    "slug" : slug.current,
    price,
    "imageUrl": image.asset->url,
    category->{
      title
    },
    description,
    inventory
  }`);

  return (
    <div>
     <Suspense>
     <ProductDetail product={product} products={allProducts} />
     </Suspense>
      <Suspense>
      <SinglePagePromotion category={product.category.title} />
      </Suspense>
    </div>
  );
};

export default ProductLink;


