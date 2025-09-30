import { useCallback, useEffect, useRef, useState } from 'react';
import type { PhaseKey } from '@/data/milestones';
import { MILESTONES } from '@/data/milestones';
import CheckIconUrl from '/IMG/Checkmark.svg?url';
import {
  ROAD_TO_MAINNET_EVENT,
  type RoadToMainnetEventDetail,
} from '@/utils/roadToMainnet';

const TAB_LABELS: Record<PhaseKey, string> = {
  horizon: 'Horizon',
  adiri: 'Adiri',
  mainnet: 'Mainnet',
};

export function RoadToMainnet() {
  const [tab, setTab] = useState<PhaseKey>('horizon');
  const tabs: PhaseKey[] = ['horizon', 'adiri', 'mainnet'];
  const sectionRef = useRef<HTMLElement | null>(null);

  const HASH_PREFIX = '#road-to-mainnet-tab-';

  const handleTabSelect = useCallback(
    (phase: PhaseKey, options?: { scroll?: boolean; updateHash?: boolean }) => {
      setTab(phase);

      if (typeof window !== 'undefined' && options?.updateHash !== false) {
        const targetHash = `${HASH_PREFIX}${phase}`;
        if (window.location.hash !== targetHash) {
          window.history.replaceState(null, '', targetHash);
        }
      }

      if (options?.scroll && sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [],
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const validPhases: PhaseKey[] = ['horizon', 'adiri', 'mainnet'];

    const applyHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith(HASH_PREFIX)) {
        const candidate = hash.slice(HASH_PREFIX.length) as PhaseKey;
        if (validPhases.includes(candidate)) {
          handleTabSelect(candidate, { updateHash: false });
        }
      }
    };

    applyHash();

    const handleHashChange = () => {
      applyHash();
    };

    const handleEvent = (event: Event) => {
      const detail = (event as CustomEvent<RoadToMainnetEventDetail>).detail;
      if (!detail) {
        return;
      }

      handleTabSelect(detail.phase, { scroll: detail.scroll });
    };

    window.addEventListener('hashchange', handleHashChange);
    document.addEventListener(ROAD_TO_MAINNET_EVENT, handleEvent as EventListener);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      document.removeEventListener(ROAD_TO_MAINNET_EVENT, handleEvent as EventListener);
    };
  }, [HASH_PREFIX, handleTabSelect]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="roadmap-heading"
      className="space-y-6"
      data-road-to-mainnet=""
    >
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/20 text-primary">
          <img
            src="/IMG/Bookmark.svg"
            alt="Road to Mainnet"
            className="h-6 w-6 md:h-7 md:w-7 shrink-0"
            loading="eager"
          />
        </div>
        <div className="space-y-1">
          <h2 id="roadmap-heading" className="text-xl font-bold text-fg">
            Road to Mainnet
          </h2>
          <p className="text-sm text-fg-muted">
            Milestones required to unlock mainnet launch readiness.
          </p>
        </div>
      </div>
      <div className="rounded-2xl border-2 border-border/60 bg-card p-6 shadow-soft backdrop-blur">
        <div className="mb-5 inline-flex rounded-xl bg-white/5 p-1" role="tablist" aria-label="Road to Mainnet phases">
          {tabs.map((t) => {
            const selected = tab === t;
            return (
              <button
                key={t}
                type="button"
                id={`road-to-mainnet-tab-${t}`}
                onClick={() => handleTabSelect(t)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${selected ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white/90'}`}
                role="tab"
                aria-selected={selected}
                aria-controls={`road-to-mainnet-panel-${t}`}
                data-road-to-mainnet-tab={t}
              >
                {TAB_LABELS[t]}
              </button>
            );
          })}
        </div>

        <div
          id={`road-to-mainnet-panel-${tab}`}
          role="tabpanel"
          aria-labelledby={`road-to-mainnet-tab-${tab}`}
          data-road-to-mainnet-panel={tab}
        >
          <ul className="space-y-2">
            {MILESTONES[tab].map((m, i) => (
              <li key={i} className="flex items-start gap-3">
                {m.done ? (
                  <img src={CheckIconUrl} alt="" className="mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />
                )}
                <span className="text-sm leading-6 text-white/90">{m.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
