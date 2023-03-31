import { useState } from 'react';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder';
import RecordStyles from './RecordSound.module.scss';
import chatService from '../../services/chatService';
 

export default function RecordSound() {  
    const [audioState, setAudioState] = useState({recordState: null});

    const start = () => {
        setTimeout(() => {
            setFunc(() => () => stop());
            setAudioState({
                recordState: RecordState.START
            });
            
            setAudioLength({
                start: new Date()
            });

            setDisableBtn(RecordStyles.visible);
        }, 2000);
    }

    const stop = () => {
        setFunc(() => () => start());

        setAudioState({
            recordState: RecordState.STOP
        });
    }

    const onStop = (audioData) => {
        handleSave(audioData);
    }

    const handleSave = async (audioData) => {
        const audioBlob = await fetch(audioData.url).then((r) => r.blob());
        const audioFile = new File([audioBlob], 'voice.wav', { type: 'audio/wav' });
        const audioLengthData = (new Date() - audioLength.start);
    
        const formData = new FormData();

        formData.append('recording', audioFile);
        formData.append('owner_id', 1);
        
        const emotionResult = await chatService.sendRecording(formData, audioLengthData);
        displayEmotionResult(emotionResult);
    };

    return (
        <div>
            <Navigation/>
            <div style={{display: 'none'}}>
                <AudioReactRecorder canvasWidth="0" canvasHeight="0" state={audioState.recordState} onStop={onStop} />
            </div>
        </div>
    );
}