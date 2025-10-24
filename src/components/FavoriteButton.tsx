import './FavoriteButton.css';
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';

interface FavoriteButtonProps {
    userId: number;
    isFavorite: boolean;
    onToggle: (userId: number) => void;
}

export default function FavoriteButton({ userId, isFavorite, onToggle }: FavoriteButtonProps) {
    return (
        <button
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggle(userId);
            }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
            {isFavorite ? <MdFavorite /> : <MdOutlineFavoriteBorder />}
        </button>
    );
}