import { CheckCircle2, Circle, Clock, Trash2 } from 'lucide-react';

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

export default function TaskList({ tasks, selectedTaskId, onSelect, onToggleComplete, onRemove }) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 p-8 text-center text-neutral-400">
        <Clock className="h-6 w-6" />
        <p>Nessuna attività. Aggiungine una per iniziare.</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-white/5">
      {tasks.map((task) => {
        const isSelected = selectedTaskId === task.id;
        return (
          <li key={task.id} className="group flex items-center gap-3 py-3">
            <button
              onClick={() => onToggleComplete(task.id)}
              className="rounded-full p-1 text-neutral-400 transition hover:text-yellow-400"
              aria-label={task.completed ? 'Segna come incompleta' : 'Segna come completata'}
            >
              {task.completed ? (
                <CheckCircle2 className="h-5 w-5 text-yellow-400" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={() => onSelect(task.id)}
              className={`flex-1 text-left transition ${
                isSelected ? 'text-yellow-300' : 'text-neutral-100'
              }`}
            >
              <div className="font-medium leading-tight line-clamp-1">{task.title}</div>
              <div className="text-xs text-neutral-400">{formatTime(task.elapsed || 0)}</div>
            </button>

            <button
              onClick={() => onRemove(task.id)}
              className="invisible rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-800 hover:text-red-400 group-hover:visible"
              aria-label="Elimina"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
