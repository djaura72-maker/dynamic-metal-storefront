import { MetalPurity, MetalRates, PriceBreakdown, Product } from '../types';

export const PURITY_MULTIPLIERS: Record<MetalPurity, number> = {
  '24K': 1.0,
  '22K': 0.9167,
  '18K': 0.75,
  Silver: 1.0,
};

export const GST_RATE = 0.03;

export function getEffectiveRatePerGram(purity: MetalPurity, rates: MetalRates): number {
  if (purity === 'Silver') {
    return rates.silverPerGram;
  }
  return rates.gold24KPerGram * PURITY_MULTIPLIERS[purity];
}

export function calculatePriceBreakdown(product: Product, rates: MetalRates): PriceBreakdown {
  const baseRatePerGram = product.purity === 'Silver' ? rates.silverPerGram : rates.gold24KPerGram;
  const purityMultiplier = PURITY_MULTIPLIERS[product.purity];
  const effectiveRatePerGram = baseRatePerGram * purityMultiplier;
  const metalValue = product.weightGrams * effectiveRatePerGram;
  const subtotal = metalValue + product.makingCharges + product.gemstoneValue;
  const gstAmount = subtotal * GST_RATE;
  const finalPrice = subtotal + gstAmount;

  return {
    baseRatePerGram,
    purityMultiplier,
    effectiveRatePerGram,
    metalValue,
    makingCharges: product.makingCharges,
    gemstoneValue: product.gemstoneValue,
    subtotal,
    gstAmount,
    finalPrice,
  };
}

export function formatMoney(amount: number, currencySymbol = '₹'): string {
  return `${currencySymbol}${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
