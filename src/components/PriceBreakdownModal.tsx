import React from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { calculatePriceBreakdown, formatMoney } from '../utils/pricing';

interface PriceBreakdownModalProps {
  product: Product | null;
  onClose: () => void;
}

export const PriceBreakdownModal: React.FC<PriceBreakdownModalProps> = ({ product, onClose }) => {
  const { rates, addToCart } = useStore();

  if (!product) {
    return null;
  }

  const breakdown = calculatePriceBreakdown(product, rates);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="breakdown-title"
    >
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-amber-400">
              {product.purity} · {product.weightGrams}g
            </p>
            <h2 id="breakdown-title" className="mt-1 text-lg font-semibold text-white">
              {product.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            ✕
          </button>
        </div>

        <dl className="mt-5 space-y-2.5 border-y border-slate-800 py-4 text-sm">
          <div className="flex justify-between text-slate-300">
            <dt>
              Effective {product.purity} Rate ({product.purity === 'Silver' ? '1.00x' : `${breakdown.purityMultiplier}x`} base)
            </dt>
            <dd className="font-mono">{formatMoney(breakdown.effectiveRatePerGram, rates.currencySymbol)}/g</dd>
          </div>
          <div className="flex justify-between text-slate-300">
            <dt>Metal Value ({product.weightGrams}g)</dt>
            <dd className="font-mono">{formatMoney(breakdown.metalValue, rates.currencySymbol)}</dd>
          </div>
          <div className="flex justify-between text-slate-300">
            <dt>Making Charges</dt>
            <dd className="font-mono">{formatMoney(breakdown.makingCharges, rates.currencySymbol)}</dd>
          </div>
          <div className="flex justify-between text-slate-300">
            <dt>Gemstone Value</dt>
            <dd className="font-mono">{formatMoney(breakdown.gemstoneValue, rates.currencySymbol)}</dd>
          </div>
          <div className="flex justify-between border-t border-slate-800 pt-2 text-slate-200">
            <dt>Subtotal</dt>
            <dd className="font-mono">{formatMoney(breakdown.subtotal, rates.currencySymbol)}</dd>
          </div>
          <div className="flex justify-between text-slate-300">
            <dt>GST (3%)</dt>
            <dd className="font-mono">{formatMoney(breakdown.gstAmount, rates.currencySymbol)}</dd>
          </div>
          <div className="flex justify-between border-t border-slate-800 pt-2 text-base font-semibold text-amber-300">
            <dt>Final Price</dt>
            <dd className="font-mono">{formatMoney(breakdown.finalPrice, rates.currencySymbol)}</dd>
          </div>
        </dl>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              addToCart(product);
              onClose();
            }}
            className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-400"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
