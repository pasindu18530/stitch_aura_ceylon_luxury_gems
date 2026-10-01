import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('serendib_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isBagOpen, setIsBagOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem('serendib_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const addToCart = (item, options = {}) => {
    setCart(prev => {
      const itemKey = `${item.id}-${options.metal || 'standard'}-${options.size || 'standard'}`;
      const existing = prev.find(i => i.cartKey === itemKey);
      if (existing) {
        return prev.map(i =>
          i.cartKey === itemKey ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          ...item,
          cartKey: itemKey,
          quantity: 1,
          selectedMetal: options.metal || item.metal || '950 Platinum',
          selectedSize: options.size || '6.0',
          engraving: options.engraving || '',
          price: options.customPrice || item.price
        }
      ];
    });
    showToast(`Allocated to Velvet Acquisition Bag`, "success");
    setIsBagOpen(true);
  };

  const removeFromCart = (cartKey) => {
    setCart(prev => prev.filter(i => i.cartKey !== cartKey));
    showToast(`Removed from Velvet Acquisition Bag`, "info");
  };

  const updateQuantity = (cartKey, delta) => {
    setCart(prev =>
      prev
        .map(i => {
          if (i.cartKey === cartKey) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isBagOpen,
        setIsBagOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
