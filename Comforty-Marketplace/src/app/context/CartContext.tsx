"use client";
import Cookies from 'js-cookie';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';

interface CartItem {
  color: string;
  slug? : string ;
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Initialize cart from cookies after component is hydrated
  useEffect(() => {
    const storedCart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : [];
    setCart(storedCart);
  }, []);




  // Add to Cart
const addToCart = (product: CartItem) => {
  console.log("Adding to cart:", product.id);

  let toastMessage = ""; // Initialize toast message
  let toastType = ""; // Initialize toast type (success or info)

  setCart((prev) => {
    const existing = prev.find((item) => item.id === product.id);
    const updatedCart = existing
      ? prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...prev, { ...product, quantity: 1 }];

    Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 });

    // Determine the toast message and type
    if (existing) {
      toastMessage = `Quantity updated for ${product.title}`;
      toastType = "info";
    } else {
      toastMessage = `${product.title} has been added to the cart!`;
      toastType = "success";
    }

    return updatedCart;
  });

  // Call toast once outside setCart
  if (toastType === "success") {
    toast.success(toastMessage, {
      position: "bottom-right",
      autoClose: 3000,
    });
  } else if (toastType === "info") {
    toast.info(toastMessage, {
      position: "bottom-right",
      autoClose: 3000,
    });
  }

  console.log("Item processed");
};

  
  
  

  // Update cart quantity
  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) => {
      const updatedCart = prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      );
      Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 });
      return updatedCart;
    });
  };

  // Remove from cart
  const removeFromCart = (id: string) => {
    const itemToRemove = cart.find((item) => item.id === id); // Assuming `cart` is available in scope
    if (itemToRemove) {
      toast.error(`${itemToRemove.title} removed from cart!`, {
        position: "bottom-right", // Toast position
        autoClose: 3000,         // Auto-close after 3 seconds
      });
    }
  
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart); // Update cart state
    Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 }); // Update cookies
    console.log("Removing from cart:", itemToRemove?.title);
  };
  

  // Clear cart
  const clearCart = () => {
    setCart([]);  // Clear the state
    Cookies.remove('cart');  // Remove cart from cookies
  };

  // Calculate total items in the cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};


// "use client";
// import Cookies from 'js-cookie';
// import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { toast } from 'react-toastify';

// interface CartItem {
//   color: string;
//   slug?: string;
//   id: string;
//   title: string;
//   price: number;
//   quantity: number;
//   imageUrl: string;
// }

// interface CartContextProps {
//   cart: CartItem[];
//   addToCart: (product: CartItem) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//   removeFromCart: (id: string) => void;
//   clearCart: () => void;
//   totalItems: number;
// }

// const CartContext = createContext<CartContextProps | undefined>(undefined);

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   // Initialize cart from cookies after component is hydrated
//   useEffect(() => {
//     const storedCart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : [];
//     setCart(storedCart);
//   }, []);

//   // Add to cart
//   const addToCart = (product: CartItem) => {
//     setCart((prev) => {
//       const existing = prev.find((item) => item.id === product.id);
//       const updatedCart = existing
//         ? prev.map((item) =>
//             item.id === product.id
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           )
//         : [...prev, { ...product, quantity: 1 }];

//       Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 });

//       // Avoid duplicate toast notifications
//       toast.dismiss();

//       // Show success message
//       if (!existing) {
//         toast.success(`${product.title} added to cart!`, {
//           position: "bottom-right",
//           autoClose: 3000,
//           theme: "colored",
//         });
//         console.log("Added to cart:", product.id);
//       } else {
//         toast.success(`${product.title} quantity updated in cart!`, {
//           position: "bottom-right",
//           autoClose: 3000,
//           theme: "colored",
//         });
//         console.log("Quantity updated for:", product.id);
//       }

//       return updatedCart;
//     });
//   };

//   // Update cart quantity
//   const updateQuantity = (id: string, quantity: number) => {
//     setCart((prev) => {
//       const updatedCart = prev.map((item) =>
//         item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
//       );
//       Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 });

//       // Avoid duplicate toast notifications
//       toast.dismiss();

//       // Show success message
//       toast.success(`Cart quantity updated!`, {
//         position: "bottom-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//       console.log("Updated quantity for:", id);

//       return updatedCart;
//     });
//   };

//   // Remove from cart
//   const removeFromCart = (id: string) => {
//     setCart((prev) => {
//       const itemToRemove = prev.find((item) => item.id === id);
//       const updatedCart = prev.filter((item) => item.id !== id);
  
//       // Update cookies
//       Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 });
  
//       // Show toast notification after state update
//       if (itemToRemove) {
//         setTimeout(() => {
//           toast.success(`${itemToRemove.title} removed from cart!`, {
//             position: "bottom-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         }, 0);
//       } else {
//         setTimeout(() => {
//           toast.error("Item not found in cart!", {
//             position: "bottom-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         }, 0);
//       }
//       console.log("Item removed form cart")
  
//       return updatedCart;
//     });
//   };
  

//   // Clear cart
//   const clearCart = () => {
//     setCart([]); // Clear the state
//     Cookies.remove('cart'); // Remove cart from cookies
//     console.log("Cart cleared.");
//   };

//   // Calculate total items in the cart
//   const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, totalItems }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error("useCart must be used within a CartProvider");
//   return context;
// };
