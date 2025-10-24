import './NavBar.css';
import ThemeToggle from '../styles/ThemeToggle.css';

interface NavBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    sortBy: 'name' | 'age';
    onSortChange: (value: 'name' | 'age') => void;
    showBackButton?: boolean;
    onBackClick?: () => void;
}

export default function NavBar(props: NavBarProps) {
    const {
        searchTerm,
        onSearchChange,
        sortBy,
        onSortChange,
        showBackButton,
        onBackClick,
    } = props;

    return (
        <nav className="navbar">
            {showBackButton && (
                <button onClick={onBackClick}>← Retour</button>
            )}

            <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />

            <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as 'name' | 'age')}
            >
                <option value="name">Trier par nom</option>
                <option value="age">Trier par âge</option>
            </select>

            <ThemeToggle />
        </nav>
    );
}