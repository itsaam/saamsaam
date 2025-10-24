import type {User} from '../types/User';
import {Link} from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import '../styles/UserCard.css';

interface UserCardProps {
    user: User;
    isFavorite: boolean;
    onToggleFavorite: (userId: number) => void;
}

function UserCard({user, isFavorite, onToggleFavorite}: UserCardProps) {
    return (
        <Link to={`/user/${user.id}`} className="user-card">
            <FavoriteButton
                userId={user.id}
                isFavorite={isFavorite}
                onToggle={onToggleFavorite}
            />
            <img src={user.image} alt={user.firstName}/>
            <h3>{user.firstName} {user.lastName}</h3>
            <p>{user.email}</p>
        </Link>
    );
}

export default UserCard;