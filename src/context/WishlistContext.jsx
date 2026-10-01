import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('serendib_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem('serendib_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const toggleWishlist = (item) => {
    setWishlist(prev => {
      const exists = prev.some(i => i.id === item.id);
      if (exists) {
        showToast(`Removed from Private Vault Wishlist`, "info");
        return prev.filter(i => i.id !== item.id);
      } else {
        showToast(`Saved to Private Vault Wishlist`, "favorite");
        return [...prev, item];
      }
    });
  };

  const isInWishlist = (id) => wishlist.some(i => i.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, wishlistCount: wishlist.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
