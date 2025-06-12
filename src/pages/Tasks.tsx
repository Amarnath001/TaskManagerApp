import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  VStack,
  Heading,
  useToast,
  Input,
  Textarea,
  HStack,
  Text,
  Checkbox,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

export const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tasks');
      setTasks(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch tasks',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await axios.put(`http://localhost:3001/tasks/${editingTask.id}`, {
          title,
          description,
        });
        setEditingTask(null);
      } else {
        await axios.post('http://localhost:3001/tasks', {
          title,
          description,
        });
      }
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save task',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete task',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      await axios.put(`http://localhost:3001/tasks/${task.id}`, {
        ...task,
        isComplete: !task.isComplete,
      });
      fetchTasks();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update task',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box maxW="container.md" mx="auto" mt={8} p={6}>
      <HStack justify="space-between" mb={6}>
        <Heading>Tasks</Heading>
        <Button onClick={handleLogout}>Logout</Button>
      </HStack>

      <form onSubmit={handleSubmit}>
        <VStack spacing={4} mb={8}>
          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit" colorScheme="blue" width="full">
            {editingTask ? 'Update Task' : 'Add Task'}
          </Button>
        </VStack>
      </form>

      <VStack spacing={4} align="stretch">
        {tasks.map((task) => (
          <Box
            key={task.id}
            p={4}
            borderWidth={1}
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack spacing={4}>
              <Checkbox
                isChecked={task.isComplete}
                onChange={() => handleToggleComplete(task)}
              />
              <Box>
                <Text
                  fontSize="lg"
                  textDecoration={task.isComplete ? 'line-through' : 'none'}
                >
                  {task.title}
                </Text>
                {task.description && (
                  <Text color="gray.600">{task.description}</Text>
                )}
              </Box>
            </HStack>
            <HStack>
              <IconButton
                aria-label="Edit task"
                icon={<EditIcon />}
                onClick={() => handleEdit(task)}
              />
              <IconButton
                aria-label="Delete task"
                icon={<DeleteIcon />}
                onClick={() => handleDelete(task.id)}
                colorScheme="red"
              />
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}; 