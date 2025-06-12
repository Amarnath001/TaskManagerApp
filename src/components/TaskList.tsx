import { useEffect, useState } from 'react';

export default function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tasks`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await res.json();
            setTasks(data);
        };
        fetchTasks();
    }, []);

    return (
        <ul>
            {tasks.map((task: any) => (
                <li key={task.id}>{task.title}</li>
            ))}
        </ul>
    );
}