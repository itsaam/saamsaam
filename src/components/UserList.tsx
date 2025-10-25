import {useState, useMemo} from 'react';
import UserCard from './UserCard';
import SkeletonLoader from './SkeletonLoader';
import ErrorMessage from './ErrorMessage';
import {useUsers} from '../hooks/useUsers';
import '../styles/UserList.css';

interface UserListProps {
    searchTerm: string;
    sortBy: 'name' | 'age';
    toggleFavorite: (userId: number) => void;
    isFavorite: (userId: number) => boolean;
}

export default function UserList({searchTerm, sortBy, toggleFavorite, isFavorite}: UserListProps) {
    const {users, loading, error, reload} = useUsers();
    const [currentPage, setCurrentPage] = useState(1);
    const [cityFilter, setCityFilter] = useState('all');

    const usersPerPage = 10;

    const filteredAndSortedUsers = useMemo(() => {
        const searchWords = searchTerm.toLowerCase().trim().split(/\s+/).filter(word => word.length > 0);

        let result = users.filter(user => {
            if (searchWords.length === 0) return true;

            const userInfo = `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase();

            return searchWords.every(word => userInfo.includes(word));
        });

        if (cityFilter !== 'all') {
            result = result.filter(user => user.address.city === cityFilter);
        }

        result.sort((a, b) => {
            if (sortBy === 'name') {
                return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
            } else {
                return a.age - b.age;
            }
        });

        result.sort((a, b) => {
            const aFav = isFavorite(a.id);
            const bFav = isFavorite(b.id);
            if (aFav && !bFav) return -1;
            if (!aFav && bFav) return 1;
            return 0;
        });

        return result;
    }, [users, searchTerm, sortBy, isFavorite, cityFilter]);

    const totalPages = Math.ceil(filteredAndSortedUsers.length / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const currentUsers = filteredAndSortedUsers.slice(startIndex, startIndex + usersPerPage);

    if (loading) return <SkeletonLoader/>;
    if (error) return <ErrorMessage message={error} onRetry={reload}/>;

    return (
        <div>
            <div style={{padding: '20px', textAlign: 'center'}}>
                <select
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    style={{
                        padding: '8px 12px',
                        border: '1px solid #00ff9d',
                        borderRadius: '4px',
                        fontSize: '14px',
                        cursor: 'pointer'
                    }}
                >
                    <option value="all">Toutes les villes</option>
                    <option value="Phoenix">Phoenix</option>
                    <option value="Houston">Houston</option>
                    <option value="Columbus">Columbus</option>
                    <option value="Jacksonville">Jacksonville</option>
                    <option value="San Antonio">San Antonio</option>
                    <option value="Fort Worth">Fort Worth</option>
                    <option value="Charlotte">Charlotte</option>
                    <option value="Seattle">Seattle</option>
                </select>
            </div>

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

            {filteredAndSortedUsers.length === 0 && (
                <p className="muted">Aucun utilisateur trouvé</p>
            )}

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

