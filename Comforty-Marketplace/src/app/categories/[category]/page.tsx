import { client } from "@/sanity/lib/client";
import CategoryProducts from "@/components/CategoryProducts"

// Fetch products for a specific category
const getCategoryProducts = async (category: string) => {
  const decodedCategory = decodeURIComponent(category);
  const products = await client.fetch(
    `*[_type == "products" && category->title == $category] {
      title,
      price,
      "imageUrl": image.asset->url,
      "slug": slug.current
    }`,
    { category: decodedCategory }
  );
  return products;
};

// Server-side component
const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const products = await getCategoryProducts(params.category);

  return (
    <CategoryProducts
      products={products}
      category={decodeURIComponent(params.category)}
    />
  );
};

export default CategoryPage;


