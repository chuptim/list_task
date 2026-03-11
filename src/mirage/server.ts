import { createServer, Model, Response } from 'miragejs';
import type { ModelDefinition } from 'miragejs/-types';
import type { Task } from '../types';

const TaskModel: ModelDefinition<Task> = Model.extend({});

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      task: TaskModel,
    },

    seeds(server) {
      const saved = localStorage.getItem('tasks');
      if (saved) {
        const tasks = JSON.parse(saved) as Task[];
        tasks.forEach(task => {
          server.create('task', { ...task, id: String(task.id) });
        });
      } else {
        server.create('task', { id: '1', title: 'Купить молоко', priority: 'normal', isDone: false });
        server.create('task', { id: '2', title: 'Сделать зарядку', priority: 'high', isDone: true });
        server.create('task', { id: '3', title: 'Написать код', priority: 'high', isDone: false });
      }
    },

    routes() {
      this.namespace = '';

      this.get('/tasks', (schema) => {
        const tasks = schema.all('task').models.map(model => {
          const attrs = model.attrs as any;
          return {
            ...attrs,
            id: parseInt(attrs.id, 10),
          } as Task;
        });
        return tasks;
      });

      this.post('/tasks', (schema, request) => {
        const attrs = JSON.parse(request.requestBody) as Omit<Task, 'id' | 'isDone'>;
        const allTasks = schema.all('task').models;
        const maxId = allTasks.reduce((max, model) => {
          const mAttrs = model.attrs as any;
          const idNum = parseInt(String(mAttrs.id), 10);
          return idNum > max ? idNum : max;
        }, 0);
        const newIdNum = maxId + 1;
        const newTask = {
          ...attrs,
          id: String(newIdNum),
          isDone: false,
        };
        const task = schema.create('task', newTask);
        const taskAttrs = task.attrs as any;
        const allTasksForStorage = schema.all('task').models.map(model => {
          const mAttrs = model.attrs as any;
          return { ...mAttrs, id: parseInt(mAttrs.id, 10) };
        });
        localStorage.setItem('tasks', JSON.stringify(allTasksForStorage));
        return {
          ...taskAttrs,
          id: parseInt(taskAttrs.id as string, 10),
        } as Task;
      });

      this.post('/tasks/:id/complete', (schema, request) => {
        const id = request.params.id;
        const task = schema.find('task', id);
        if (task) {
          task.update({ isDone: true });
          const allTasksForStorage = schema.all('task').models.map(model => {
            const mAttrs = model.attrs as any;
            return { ...mAttrs, id: parseInt(mAttrs.id, 10) };
          });
          localStorage.setItem('tasks', JSON.stringify(allTasksForStorage));
          return new Response(200, {}, '');
        } else {
          return new Response(404, {}, 'Task not found');
        }
      });
    },
  });
}