import { useState, useEffect, useCallback } from 'react';
import { userService } from '../services/userService';
import type { User } from '../types/User';

const CACHE_KEY = 'users_cache';

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await userService.getAllUsers();
            setUsers(data);
            localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur inconnue');

            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                try {
                    const cachedUsers = JSON.parse(cached);
                    setUsers(cachedUsers);
                    setError('Mode hors ligne - Données du cache 📦');
                } catch (parseErr) {
                    console.error('Erreur parsing cache:', parseErr);
                }
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    return {
        users,
        loading,
        error,
        reload: loadUsers
    };
}

