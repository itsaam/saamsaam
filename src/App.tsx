import {BrowserRouter as Router, Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import NavBar from './components/NavBar';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import ErrorBoundary from './components/ErrorBoundary';
import {useState} from 'react';
import {useFavorites} from './hooks/useFavorites';
import {Toaster} from 'react-hot-toast';

function AppContent() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'age'>('name');
    const location = useLocation();
    const navigate = useNavigate();
    const {clearAll, favorites, toggleFavorite, isFavorite} = useFavorites();

    const isDetailPage = location.pathname !== '/';

    return (
        <div>
            <Toaster position="top-right"/>
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
                <Route path="*" element={<div style={{padding: '40px', textAlign: 'center'}}><h1>404 - Page non trouvée</h1></div>}/>
            </Routes>
        </div>
    );
}

function App() {
    return (
        <ErrorBoundary>
            <Router>
                <AppContent/>
            </Router>
        </ErrorBoundary>
    );
}

export default App;