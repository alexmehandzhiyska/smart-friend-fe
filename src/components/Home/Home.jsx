import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import Dictaphone from './Dictaphone/Dictaphone';
import chatService from '../../services/chatService';

import './Home.css';

const Home = () => {
    const [reply, setReply] = useState('');
    const [initialReqSent, setInitialReqSent] = useState(false);
    const messageRef = useRef(null);

    // useEffect(() => {
    //     if (!initialReqSent) {
    //         chatService.sendText('')
    //         .then(res => {
    //             setReply(res.response);
    //             setInitialReqSent(true);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    //     }
    // }, []);

    const sendMessage = () => {
        const message = messageRef.current.value;
        messageRef.current.value = '';

        chatService.sendText(message)
            .then((res) => {
                setReply(res.response);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <section className="home-page">
            <article className="chat">
                {reply && <h1>{reply}</h1>}
            </article>

            <article className="send-message">
                <Dictaphone setReply={setReply} />

                <div className="message-prompt">
                    <input ref={messageRef} type="text" name="message" id="message" placeholder="Message" />
                    <FontAwesomeIcon onClick={sendMessage} icon={faPaperPlane} id="message-icon"></FontAwesomeIcon>
                </div>
            </article>
        </section>
    )
};

export default Home;