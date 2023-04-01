import { useState, useRef } from 'react';

import Dictaphone from '../Dictaphone/Dictaphone';
import './Home.css';
import chatService from '../../services/chatService';

const Home = () => {
    const [reply, setReply] = useState('');
    const messageRef = useRef(null);

    const sendMessage = () => {
        const message = messageRef.current.value;
        
        chatService.sendText(message)
            .then((res) => {
                setReply(message);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <section className="home-page">
            <article id="send-message">
                <p>{reply}</p>
                <input ref={messageRef} type="text" name="message" id="message" placeholder="Message" />
                <button onClick={sendMessage}>Send message</button>
                <Dictaphone setReply={setReply} />
            </article>
        </section>
    )
};

export default Home;