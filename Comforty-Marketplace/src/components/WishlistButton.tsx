import Link from "next/link";
import { useWishlist } from "@/app/context/WhishlistContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const WishlistButton = () => {
  const { wishlist } = useWishlist(); // Access wishlist state

  return (
    <Link
      href="/wishlist"
      className="wishlist flex items-center bg-white sm:gap-3 gap-2 py-[3px] sm:py-[11px] px-2 sm:px-4 rounded-lg "
    >
      {/* Icon changes dynamically based on wishlist items */}
      {/* <span className="sm:text-base text-sm"> Wishlist </span> */}
      <span>
        {wishlist.length > 0 ? (
          <AiFillHeart className="text-[#007580]  sm:size-8 size-7 max-[400px]:size-6" />
        ) : (
          <AiOutlineHeart className="text-gray-500  sm:size-8 size-7 max-[400px]:size-6" />
        )}
      </span>
    </Link>
  );
};

export default WishlistButton;
