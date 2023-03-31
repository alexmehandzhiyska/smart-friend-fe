import { baseUrl } from "../constants";

const sendText = async () => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    const userText = {text: 'Why is the sky blue?'};
    
    const response = await fetch(`${baseUrl}/openai/openai-response/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(userText)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
}

const sendRecording = async (formData, audioLengthData) => {

}

const chatService = { sendText, sendRecording };

export default chatService;