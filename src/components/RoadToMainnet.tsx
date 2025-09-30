import { useEffect, useMemo, useState } from 'react';
import type { PhaseKey } from '@/data/milestones';
import { MILESTONES } from '@/data/milestones';
import { ROAD_TO_MAINNET_SECTION_ID, roadToMainnetId } from '@/utils/ids';

const TABS: PhaseKey[] = ['horizon', 'adiri', 'mainnet'];

export default function RoadToMainnet() {
  const [tab, setTab] = useState<PhaseKey>('horizon');

  // On hash change or first load, infer tab from '#road-to-mainnet-{phase}-...'
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const applyFromHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      const part = hash.split('-')[3] as PhaseKey | undefined; // road to mainnet {phase} ...
      if (part && TABS.includes(part)) {
        setTab((prev) => (prev === part ? prev : part));
      }
    };

    applyFromHash();
    window.addEventListener('hashchange', applyFromHash);
    return () => window.removeEventListener('hashchange', applyFromHash);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const hash = window.location.hash.replace(/^#/, '');
    const part = hash.split('-')[3] as PhaseKey | undefined;
    if (part && part === tab) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [tab]);

  const items = useMemo(() => MILESTONES[tab], [tab]);

  return (
    <section
      id={ROAD_TO_MAINNET_SECTION_ID}
      aria-labelledby="road-to-mainnet-heading"
      data-road-to-mainnet=""
      className="space-y-6 scroll-mt-24"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/20 text-primary">
          <img
            src="/IMG/Bookmark.svg"
            alt="Road to Mainnet"
            className="h-6 w-6 shrink-0 md:h-7 md:w-7"
            loading="eager"
          />
        </div>
        <div className="space-y-1">
          <h2 id="road-to-mainnet-heading" className="text-xl font-bold text-fg">
            Road to Mainnet
          </h2>
          <p className="text-sm text-fg-muted">
            Milestones required to unlock mainnet launch readiness.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border-2 border-border/60 bg-card p-6 shadow-soft backdrop-blur">
        {/* Tabs */}
        <div className="mb-5 inline-flex rounded-xl bg-white/5 p-1">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                tab === t ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white/90'
              }`}
              aria-pressed={tab === t}
            >
              {t === 'horizon' ? 'Horizon' : t === 'adiri' ? 'Adiri' : 'Mainnet'}
            </button>
          ))}
        </div>

        {/* Detail list */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <ul className="space-y-6">
            {items.map((m) => (
              <li key={m.slug} id={roadToMainnetId(tab, m.slug)} className="scroll-mt-24">
                <div className="text-sm font-semibold text-white/90">{m.text}</div>
                {m.details && m.details.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 text-sm leading-6 text-white/80">
                    {m.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
