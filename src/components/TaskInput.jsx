import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function TaskInput({ onAdd }) {
  const [value, setValue] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const title = value.trim();
    if (!title) return;
    onAdd(title);
    setValue('');
  };

  return (
    <form onSubmit={submit} className="mb-4 flex items-center gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Aggiungi una nuova attività..."
        className="flex-1 rounded-xl border border-white/10 bg-neutral-800/70 px-4 py-3 text-sm text-neutral-100 placeholder:text-neutral-400 outline-none focus:border-yellow-400/60"
      />
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-3 text-sm font-semibold text-black shadow-sm transition hover:bg-yellow-300"
      >
        <Plus className="h-4 w-4" />
        Aggiungi
      </button>
    </form>
  );
}
