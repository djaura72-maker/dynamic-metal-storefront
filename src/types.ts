export type MetalPurity = '24K' | '22K' | '18K' | 'Silver';

export interface MetalRates {
  gold24KPerGram: number; // Base 24K gold rate per gram
  silverPerGram: number;  // Base 999 silver rate per gram
  currencySymbol: string;
  lastUpdated: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Ring' | 'Necklace' | 'Bracelet' | 'Coin' | 'Earrings';
  purity: MetalPurity;
  weightGrams: number;
  makingCharges: number;
  gemstoneValue: number;
  description: string;
  badge?: string;
}

export interface PriceBreakdown {
  baseRatePerGram: number;
  purityMultiplier: number;
  effectiveRatePerGram: number;
  metalValue: number;
  makingCharges: number;
  gemstoneValue: number;
  subtotal: number;
  gstAmount: number;
  finalPrice: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
