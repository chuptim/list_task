import React from 'react';
import type { Task, Priority } from './types';
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const priorityWeight: Record<Priority, number> = {
  high: 3,
  normal: 2,
  low: 1,
};

interface TaskListProps {
  tasks: Task[];
  onComplete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onComplete }) => {
  const activeTasks = tasks.filter(task => !task.isDone);
  const completedTasks = tasks.filter(task => task.isDone);

  const sortByPriority = (a: Task, b: Task) =>
    priorityWeight[b.priority] - priorityWeight[a.priority];

  const sortedActive = [...activeTasks].sort(sortByPriority);
  const sortedCompleted = [...completedTasks].sort(sortByPriority);

  return (
    <Box>
      {sortedActive.length > 0 && (
        <List>
          {sortedActive.map(task => (
            <ListItem
              key={task.id}
              divider
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="Отметить выполненной"
                  onClick={() => onComplete(task.id)}
                >
                  <CheckCircleIcon sx={{ color: '#2e7d32' }} />
                </IconButton>
              }
            >
              <ListItemText
                primary={task.title}
                secondary={`Приоритет: ${task.priority}`}
              />
            </ListItem>
          ))}
        </List>
      )}

      {sortedCompleted.length > 0 && (
        <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          Выполненные задачи
        </Typography>
      )}

      {sortedCompleted.length > 0 && (
        <List>
          {sortedCompleted.map(task => (
            <ListItem
              key={task.id}
              divider
              sx={{ opacity: 0.6, color: 'gray' }}
            >
              <ListItemText
                primary={task.title}
                secondary={`Приоритет: ${task.priority}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default TaskList;