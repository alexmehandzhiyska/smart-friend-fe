import { useState, useRef } from 'react';

import Dictaphone from '../Dictaphone/Dictaphone';

import './Home.css';

const Home = () => {
    const [reply, setReply] = useState('');

    return (
        <section className="home-page">
            <article id="send-message">
                <p>{reply}</p>
                <Dictaphone setReply={setReply} />
            </article>
        </section>
    )
};

export default Home;