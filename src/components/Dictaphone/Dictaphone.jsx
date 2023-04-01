import React from 'react';
import { useState, useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import chatService from '../../services/chatService';

const Dictaphone = ({ setReply }) => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
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

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (transcriptRef.current) {
                const currentText = transcriptRef.current.textContent;

                if (currentText == textTranscript && currentText != '') {
                    chatService.sendText(currentText)
                        .then(res => {
                            setReply(res.response);
                            console.log(res);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    SpeechRecognition.stopListening();
                    clearInterval(intervalId)
                }
    
                setTextTranscript(currentText);
            }
        }, 2000);
    }, [textTranscript]);

    return (
        <div>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button onClick={startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p ref={transcriptRef} onChange={() => setTextTranscript('hi')}>{transcript}</p>

        </div>
    );
};

export default Dictaphone;