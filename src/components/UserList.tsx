import {useState, useEffect, useMemo} from 'react';
import UserCard from './UserCard';
import type {User} from '../types/User';
import {userService} from '../services/userService';
import { useFavorites } from './userFavorite';
import SkeletonLoader from './SkeletonLoader';
import ErrorMessage from './ErrorMessage';
import '../styles/UserList.css';

interface UserListProps {
    searchTerm: string;
    sortBy: 'name' | 'age';
}

export default function UserList({searchTerm, sortBy}: UserListProps) {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const {toggleFavorite, isFavorite} = useFavorites();

    const usersPerPage = 10;

    const loadUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await userService.getAllUsers();
            setUsers(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur inconnue');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    // Optimisation avec useMemo
    const filteredAndSortedUsers = useMemo(() => {
        const result = users.filter(user =>
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );

        result.sort((a, b) => {
            if (sortBy === 'name') {
                return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
            } else {
                return a.age - b.age;
            }
        });

        // Favoris en premier
        result.sort((a, b) => {
            const aFav = isFavorite(a.id);
            const bFav = isFavorite(b.id);
            if (aFav && !bFav) return -1;
            if (!aFav && bFav) return 1;
            return 0;
        });

        return result;
    }, [users, searchTerm, sortBy, isFavorite]);

    const totalPages = Math.ceil(filteredAndSortedUsers.length / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const currentUsers = filteredAndSortedUsers.slice(startIndex, startIndex + usersPerPage);

    if (loading) return <SkeletonLoader/>;
    if (error) return <ErrorMessage message={error} onRetry={loadUsers}/>;

    return (
        <div>
            <div className="user-grid">
                {currentUsers.map(user => (
                    <UserCard
                        key={user.id}
                        user={user}
                        isFavorite={isFavorite(user.id)}
                        onToggleFavorite={toggleFavorite}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                    >
                        ← Précédent
                    </button>
                    <span>Page {currentPage} / {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Suivant →
                    </button>
                </div>
            )}
        </div>
    );
}