import { baseUrl } from '../constants';

const register = async (userData) => {
    const user = {
        username: userData.username,
        password: userData.password,
        profile: {
            email: userData.email
        }
    };

    const response = await fetch(`${baseUrl}/auth/register/`, {
        method: 'POST',
        headers: {
            'Accept': "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
};

const login = async (userData) => {
    const user = {
        email: userData.email,
        password: userData.password
    };

    const response = await fetch(`${baseUrl}/auth/login/`, {
        method: 'POST',
        headers: {
            'Accept': "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
};

export const authService = { register, login };