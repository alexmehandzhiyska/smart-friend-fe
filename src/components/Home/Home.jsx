import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import chatService from '../../services/chatService';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import './Home.css';

const Home = () => {
    const [imageSrc, setImageSrc] = useState('avatar_green_normal.png');
    const [previousImageSrc, setPreviousImageSrc] = useState('talking_avatar.gif');
    const [duration, setDuration] = useState(0);
    const [messages, setMessages] = useState([]);
    const [voicesLoaded, setVoicesLoaded] = useState(false);
    const [beginBtnDisplay, setBeginBtnDisplay] = useState('block');
    const [inputFieldDisplay, setInputFieldDisplay] = useState('block');
    const [messageSent, setMessageSent] = useState(false);
    const [textTranscript, setTextTranscript] = useState('');
    const [micOn, setMicOn] = useState(false);
    const messageRef = useRef(null);
    const transcriptRef = useRef(<p></p>);
    
    const {
        transcript,
        resetTranscript,
    } = useSpeechRecognition();

    const startListening = () => {
        setBeginBtnDisplay('none');
        setInputFieldDisplay('none');

        setMicOn(true);

        SpeechRecognition.startListening({
            continuous: true,
            interimResults: false,
            maxSpeechTime: 500000,
            language: 'en-US',
        });
    };

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

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (transcriptRef.current) {
                const currentText = transcriptRef.current.textContent;
                
                if (currentText == textTranscript && currentText != '') {
                    SpeechRecognition.stopListening();
                    resetTranscript();
                    sendMessage(currentText);
                    clearInterval(intervalId)
                } else {
                    setTextTranscript(currentText);
                }
            }
        }, 3000);
    }, [textTranscript]);
    
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

    speechSynthesis.onvoiceschanged = () => {
        setVoicesLoaded(true);
    };

    const textToSpeech = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-GB';
        
        setVoices(utterance);
        console.log(utterance);
        speechSynthesis.speak(utterance);
    
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
                console.log('in');
                console.log(endTime);
                console.log(startTime);
                setDuration(endTime - startTime);
            };
        };
    }

    const sendMessage = (text) => {
        setBeginBtnDisplay('none');
        setMicOn(false);
        let message;

        if (!text) {
            message = messageRef.current.value;
            messageRef.current.value = '';
        } else {
            message = text;
        }

        setMessages([...messages, message]);

        chatService.sendText(message)
            .then((res) => {
                console.log(res);
                console.log(micOn);
                textToSpeech(res.response);
                setImageSrc(previousImageSrc);
                setPreviousImageSrc(imageSrc);
                setMessages([...messages, message, res.response]);
                setMessageSent(true);
                console.log('in sendText');

                setTimeout(() => {
                    setDuration(5000);
                    startListening();
                    setPreviousImageSrc(previousImageSrc);
                    setImageSrc(imageSrc);

                }, 5000)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // useEffect(() => {
    //     console.log('in use effect' + micOn);
    //     if (micOn) {
    //         startListening();
    //     } else {
    //         console.log('in else');
    //         SpeechRecognition.stopListening();
    //     }
    // }, [micOn]);

    return (
        <section className="home-page">
            <article className="main-content">
                <section className="avatar">
                    <div className="imageHolder">
                        <img src={imageSrc} alt=''/>
                    </div>
                </section>

                <section className="chat">
                    {messages.map((item, index) => {
                        console.log(item);
                        const className = index % 2 === 0 ? "system" : "user";
                        const flexPos = index % 2 === 0 ? "flex-start" : "flex-end"
                        
                        return (
                            <div key={index} style={{display: "flex", justifyContent: flexPos, width: "100%"}}>
                                <li className={className}>
                                    <p className="sent-message">{item}</p>
                                </li>
                            </div>
                        )
                    })}
                    {transcript && <div style={{display: "flex", justifyContent: "flex-end", width: "100%"}}><li className="user"> <p className="sent-message">{transcript}</p></li></div>}
                </section>
            </article>

            <article className="send-message">
                <div style={{display: beginBtnDisplay}} className="dictaphone">
                    <button  onClick={startListening} className="primary-btn">Begin conversation</button>
                    <p ref={transcriptRef} className="transcript-ref">{transcript}</p>
                    <p style={{textAlign: "center"}}>or</p>
                </div>

                <div className="message-prompt" style={{display: inputFieldDisplay}}>
                    <input ref={messageRef} type="text" name="message" id="message" placeholder="Message" />
                    <FontAwesomeIcon onClick={() => sendMessage()} icon={faPaperPlane} id="message-icon"></FontAwesomeIcon>
                </div>
            </article>
        </section >
    )
};

export default Home;
