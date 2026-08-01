import { useState, useEffect, useRef } from "react";

type Auctioneer = {
  id: number;
  company_name: string;
  contact_person?: string;
};

export default function AuctioneerAutocomplete({ onSelect }: { onSelect: (a: Auctioneer) => void }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Auctioneer[]>([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (timer.current) window.clearTimeout(timer.current);
    if (!q) return setResults([]);
    timer.current = window.setTimeout(() => {
      setLoading(true);
      import("@/lib/api").then(({ Api }) => {
        Api.get(`/api/auctioneers/?search=${encodeURIComponent(q)}`)
          .then((data: any) => {
            const items = data.results ?? data;
            setResults(items);
          })
          .catch(() => setResults([]))
          .finally(() => setLoading(false));
      });
    }, 300);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [q]);

  return (
    <div className="relative">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search auctioneers..."
        className="w-full px-3 py-2 border border-outline-variant rounded"
      />
      {q && (
        <div className="absolute z-20 left-0 right-0 mt-1 bg-surface rounded shadow-md max-h-60 overflow-auto">
          {loading ? (
            <div className="p-2 text-center text-sm">Searching...</div>
          ) : results.length === 0 ? (
            <div className="p-2 text-sm text-on-surface-variant">No results</div>
          ) : (
            results.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  onSelect(r);
                  setQ("");
                  setResults([]);
                }}
                className="w-full text-left px-3 py-2 hover:bg-surface-container-high"
              >
                <div className="font-medium">{r.company_name}</div>
                <div className="text-[12px] text-on-surface-variant">{r.contact_person}</div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
