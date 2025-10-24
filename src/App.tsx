import {BrowserRouter as Router, Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import NavBar from './components/NavBar';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import {useState} from 'react';

function AppContent() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'age'>('name');
    const location = useLocation();
    const navigate = useNavigate();

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
            />

            <Routes>
                <Route path="/" element={<UserList searchTerm={searchTerm} sortBy={sortBy}/>}/>
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