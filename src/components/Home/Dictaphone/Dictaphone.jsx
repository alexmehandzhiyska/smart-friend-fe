// import React, { useState, useRef, useEffect } from 'react';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import chatService from '../../../services/chatService';

// import './Dictaphone.css';

// const Dictaphone = ({ messages, setMessages, setMessageSent, textToSpeech, setTranscript }) => {
//     const {
//         transcript,
//         resetTranscript,
//     } = useSpeechRecognition();

//     const [textTranscript, setTextTranscript] = useState('');
//     const transcriptRef = useRef(<p></p>);

//     const startListening = () => {
//         SpeechRecognition.startListening({
//             continuous: true,
//             interimResults: false,
//             maxSpeechTime: 500000,
//             language: 'en-US',
//         });
//     };

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             if (transcriptRef.current) {
//                 const currentText = transcriptRef.current.textContent;
                
//                 if (currentText == textTranscript && currentText != '') {
//                     chatService.sendText(currentText)
//                         .then(res => {
//                             textToSpeech(res.response);
//                             setMessages([...messages, currentText, res.response]);
//                             resetTranscript();
//                             setMessageSent(true);

//                             setTimeout(() => {
//                                 startListening();
//                             }, 5500);
//                         })
//                         .catch(err => {
//                             console.log(err);
//                         });
//                     SpeechRecognition.stopListening();
//                     clearInterval(intervalId)
//                 } else {
//                     setTextTranscript(currentText);
//                 }
//             }
//         }, 3000);
//     }, [textTranscript]);

//     return (
//         <div className="dictaphone">
//             <button  onClick={startListening} className="primary-btn">Begin conversation</button>
//             <p ref={transcriptRef} className="transcript-ref" onChange={}>{transcript}</p>
//             <p>or</p>
//         </div>
//     );
// };

// export default Dictaphone;