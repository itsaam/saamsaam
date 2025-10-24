import { useState, useEffect } from 'react';

export function useFavorites() {
    const [favorites, setFavorites] = useState<number[]>(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (userId: number) => {
        setFavorites(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const isFavorite = (userId: number) => favorites.includes(userId);

    return { favorites, toggleFavorite, isFavorite };
}

