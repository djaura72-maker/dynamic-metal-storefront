import React, { useMemo, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MetalPurity, Product } from '../types';
import { calculatePriceBreakdown, formatMoney } from '../utils/pricing';
import { PriceBreakdownModal } from './PriceBreakdownModal';

const PURITY_FILTERS: Array<'All' | MetalPurity> = ['All', '24K', '22K', '18K', 'Silver'];

export const ProductCatalog: React.FC = () => {
  const { products, rates, addToCart } = useStore();
  const [filter, setFilter] = useState<'All' | MetalPurity>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const visibleProducts = useMemo(
    () => (filter === 'All' ? products : products.filter((p) => p.purity === filter)),
    [filter, products],
  );

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-white">Dynamic Metal Catalog</h2>
        <div className="flex flex-wrap gap-2">
          {PURITY_FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-full px-3.5 py-1 text-xs font-medium transition ${
                filter === item
                  ? 'bg-amber-500 text-slate-950'
                  : 'border border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {visibleProducts.map((product) => {
          const breakdown = calculatePriceBreakdown(product, rates);
          return (
            <article
              key={product.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:border-amber-500/40"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs font-medium text-amber-300">
                    {product.purity} · {product.weightGrams}g
                  </span>
                  {product.badge && (
                    <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs text-emerald-300">
                      {product.badge}
                    </span>
                  )}
                </div>

                <h3 className="mt-3 text-base font-semibold text-white">{product.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{product.description}</p>
              </div>

              <div className="mt-5 border-t border-slate-800 pt-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-400">Live Price (incl. 3% GST)</span>
                  <span className="font-mono text-lg font-bold text-amber-300">
                    {formatMoney(breakdown.finalPrice, rates.currencySymbol)}
                  </span>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(product)}
                    className="flex-1 rounded-xl border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800"
                  >
                    Price Breakdown
                  </button>
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="flex-1 rounded-xl bg-amber-500 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-400"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <PriceBreakdownModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
};
