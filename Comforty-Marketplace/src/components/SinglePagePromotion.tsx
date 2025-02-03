import { client } from "@/sanity/lib/client";
import Link from "next/link";

const SinglePagePromotion = async ({ category }: { category: string }) => {
  const featuredProducts = await client.fetch(
    `*[_type == "products" && category->title == $category]{
      "slug" : slug.current,
      title,
      price,
      "imageUrl": image.asset->url
    }`,
    { category }
  );

  return (
    <div className="lg:mx-20 sm:mx-10 mx-3 lg:mt-10 mt-5 mb-10 lg:mb-24">
      <div className="head flex md:flex-row flex-col gap-3 justify-between items-center">
        <h3 className="uppercase lg:text-[28px] text-[18px] font-bold text-black">
          Featured Products
        </h3>
        <Link
          href="/products"
          className="text-black font-bold lg:text-[18px] text-sm lg:border-b-2 border-b lg:pb-1 border-black "
        >
          View All
        </Link>
      </div>
      <div className="images mt-12 gap-5 overflow-x-scroll scrollbar-hide flex">
        {featuredProducts.map((prod: any) => (
          <Link href={`/products/${prod.slug}`} key={prod.slug}>
            <div className="w-[330px] h-[260px] hover:drop-shadow-md">
              <img
                src={prod.imageUrl}
                alt={prod.title}
                className="rounded-lg w-[320px] h-[250px]"
              />
            </div>
            <div className="flex text-[#272343] justify-between mt-3">
              <span className="font-medium text-xl">{prod.title}</span>
              <span className="font-bold text-lg">${prod.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SinglePagePromotion;
