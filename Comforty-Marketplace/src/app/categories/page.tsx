import { client } from "@/sanity/lib/client";
import Link from "next/link";

const Categories = async () => {
  const categoriesProduct = await client.fetch(`
    *[_type == "categories"] {
      title,
      "imageUrl": image.asset->url, 
      products // Number of products
    }
  `);

  return (
    <div className="lg:mx-20 sm:mx-10 mx-3 mb-10 sm:mb-16 lg:mb-32">
    <div>
      <h2 className="text-[#272343] md:text-5xl lg:mt-20 lg:mb-16 sm:my-10 text-4xl text-center font-semibold">
        Top Categories
      </h2>
      <div className="flex overflow-x-auto scrollbar-hide gap-8 mt-10 pl-5 pr-5 snap-x">
        {categoriesProduct.map((cat: any, index: number) => (
          <Link href={`/categories/${cat.title}`} key={index}>
            <div className="relative w-[380px] h-[400px] flex-shrink-0 cursor-pointer snap-start">
              <img
                src={cat.imageUrl}
                alt={cat.title}
                className="rounded-lg hover:contrast-125 object-cover w-full h-full"
              />
              <div className="absolute bottom-0 w-full rounded-b-lg py-2 bg-black/70 text-white text-center">
                <h5 className="text-xl">{cat.title}</h5>
                <p className="text-white/70 text-sm">{cat.products} Products</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
  
  );
};

export default Categories;
