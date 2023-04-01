import { baseUrl } from '../constants';

const sendText = async (message) => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    const userText = { text: message };

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

const chatService = { sendText };

export default chatService;