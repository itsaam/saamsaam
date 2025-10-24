// File: src/hooks/useFavorites.ts
        import { useState, useEffect, useCallback } from "react";

        const KEY = "favorites_v1";

        export const useFavorites = () => {
          const [setIds, setSetIds] = useState<Set<string>>(() => {
            try {
              const raw = localStorage.getItem(KEY);
              return raw ? new Set(JSON.parse(raw)) : new Set();
            } catch {
              return new Set();
            }
          });

          useEffect(() => {
            try {
              localStorage.setItem(KEY, JSON.stringify(Array.from(setIds)));
            } catch {}
          }, [setIds]);

          const toggle = useCallback((id: string) => {
            setSetIds(prev => {
              const copy = new Set(prev);
              if (copy.has(id)) copy.delete(id); else copy.add(id);
              return copy;
            });
          }, []);

          const isFav = useCallback((id: string) => setIds.has(id), [setIds]);

          return { isFav, toggle, favorites: setIds };
        };