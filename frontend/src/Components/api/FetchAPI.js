import axios from '../../axiosConfig.js';
import { getToken } from './auth.js';

export async function fetchNotes() {
    try {
        const token = await getToken();
        const response = await axios.get('/notes', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Fetch Notes Error:', error);
        return error.response.data;
    }
}

export async function fetchDetails() {
    try {
        const token = await getToken();
        const response = await axios.get('/details', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Fetch Details Error:', error);
        return error.response.data;
    }
}

export async function createNote(formData) {
    try {
        const token = await getToken();
        const response = await axios.post('/new-note', formData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Create Note Error:', error);
        return error.response.data;
    }
}

export async function updateNote(formData) {
    try {
        const token = await getToken();
        const response = await axios.put(`/update-note/${formData._id}`, formData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Update Note Error:', error);
        return error.response.data;
    }
}

export async function deleteNote(noteId) {
    try {
        const token = await getToken();
        const response = await axios.delete(`/delete-note/${noteId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const data = response.data;
        if (data.success_message) {
            return response.data;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Delete Note Error:', error);
        return error.response.data;
    }
}

export async function togglePinNote(noteId) {
    try {
        const token = await getToken();
        const response = await axios.put(`/toggle-pin/${noteId}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Toggle Pin Note Error:', error);
        return error.response.data;
    }
}

