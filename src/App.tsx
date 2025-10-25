import {BrowserRouter as Router, Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import NavBar from './components/NavBar';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import {useState} from 'react';
import {useFavorites} from './hooks/useFavorites';

function AppContent() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'age'>('name');
    const location = useLocation();
    const navigate = useNavigate();
    const {clearAll, favorites, toggleFavorite, isFavorite} = useFavorites();

    const isDetailPage = location.pathname !== '/';

    return (
        <div>
            <NavBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                sortBy={sortBy}
                onSortChange={setSortBy}
                showBackButton={isDetailPage}
                onBackClick={() => navigate('/')}
                onClearFavorites={clearAll}
                favoritesCount={favorites.size}
            />

            <Routes>
                <Route path="/"
                       element={<UserList searchTerm={searchTerm} sortBy={sortBy} toggleFavorite={toggleFavorite}
                                          isFavorite={isFavorite}/>}/>
                <Route path="/user/:id" element={<UserDetail/>}/>
            </Routes>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent/>
        </Router>
    );
}

export default App;