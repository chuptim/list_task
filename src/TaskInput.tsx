import React, { useState } from 'react';
import './TaskInput.css';

interface TaskInputProps {
  onSubmit?: (task: string, priority: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onSubmit }) => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('normal');
  const [bottomOffset, setBottomOffset] = useState<number>(16);

  React.useEffect(() => {
    let rafId: number | null = null;

    const baseMargin = 16;

    const update = () => {
      rafId = null;
      const footer = document.querySelector('footer');
      let offset = baseMargin;
      if (footer) {
        const rect = footer.getBoundingClientRect();
        const overlap = Math.max(0, window.innerHeight - rect.top);
        offset = baseMargin + overlap;
      }
      setBottomOffset(prev => (prev === offset ? prev : offset));
    };

    const scheduleUpdate = () => {
      if (rafId == null) rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    // initial
    scheduleUpdate();

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      onSubmit?.(task, priority);
      setTask('');
      setPriority('medium');
    }
  };

  return (
    <form
      className={`task-input fixed`}
      style={{ position: 'fixed', right: 0, left: 0, bottom: `${bottomOffset}px` }}
      onSubmit={handleSubmit}
    >
      <div className="task-input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Введите новую задачу..."
          className="task-input-field"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="low">Низкий</option>
          <option value="normal">Средний</option>
          <option value="high">Высокий</option>
        </select>
        <button type="submit" className="submit-button">
          Опубликовать
        </button>
      </div>
    </form>
  );
};

export default TaskInput;
