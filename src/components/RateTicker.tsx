import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatMoney, getEffectiveRatePerGram } from '../utils/pricing';

export const RateTicker: React.FC = () => {
  const { rates, updateRates, simulateMarketTick } = useStore();
  const [showOverride, setShowOverride] = useState(false);

  const gold24 = getEffectiveRatePerGram('24K', rates);
  const gold22 = getEffectiveRatePerGram('22K', rates);
  const gold18 = getEffectiveRatePerGram('18K', rates);
  const silver = getEffectiveRatePerGram('Silver', rates);

  return (
    <section className="rounded-2xl border border-amber-500/25 bg-slate-900/80 p-4 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="inline-flex items-center gap-2 font-semibold text-amber-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Live Market Rates
          </span>
          <span>
            <strong className="text-slate-300">24K:</strong>{' '}
            <span className="font-mono text-amber-300">{formatMoney(gold24, rates.currencySymbol)}/g</span>
          </span>
          <span>
            <strong className="text-slate-300">22K:</strong>{' '}
            <span className="font-mono text-amber-300">{formatMoney(gold22, rates.currencySymbol)}/g</span>
          </span>
          <span>
            <strong className="text-slate-300">18K:</strong>{' '}
            <span className="font-mono text-amber-300">{formatMoney(gold18, rates.currencySymbol)}/g</span>
          </span>
          <span>
            <strong className="text-slate-300">Silver (999):</strong>{' '}
            <span className="font-mono text-slate-200">{formatMoney(silver, rates.currencySymbol)}/g</span>
          </span>
          <span className="text-xs text-slate-400">Updated {rates.lastUpdated}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={simulateMarketTick}
            className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-300 hover:bg-amber-500/20"
          >
            Simulate Tick
          </button>
          <button
            type="button"
            onClick={() => setShowOverride((prev) => !prev)}
            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700"
          >
            {showOverride ? 'Hide Override' : 'Manual Override'}
          </button>
        </div>
      </div>

      {showOverride && (
        <div className="mt-4 grid gap-4 border-t border-slate-800 pt-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-xs text-slate-300">
            24K Gold Rate (per gram)
            <input
              type="number"
              min={1000}
              step={10}
              value={rates.gold24KPerGram}
              onChange={(e) => updateRates({ gold24KPerGram: Number(e.target.value) || 0 })}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-sm text-amber-300 focus:border-amber-400 focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs text-slate-300">
            999 Silver Rate (per gram)
            <input
              type="number"
              min={10}
              step={1}
              value={rates.silverPerGram}
              onChange={(e) => updateRates({ silverPerGram: Number(e.target.value) || 0 })}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-sm text-slate-100 focus:border-amber-400 focus:outline-none"
            />
          </label>
        </div>
      )}
    </section>
  );
};
