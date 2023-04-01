import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';

import './Header.css';

const Header = () => {
    const navigate = useNavigate();

    const logoutUser = () => {
        authService.logout()
            .then(() => {
                navigate('/login');
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <header>
            <ul className="navbar">
                <li>
                    <Link onClick={logoutUser} className="navbar-item">Logout</Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;