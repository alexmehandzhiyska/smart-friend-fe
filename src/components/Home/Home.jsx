import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import Dictaphone from './Dictaphone/Dictaphone';
import chatService from '../../services/chatService';

import './Home.css';

import image1 from '../../assets/avatar_green_normal.png';
import image2 from '../../assets/avatar_green_talk.png';


const Home = () => {
    const [imageSrc, setImageSrc] = useState(image1);
    const [previousImageSrc, setPreviousImageSrc] = useState(image2);
    const [duration, setDuration] = useState(0);
    const [messages, setMessages] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);
    const [messageSent, setMessageSent] = useState(false);
    const [recordingStarted, setRecordingStarted] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [imageSrc, setImageSrc] = useState(image1);
    const [previousImageSrc, setPreviousImageSrc] = useState(image2);
    const messageRef = useRef(null);

    useEffect(() => {
        if (!messageSent) {
            chatService.sendText('')
            .then(res => {
                textToSpeech(res.response);
                setMessages([res.response]);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [messageSent]);
    
    const handleImageClick = () => {
    const handleImageClick = () => {
        setImageSrc(previousImageSrc);
        setPreviousImageSrc(imageSrc);

        setTimeout(() => {
            setPreviousImageSrc(previousImageSrc);
            setImageSrc(imageSrc);
          }, 5000);
    };

    const setVoices = (utterance) => {
        const voice = speechSynthesis.getVoices().find(
            (v) => v.lang === 'en-GB' && v.name.includes('Female')
        );

        utterance.voice = voice;
    }

    const textToSpeech = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);

        if (voicesLoaded) {
            setVoices(utterance);
            speechSynthesis.speak(utterance);
        }

        speechSynthesis.onvoiceschanged = () => {
            setVoices(utterance);
            speechSynthesis.speak(utterance);
            setVoicesLoaded(true);
        };
    
        utterance.onboundary = (event) => {
            let startTime, endTime;
    
            if (event.name === 'word') {
                if (startTime === 0) {
                    startTime = event.elapsedTime;
                } else {
                    endTime = event.elapsedTime;
                }
            }
    
            utterance.onend = () => {
                setDuration(endTime - startTime);
            };
        };
    }

    const sendMessage = () => {
        const message = messageRef.current.value;
        messageRef.current.value = '';
        setMessages([...messages, message]);

        chatService.sendText(message)
            .then((res) => {
                textToSpeech(res.response);
                setMessages([...messages, message, res.response]);

                setTimeout(() => {
                    setDuration(0);
                }, duration)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <section className="home-page">
            <article className="main-content">
                <section className="avatar">
                    <img src={imageSrc} onClick={handleImageClick} alt=''/>
                </section>

                <section className="chat">
                    {recordingStarted && <h3 className="sent-message">{transcript}</h3>}
                    {messages.map(message => <h3 className="sent-message">{message}</h3>)}
                </section>
            </article>
           

            <article className="send-message">
                <Dictaphone messages={messages} setMessages={setMessages} setMessageSent={setMessageSent} setTranscript={setTranscript} setRecordingStarted={setRecordingStarted} />

                <div className="message-prompt">
                    <input ref={messageRef} type="text" name="message" id="message" placeholder="Message"  onClick={handleImageClick}/>
                    <FontAwesomeIcon onClick={sendMessage} icon={faPaperPlane} id="message-icon"></FontAwesomeIcon>
                </div>
            </article>
        </section >
    )
};

export default Home;