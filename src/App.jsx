import { useEffect, useMemo, useState } from 'react';
import HeroCover from './components/HeroCover';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TimerPanel from './components/TimerPanel';

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('tasks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [selectedTaskId, setSelectedTaskId] = useState(() => {
    try {
      return localStorage.getItem('selectedTaskId') || null;
    } catch {
      return null;
    }
  });
  const [isRunning, setIsRunning] = useState(false);

  const selectedTask = useMemo(
    () => tasks.find((t) => t.id === selectedTaskId) || null,
    [tasks, selectedTaskId]
  );

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (selectedTaskId) localStorage.setItem('selectedTaskId', selectedTaskId);
    else localStorage.removeItem('selectedTaskId');
  }, [selectedTaskId]);

  useEffect(() => {
    if (!isRunning || !selectedTask) return;
    const interval = setInterval(() => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === selectedTask.id ? { ...t, elapsed: (t.elapsed || 0) + 1 } : t
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, selectedTask]);

  const addTask = (title) => {
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    setTasks((prev) => [{ id, title, completed: false, elapsed: 0 }, ...prev]);
  };

  const toggleComplete = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const removeTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (id === selectedTaskId) {
      setIsRunning(false);
      setSelectedTaskId(null);
    }
  };

  const selectTask = (id) => {
    setSelectedTaskId(id);
  };

  const start = () => {
    if (!selectedTask) return;
    setIsRunning(true);
  };

  const pause = () => setIsRunning(false);

  const reset = () => {
    if (!selectedTask) return;
    setTasks((prev) => prev.map((t) => (t.id === selectedTask.id ? { ...t, elapsed: 0 } : t)));
  };

  const totalElapsed = useMemo(
    () => tasks.reduce((acc, t) => acc + (t.elapsed || 0), 0),
    [tasks]
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <HeroCover />

      <main id="app" className="relative -mt-24 pb-24">
        <div className="mx-auto max-w-6xl px-4">
          <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-4 backdrop-blur">
                <div className="flex items-center justify-between gap-2 pb-3">
                  <h2 className="text-xl font-semibold">Task</h2>
                  <div className="text-xs text-neutral-400">
                    Totale tempo: {formatTime(totalElapsed)}
                  </div>
                </div>
                <TaskInput onAdd={addTask} />
                <TaskList
                  tasks={tasks}
                  selectedTaskId={selectedTaskId}
                  onSelect={selectTask}
                  onToggleComplete={toggleComplete}
                  onRemove={removeTask}
                />
              </div>
            </div>
            <div className="md:col-span-1">
              <TimerPanel
                task={selectedTask}
                isRunning={isRunning}
                onStart={start}
                onPause={pause}
                onReset={reset}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function formatTime(totalSeconds) {
  const hrs = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, '0');
  const mins = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const secs = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

export default App;
