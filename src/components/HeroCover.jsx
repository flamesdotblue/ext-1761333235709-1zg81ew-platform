import Spline from '@splinetool/react-spline';
import { ArrowDown, Clock } from 'lucide-react';

export default function HeroCover() {
  return (
    <header className="relative h-[70vh] w-full">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/qMOKV671Z1CM9yS7/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-neutral-950/95" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-neutral-300 backdrop-blur">
          <Clock className="h-4 w-4" />
          Focus Timer & Task Manager
        </div>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Gestisci il tuo lavoro con chiarezza e ritmo
        </h1>
        <p className="mt-3 max-w-xl text-neutral-300">
          Organizza le attività, traccia il tempo e mantieni la concentrazione con un design moderno e intuitivo.
        </p>
        <a
          href="#app"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2.5 font-medium text-black transition hover:bg-yellow-300"
        >
          Inizia ora
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}
