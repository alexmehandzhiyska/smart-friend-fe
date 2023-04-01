import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import Dictaphone from './Dictaphone/Dictaphone';
import chatService from '../../services/chatService';

import './Home.css';

import image1 from '../../assets/avatar_green_normal.png';
import image2 from '../../assets/avatar_green_talk.png';

const Home = () => {
    const [messages, setMessages] = useState([]);
    const [messageSent, setMessageSent] = useState(false);
    const messageRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(image1);
  const [previousImageSrc, setPreviousImageSrc] = useState(image2);

    useEffect(() => {
        if (!messageSent) {
            chatService.sendText('')
            .then(res => {
                setMessages([res.response]);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [messageSent]);

    /*useEffect(() => {
        const timeout = setTimeout(() => {
          setPreviousImageSrc(imageSrc);
          setImageSrc(previousImageSrc);
        }, 5000);
    
        return () => clearTimeout(timeout);
      }, [imageSrc, previousImageSrc]);*/
    
      const handleImageClick = () => {
        
        setImageSrc(previousImageSrc);
        setPreviousImageSrc(imageSrc);
        setTimeout(() => {
            setPreviousImageSrc(previousImageSrc);
            setImageSrc(imageSrc);
          }, 5000);
      };

    const sendMessage = () => {
        const message = messageRef.current.value;
        messageRef.current.value = '';
        setMessages([...messages, message]);

        chatService.sendText(message)
            .then((res) => {
                setMessages([...messages, message, res.response]);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <section className="home-page">
            <article className="chat">
                {messages.map(message => <h3 class="sent-message">{message}</h3>)}
            </article>

<article className="avatar">
<img src={imageSrc} onClick={handleImageClick} alt=''/>
</article>
            <article className="send-message">
                <Dictaphone messages={messages} setMessages={setMessages} setMessageSent={setMessageSent} />

                <div className="message-prompt">
                    <input ref={messageRef} type="text" name="message" id="message" placeholder="Message"  onClick={handleImageClick}/>
                    <FontAwesomeIcon onClick={sendMessage} icon={faPaperPlane} id="message-icon"></FontAwesomeIcon>
                </div>
            </article>
        </section>
    )
};

export default Home;