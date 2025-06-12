import { useState } from 'react';

export default function TaskForm({ onCreate }: { onCreate: () => void }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch(`${import.meta.env.VITE_API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ title, description })
        });
        onCreate();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" />
            <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
            <button type="submit">Add Task</button>
        </form>
    );
}