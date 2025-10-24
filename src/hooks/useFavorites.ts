import { useState, useEffect, useCallback } from 'react';

const KEY = 'favorites_v1';

// Stocke les IDs sous forme de string pour être compatible avec number|string
export const useFavorites = () => {
  const [setIds, setSetIds] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? new Set<string>(JSON.parse(raw)) : new Set<string>();
    } catch (e) {
      console.warn('localStorage read failed', e);
      return new Set<string>();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(Array.from(setIds)));
    } catch (e) {
      console.warn('localStorage write failed', e);
    }
  }, [setIds]);

  const toKey = useCallback((id: string | number) => String(id), []);

  const toggle = useCallback((id: string | number) => {
    setSetIds(prev => {
      const copy = new Set(prev);
      const k = toKey(id);
      if (copy.has(k)) copy.delete(k); else copy.add(k);
      return copy;
    });
  }, [toKey]);

  const isFav = useCallback((id: string | number) => setIds.has(toKey(id)), [setIds, toKey]);

  const toggleFavorite = toggle;
  const isFavorite = isFav;

  return { favorites: setIds, toggle, isFav, toggleFavorite, isFavorite };
};
