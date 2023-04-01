import React, { useState, useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import chatService from '../../../services/chatService';

import './Dictaphone.css';

const Dictaphone = ({ messages, setMessages, setMessageSent, setTranscript, setRecordingStarted, textToSpeech }) => {
    const {
        transcript,
        resetTranscript,
    } = useSpeechRecognition();

    const [textTranscript, setTextTranscript] = useState('');
    const transcriptRef = useRef(<p></p>);

    const startListening = () => {
        SpeechRecognition.startListening({
            continuous: true,
            interimResults: false,
            maxSpeechTime: 500000,
            language: 'en-US',
        });
    };

    const updateTranscript = () => {
        setTranscript(transcript);
        setRecordingStarted(true);
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (transcriptRef.current) {
                const currentText = transcriptRef.current.textContent;
                
                if (currentText == textTranscript && currentText != '') {
                    chatService.sendText(currentText)
                        .then(res => {
                            textToSpeech(res.response);
                            const prevMessages = messages.reverse();
                            const curMessages = [currentText, res.response].reverse();

                            setMessages([...curMessages, ...prevMessages]);
                            resetTranscript();
                            setMessageSent(true);

                            setTimeout(() => {
                                startListening();
                            }, 5500);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    SpeechRecognition.stopListening();
                    clearInterval(intervalId)
                }
    
                setTextTranscript(currentText);
            }
        }, 3000);
    }, [textTranscript]);

    return (
        <div className="dictaphone">
            <button  onClick={startListening} className="primary-btn">Begin conversation</button>
            <p ref={transcriptRef} onChange={updateTranscript()} className="transcript-ref">{transcript}</p>
            <p>or</p>
        </div>
    );
};

export default Dictaphone;