// App.tsx
import React, { useState } from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TaskList from './TaskList'
import { type Task, type Priority } from './types'
import TaskInput from './TaskInput';
import { Typography } from '@mui/material';

const Tasks: Task[] = [
    { id: 1, title: 'Купить молоко', priority: 'normal', isDone: false },
    { id: 2, title: 'Сделать зарядку', priority: 'high', isDone: true },
    { id: 3, title: 'Написать код', priority: 'high', isDone: false },
    { id: 4, title: 'Почитать книгу', priority: 'low', isDone: false },
    { id: 5, title: 'Позвонить родителям', priority: 'normal', isDone: true },
    { id: 6, title: 'Заплатить за интернет', priority: 'high', isDone: false },
    { id: 7, title: 'Купить продукты', priority: 'normal', isDone: false },
    { id: 8, title: 'Выгулять собаку', priority: 'low', isDone: true },
    { id: 9, title: 'Сходить в спортзал', priority: 'high', isDone: false },
    { id: 10, title: 'Приготовить ужин', priority: 'normal', isDone: false },
    { id: 11, title: 'Посмотреть вебинар', priority: 'low', isDone: false },
    { id: 12, title: 'Ответить на письма', priority: 'normal', isDone: true },
    { id: 13, title: 'Убраться в комнате', priority: 'high', isDone: false },
    { id: 14, title: 'Купить подарок', priority: 'normal', isDone: false },
    { id: 15, title: 'Записаться к врачу', priority: 'low', isDone: true },
]

function App() {
  const [tasks, setTasks] = useState<Task[]>(Tasks);

  const handleAddTask = (title: string, priorityFromInput: string) => {
    const priority: Priority = priorityFromInput === 'medium' ? 'normal' : (priorityFromInput as Priority);
    const nextId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    const newTask: Task = { id: nextId, title, priority, isDone: false };
    setTasks(prev => [...prev, newTask]);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' , minHeight: '100vh', width: '100%' }}>
      <Header
        title="TickIt"
        logo={<img src='./public/logo.png' alt='logo' style={{ height: 70 }} />}
      />
      <Body>
        <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b9d40', fontSize: '2rem' }}>
          ЗАДАЧИ
        </Typography>
        <TaskList tasks={tasks} />
        <TaskInput onSubmit={handleAddTask} />
      </Body>
      <Footer copyright="Твои дела защищены" />
    </Box>
  );
}

export default App;