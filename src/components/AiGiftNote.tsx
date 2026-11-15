import React, { useState } from 'react';

const OCCASIONS = ['Wedding', 'Anniversary', 'Birthday', 'Festive Gift'] as const;

export const AiGiftNote: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [occasion, setOccasion] = useState<(typeof OCCASIONS)[number]>('Anniversary');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const generateFallbackNote = (name: string, event: string) => {
    const target = name.trim() || 'you';
    return `Wishing ${target} a radiant ${event.toLowerCase()}. May this timeless piece shine as brightly as the memories we celebrate today.`;
  };

  const handleGenerate = async () => {
    setLoading(true);
    const apiKey = (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_API_KEY;

    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
      setNote(generateFallbackNote(recipient, occasion));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Write a warm, 2-sentence jewelry gift card note for ${recipient.trim() || 'a loved one'} celebrating their ${occasion}.`,
                  },
                ],
              },
            ],
          }),
        },
      );

      if (!response.ok) {
        throw new Error('API request failed');
      }
      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setNote(text ? text.trim() : generateFallbackNote(recipient, occasion));
    } catch {
      setNote(generateFallbackNote(recipient, occasion));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
      <h2 className="text-lg font-semibold text-white">AI Gift-Note Drafter</h2>
      <p className="mt-1 text-xs text-slate-400">
        Uses `VITE_API_KEY` when configured, or falls back locally offline.
      </p>

      <div className="mt-4 space-y-3">
        <input
          type="text"
          placeholder="Recipient name (optional)"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
        />

        <select
          value={occasion}
          onChange={(e) => setOccasion(e.target.value as (typeof OCCASIONS)[number])}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
        >
          {OCCASIONS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className="w-full rounded-xl border border-amber-500/40 bg-amber-500/15 py-2 text-xs font-semibold text-amber-300 hover:bg-amber-500/25 disabled:opacity-50"
        >
          {loading ? 'Drafting...' : 'Draft Gift Note'}
        </button>

        {note && (
          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs leading-relaxed text-slate-200 focus:border-amber-400 focus:outline-none"
          />
        )}
      </div>
    </section>
  );
};
