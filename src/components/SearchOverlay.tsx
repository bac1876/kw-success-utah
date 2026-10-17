import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchOverlayContextValue {
  open: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

const SearchOverlayContext = createContext<SearchOverlayContextValue>({
  open: false,
  openSearch: () => {},
  closeSearch: () => {},
});

export const useSearchOverlay = () => useContext(SearchOverlayContext);

const CHIPS: { label: string; to: string }[] = [
  { label: "Aurora", to: "/buy?city=Aurora" },
  { label: "Naperville", to: "/buy?city=Naperville" },
  { label: "Under $500K", to: "/buy?max=500000" },
  { label: "New Construction", to: "/buy?status=New" },
  { label: "4+ Beds", to: "/buy?beds=4" },
];

export function SearchOverlayProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Reset the query when opening rather than in an effect (react-hooks/set-state-in-effect).
  const openSearch = useCallback(() => {
    setQuery("");
    setOpen(true);
  }, []);
  const closeSearch = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 350);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeSearch]);

  const submit = (q?: string) => {
    const value = (q ?? query).trim();
    closeSearch();
    navigate(value ? `/buy?q=${encodeURIComponent(value)}` : "/buy");
  };

  return (
    <SearchOverlayContext.Provider value={{ open, openSearch, closeSearch }}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            key="search-overlay"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-[80] flex flex-col bg-ink"
          >
            <button
              type="button"
              aria-label="Close search"
              onClick={closeSearch}
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center border border-copper/40 text-copper transition-colors hover:bg-copper hover:text-ink md:right-10 md:top-8"
            >
              <X className="h-5 w-5" strokeWidth={1.25} />
            </button>
            <div className="container-monogram flex flex-1 flex-col items-center justify-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="w-full max-w-3xl"
              >
                <h2 className="type-display-md text-ivory">
                  Where does your next chapter begin?
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                  }}
                  className="mt-12"
                >
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="City, neighborhood, or address…"
                    className="w-full border-b border-copper/50 bg-transparent pb-4 text-center font-sans text-[2rem] font-light text-white caret-copper outline-none transition-colors placeholder:text-stone-dark/60 focus:border-copper"
                  />
                </form>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                  {CHIPS.map((chip) => (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={() => {
                        closeSearch();
                        navigate(chip.to);
                      }}
                      className="rounded-full border border-copper/50 px-5 py-2 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-copper transition-colors hover:bg-copper hover:text-ink"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
                <p className="type-body-sm mt-12 text-stone-dark">
                  Press Enter to search · Esc to close
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SearchOverlayContext.Provider>
  );
}
