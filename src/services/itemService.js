import { baseUrl } from "../constants";

const getAll = async () => {
    const response = await fetch('http://localhost:8000/items/');
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
};

const getOne = async (itemId) => {
    const response = await fetch(`http://localhost:8000/items/${itemId}/`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
};

const createOne = async (item) => {
    const response = await fetch(`http://localhost:8000/items/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
}

const itemsService = { getAll, getOne, createOne };

export default itemsService;