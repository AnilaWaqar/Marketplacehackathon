"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BsCartDash } from "react-icons/bs"
import Filters from "./Filters"
import Pagination from "./Pagination"
import { useCart } from "@/app/context/CartContext"

const AllProduct = ({ products }: { products: any[] }) => {

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([0, Infinity]);
  const [selectedBadge, setSelectedBadge] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
   // Pagination State
   const [currentPage, setCurrentPage] = useState(1);
   const productsPerPage = 12; // Number of products per page
   const [animatedProducts, setAnimatedProducts] = useState<string[]>([]); 

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
     console.log("item added to cart with id:", product.slug); 
   };
 
  const categories = Array.from(new Set(products.map((p) => p.category?.title || 'Unknown')));
  const handleFilter = (
    category: string,
    priceRange: [number, number],
    badge: string,
    search: string
  ) => {
    let filtered = products;

    if (category !== "All") {
      filtered = filtered.filter((p) =>
        p.category?.title?.toLowerCase() === category.toLowerCase()
      );
    }

    const [minPrice, maxPrice] = priceRange;
    filtered = filtered.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    if (badge) {
      filtered = filtered.filter((p) => p.badge === badge);
    }

    if (search) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    handleFilter(category, selectedPriceRange, selectedBadge, searchQuery);
  };

  const handlePriceFilter = (category: string, priceRange: [number, number]) => {
    setSelectedPriceRange(priceRange);
    handleFilter(category, priceRange, selectedBadge, searchQuery);
  };

  const handleBadgeChange = (badge: string) => {
    setSelectedBadge(badge);
    handleFilter(selectedCategory, selectedPriceRange, badge, searchQuery);
  };

  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
    handleFilter(selectedCategory, selectedPriceRange, selectedBadge, search);
  };

  useEffect(() => {
    handleFilter(selectedCategory, selectedPriceRange, selectedBadge, searchQuery);
  }, [selectedCategory, selectedPriceRange, selectedBadge, searchQuery , handleFilter]);


  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setAnimatedProducts([]); // Reset animations
    const timer = setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll effect
    });
  }, 100); // Delay for animation to trigger
  };

  // Apply animation on current products
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProducts(currentProducts.map((prod) => prod.slug)); // Add visible class for current products
    }, 20); // Delay for animation to trigger

    return () => clearTimeout(timer); // Cleanup
  }, [currentProducts]);
  
  
  return (
    <div className='lg:mx-20 mx-3 sm:mx-10 mb-40'>
    <div>
        <h2 className='text-[#272343] lg:text-[32px] text-2xl mt-6 md:mb-10 mb-5  tracking-normal font-semibold text-center'>All Products</h2>


       <div className="flex md:flex-row flex-col-reverse gap-4">       
        {/* Filters */}
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          selectedBadge={selectedBadge}
          onCategoryChange={handleCategoryChange}
          onPriceFilter={handlePriceFilter}
          onBadgeChange={handleBadgeChange}
        />
         {/* Search bar */}
         <div className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="px-3 py-2 border  text-[#272343] border-gray-300 outline-none rounded-md w-full"
           />
        </div>
       </div>
          
    <div className="products flex flex-wrap justify-center lg:mt-10 mt-3 gap-5 gap-y-20 lg:gap-y-28">
    {currentProducts.map((prod, index) => (
          <div
            className={`product w-[280px] h-[280px] mb-5 ${
              animatedProducts.includes(prod.slug) ? "visible" : ""
            }`}
            key={`${prod.slug}-${index}`}
          >
           <div className="img relative">
           <Link href={`/products/${prod.slug}`}>
              <img src={prod.imageUrl} alt={prod.title} className="w-[280px] h-[280px] object-cover rounded-xl cursor-pointer" /></Link>
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
                    <span className="text-[#272343] text-[18px] font-medium">${prod.price}</span>
                    {prod.priceWithoutDiscount && (
                      <del className="ml-1 text-[#9A9CAA]">${prod.priceWithoutDiscount}</del>
                    )}
                </div>
            </div>
            <button className="cart px-3 py-2 bg-[#F0F2F3] hover:bg-[#029FAE] text-[#272343] hover:text-white rounded-lg"  onClick={() => handleAddToCart(prod)}>
              <BsCartDash  className="size-6"/>
            </button>
          </div>
         </div>          
        ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        /> 
    </div>
</div>
  )
}

export default AllProduct