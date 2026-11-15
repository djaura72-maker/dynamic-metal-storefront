import React, { createContext, useContext, useMemo, useState } from 'react';
import { INITIAL_PRODUCTS } from '../data/products';
import { CartItem, MetalRates, Product } from '../types';
import { calculatePriceBreakdown } from '../utils/pricing';

interface StoreContextValue {
  rates: MetalRates;
  updateRates: (partial: Partial<Pick<MetalRates, 'gold24KPerGram' | 'silverPerGram'>>) => void;
  simulateMarketTick: () => void;
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const DEFAULT_RATES: MetalRates = {
  gold24KPerGram: 7850,
  silverPerGram: 94,
  currencySymbol: '₹',
  lastUpdated: new Date().toLocaleTimeString(),
};

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rates, setRates] = useState<MetalRates>(DEFAULT_RATES);
  const [cart, setCart] = useState<CartItem[]>([]);

  const updateRates = (partial: Partial<Pick<MetalRates, 'gold24KPerGram' | 'silverPerGram'>>) => {
    setRates((prev) => ({
      ...prev,
      ...partial,
      lastUpdated: new Date().toLocaleTimeString(),
    }));
  };

  const simulateMarketTick = () => {
    setRates((prev) => {
      const goldDelta = Math.round((Math.random() - 0.48) * 60);
      const silverDelta = Number(((Math.random() - 0.48) * 1.5).toFixed(2));
      return {
        ...prev,
        gold24KPerGram: Math.max(1000, prev.gold24KPerGram + goldDelta),
        silverPerGram: Math.max(10, Number((prev.silverPerGram + silverDelta).toFixed(2))),
        lastUpdated: new Date().toLocaleTimeString(),
      };
    });
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const cartTotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const { finalPrice } = calculatePriceBreakdown(item.product, rates);
        return sum + finalPrice * item.quantity;
      }, 0),
    [cart, rates],
  );

  return (
    <StoreContext.Provider
      value={{
        rates,
        updateRates,
        simulateMarketTick,
        products: INITIAL_PRODUCTS,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used inside a StoreProvider');
  }
  return ctx;
}
