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
        username: userData.username,
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

const logout = async () => {
    const token = JSON.parse(localStorage.getItem('user')).token;

    const response = await fetch(`${baseUrl}/auth/logout/`, {
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`
        }
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data);
    }

    localStorage.removeItem('user');
    return 'success';
}

export const authService = { register, login, logout };