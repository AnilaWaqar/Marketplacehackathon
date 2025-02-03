import Categories from "@/app/categories/page";
import Companies from "@/components/Companies";
import ExplorePage from "@/components/ExplorePage";
import FeaturedProduct from "@/components/FeaturedProduct";
import Hero from "@/components/Hero";
import OurProduct from "@/components/OurProduct";
import Transition from "@/components/Transition";
import { client } from "@/sanity/lib/client";
import { Suspense } from "react";


export default async function Home() {

  const Featuredproducts = await client.fetch(`*[_type == "products" && "featured" in tags] {
    "slug":slug.current,
    title,
    price,
    priceWithoutDiscount,
    badge,
    color,
    "imageUrl": image.asset->url,
  }
  `);
  const Products = await client.fetch(`*[_type == "products"][0...8]{
    "slug":slug.current,
    title,
    price,
    priceWithoutDiscount,
    badge,
    color,
    "imageUrl": image.asset->url,
    } `)
  return (
    <main>     
     <Suspense>
      <Hero />
     </Suspense>
     <Suspense>
     <Companies />
     </Suspense>      
      <Suspense>
      <FeaturedProduct Featuredproducts={Featuredproducts} />
      </Suspense>
      <Suspense>
      <Categories />
      </Suspense>
      <Suspense>
      <ExplorePage/>
      </Suspense>
      <Suspense>
      <OurProduct Products = {Products}/>
      </Suspense>
    </main>
  );
}
