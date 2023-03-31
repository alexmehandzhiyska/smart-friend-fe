import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { useEffect } from 'react';
import chatService from '../../services/chatService';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        chatService.sendText();
    }, []);

    const logoutUser = () => {
        authService.logout()
            .then(() => {
                navigate('/');
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <section className="content-wrapper">
            <button onClick={logoutUser}>Logout</button>
        </section>
    )
};

export default Home;