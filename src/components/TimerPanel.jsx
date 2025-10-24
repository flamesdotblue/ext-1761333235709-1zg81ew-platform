import { Pause, Play, RotateCcw, Timer } from 'lucide-react';

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

export default function TimerPanel({ task, isRunning, onStart, onPause, onReset }) {
  return (
    <div className="sticky top-6 rounded-2xl border border-white/10 bg-neutral-900/60 p-5 backdrop-blur">
      <div className="mb-3 flex items-center gap-2 text-neutral-300">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400/10 text-yellow-300">
          <Timer className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm">Timer</div>
          <div className="text-xs text-neutral-400">Traccia il tempo della tua attività</div>
        </div>
      </div>

      {task ? (
        <div>
          <div className="mb-1 text-xs uppercase tracking-wide text-neutral-400">Attività selezionata</div>
          <div className="mb-3 line-clamp-2 font-medium text-neutral-100">{task.title}</div>
          <div className="mb-4 text-center text-5xl font-semibold tabular-nums text-yellow-300">
            {formatTime(task.elapsed || 0)}
          </div>
          <div className="flex items-center justify-center gap-3">
            {isRunning ? (
              <button
                onClick={onPause}
                className="inline-flex items-center gap-2 rounded-xl bg-neutral-800 px-4 py-2 text-sm font-medium text-white ring-1 ring-inset ring-white/10 transition hover:bg-neutral-700"
              >
                <Pause className="h-4 w-4" />
                Pausa
              </button>
            ) : (
              <button
                onClick={onStart}
                className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-300"
              >
                <Play className="h-4 w-4" />
                Avvia
              </button>
            )}

            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 rounded-xl bg-neutral-800 px-4 py-2 text-sm font-medium text-white ring-1 ring-inset ring-white/10 transition hover:bg-neutral-700"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-white/10 p-4 text-center text-neutral-400">
          Seleziona un'attività dalla lista per iniziare a tracciare il tempo.
        </div>
      )}
    </div>
  );
}
