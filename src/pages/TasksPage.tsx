import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useState } from 'react';

export default function TasksPage() {
    const [refresh, setRefresh] = useState(false);

    return (
        <>
            <TaskForm onCreate={() => setRefresh(!refresh)} />
            <TaskList key={String(refresh)} />
        </>
    );
}