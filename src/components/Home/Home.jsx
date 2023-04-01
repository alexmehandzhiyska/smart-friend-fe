import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import authService from '../../services/authService';
import chatService from '../../services/chatService';
import Dictaphone from '../Dictaphone/Dictaphone';

const Home = () => {
    const navigate = useNavigate();

    const messageRef = useRef(null);

    const [reply, setReply] = useState('');

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
        <section className="content-wrapper">
            <Link onClick={logoutUser}>Logout</Link>

            <article id="send-message">
                <input ref={messageRef} type="text" name="message" id="message" placeholder="Message" />
                <p>{reply}</p>
            </article>
            <Dictaphone setReply={setReply} />
        </section>
    )
};

export default Home;