import React, { useState, useEffect } from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import Box from '@mui/material/Box';
import TaskList from './TaskList';
import TaskInput from './TaskInput';
import { Typography, FormControlLabel, Checkbox } from '@mui/material';
import { type Task, type Priority } from './types';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [showOnlyNotDone, setShowOnlyNotDone] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch('/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Ошибка загрузки задач:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (title: string, priorityFromInput: string) => {
    const priority = priorityFromInput as Priority;
    try {
      const response = await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, priority }),
      });
      const newTask = await response.json();
      setTasks(prev => [...prev, newTask]);
    } catch (error) {
      console.error('Ошибка добавления задачи:', error);
    }
  };

  const handleCompleteTask = async (id: number) => {
    try {
      const response = await fetch(`/tasks/${id}/complete`, { method: 'POST' });
      if (response.ok) {
        setTasks(prev =>
          prev.map(task => (task.id === id ? { ...task, isDone: true } : task))
        );
      } else if (response.status === 404) {
        alert('Задача не найдена');
      }
    } catch (error) {
      console.error('Ошибка при завершении задачи:', error);
    }
  };

  const filteredTasks = showOnlyNotDone ? tasks.filter(task => !task.isDone) : tasks;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <Header
        title="TickIt"
        logo={<img src="./public/logo.png" alt="logo" style={{ height: 70 }} />}
      />
      <Body>
        <Typography
          variant="h6"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#3b9d40',
            fontSize: '2rem',
          }}
        >
          ЗАДАЧИ
        </Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={showOnlyNotDone}
              onChange={(e) => setShowOnlyNotDone(e.target.checked)}
            />
          }
          label="Показать только невыполненные"
          sx={{ mb: 2 }}
        />

        {loading ? (
          <Typography>Загрузка...</Typography>
        ) : (
          <TaskList tasks={filteredTasks} onComplete={handleCompleteTask} />
        )}

        <TaskInput onSubmit={handleAddTask} />
      </Body>
      <Footer copyright="Твои дела защищены" />
    </Box>
  );
}

export default App;