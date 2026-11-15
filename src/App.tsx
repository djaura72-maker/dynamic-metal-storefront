import React from 'react';
import { AiGiftNote } from './components/AiGiftNote';
import { Cart } from './components/Cart';
import { ProductCatalog } from './components/ProductCatalog';
import { RateTicker } from './components/RateTicker';
import { StoreProvider, useStore } from './context/StoreContext';

const StorefrontLayout: React.FC = () => {
  const { cartCount } = useStore();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-amber-400">
              Dynamic Metal Storefront
            </h1>
            <p className="text-xs text-slate-400">
              Real-time precious-metal pricing · 24K / 22K / 18K / Silver + 3% GST
            </p>
          </div>
          <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-200">
            Cart ({cartCount})
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        <RateTicker />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ProductCatalog />
          </div>
          <div className="space-y-6">
            <Cart />
            <AiGiftNote />
          </div>
        </div>
      </main>
    </div>
  );
};

export const App: React.FC = () => (
  <StoreProvider>
    <StorefrontLayout />
  </StoreProvider>
);

export default App;
