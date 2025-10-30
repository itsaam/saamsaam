import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import type {User} from '../types/User';
import {userService} from '../services/userService';
import '../styles/UserDetail.css';

function UserDetail() {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            userService.getUserById(id)
                .then(data => {
                    setUser(data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return <div className="loading">Loading...</div>;

    if (error || !user) {
        return (
            <div style={{padding: '40px', textAlign: 'center'}}>
                <h1>404</h1>
                <p>Utilisateur non trouvé</p>
                <button onClick={() => navigate('/')}>← Retour à la liste</button>
            </div>
        );
    }

    return (
        <div className="user-detail">
            <div className="user-detail-content">
                <img src={user.image} alt={user.firstName}/>
                <h1>{user.firstName} {user.lastName}</h1>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Âge:</strong> {user.age} ans</p>
                <p><strong>Téléphone:</strong> {user.phone}</p>
                <p><strong>Ville:</strong> {user.address.city}, {user.address.state}</p>
                <p><strong>Adresse:</strong> {user.address.address}</p>
                <p><strong>Société:</strong> {user.company.name}</p>
                <p><strong>Poste:</strong> {user.company.title}</p>
                <p><strong>Département:</strong> {user.company.department}</p>
            </div>
        </div>
    );
}

export default UserDetail;