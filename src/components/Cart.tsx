import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { calculatePriceBreakdown, formatMoney } from '../utils/pricing';

export const Cart: React.FC = () => {
  const { cart, rates, updateQuantity, removeFromCart, clearCart, cartTotal } = useStore();
  const [checkedOut, setCheckedOut] = useState(false);

  const handleCheckout = () => {
    setCheckedOut(true);
    clearCart();
  };

  return (
    <aside className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Cart & Checkout</h2>
        {cart.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="text-xs text-slate-400 hover:text-rose-400"
          >
            Clear
          </button>
        )}
      </div>

      {checkedOut && (
        <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300">
          Order summary locked at live rates! Ready for payment gateway integration.
        </div>
      )}

      {cart.length === 0 ? (
        <p className="mt-4 text-sm text-slate-400">
          Your cart is empty. Add an item to see live rate-adjusted checkout totals.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {cart.map(({ product, quantity }) => {
            const { finalPrice } = calculatePriceBreakdown(product, rates);
            return (
              <div
                key={product.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{product.name}</p>
                  <p className="text-xs text-slate-400">
                    {product.purity} · {formatMoney(finalPrice, rates.currencySymbol)} each
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="h-7 w-7 rounded-lg border border-slate-700 text-xs text-slate-200 hover:bg-slate-800"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-xs font-mono text-white">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="h-7 w-7 rounded-lg border border-slate-700 text-xs text-slate-200 hover:bg-slate-800"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                    className="ml-1 text-xs text-slate-500 hover:text-rose-400"
                    aria-label={`Remove ${product.name}`}
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}

          <div className="border-t border-slate-800 pt-3">
            <div className="flex items-center justify-between text-sm font-semibold text-white">
              <span>Total (incl. 3% GST)</span>
              <span className="font-mono text-amber-300">
                {formatMoney(cartTotal, rates.currencySymbol)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="mt-3 w-full rounded-xl bg-amber-500 py-2.5 text-sm font-semibold text-slate-950 hover:bg-amber-400"
            >
              Lock Rate & Checkout
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
