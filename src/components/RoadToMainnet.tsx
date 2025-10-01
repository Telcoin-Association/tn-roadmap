import { useEffect, useState } from 'react';
import type { PhaseKey } from '@/data/milestones';
import { MILESTONES } from '@/data/milestones';
import { ROAD_TO_MAINNET_SECTION_ID, roadToMainnetId } from '@/utils/ids';

type TabKey = PhaseKey | 'issues';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'horizon', label: 'Horizon' },
  { key: 'adiri', label: 'Adiri' },
  { key: 'mainnet', label: 'Mainnet' },
  { key: 'issues', label: 'Track Issues' }
];

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export default function RoadToMainnet() {
  const [tab, setTab] = useState<TabKey>('horizon');

  // On hash change or first load, infer tab from '#road-to-mainnet-{phase}-...'
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const applyFromHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      const part = hash.split('-')[3] as PhaseKey | undefined; // road to mainnet {phase} ...
      if (part && TABS.some((t) => t.key === part)) {
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

  useEffect(() => {
    if (tab !== 'issues' || typeof window === 'undefined') {
      return;
    }

    const el = document.getElementById('issues');
    if (!el) {
      return;
    }

    let cancelled = false;
    el.innerHTML = 'Loading…';

    (async () => {
      try {
        const response = await fetch("roadmap.json", { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        if (cancelled) {
          return;
        }

        if (!Array.isArray(data) || data.length === 0) {
          el.innerHTML = "<div style='opacity:.7'>No open issues.</div>";
          return;
        }

        const markup = data
          .map((item) => {
            if (
              typeof item !== 'object' ||
              item === null ||
              typeof item.number !== 'number' ||
              typeof item.title !== 'string' ||
              typeof item.url !== 'string' ||
              typeof item.updatedAt !== 'string'
            ) {
              return '';
            }

            const formattedDate = new Date(item.updatedAt).toLocaleDateString();
            const safeTitle = escapeHtml(item.title);
            const safeUrl = escapeHtml(item.url);

            return `
      <article style="padding:12px;border:1px solid #e5e7eb;border-radius:12px;background:#fff">
        <a href="${safeUrl}" target="_blank" rel="noopener" style="font-weight:600;text-decoration:none">
          ${safeTitle}
        </a>
        <div style="margin-top:6px;font-size:12px;opacity:.75">
          #${item.number} • updated ${formattedDate}
        </div>
      </article>
    `;
          })
          .filter(Boolean)
          .join('');

        el.innerHTML = markup || "<div style='opacity:.7'>No open issues.</div>";
      } catch (error) {
        if (cancelled) {
          return;
        }

        const message = error instanceof Error && error.message ? error.message : String(error);
        el.innerHTML = `<pre style="white-space:pre-wrap;color:#b91c1c">Failed to load roadmap.json\n${escapeHtml(message)}</pre>`;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [tab]);

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
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                tab === key ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white/90'
              }`}
              aria-pressed={tab === key}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Detail list */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          {tab === 'issues' ? (
            <section id="issues" style={{ display: 'grid', gap: '12px' }} />
          ) : (
            <ul className="space-y-6">
              {MILESTONES[tab].map((m) => (
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
          )}
        </div>
      </div>
    </section>
  );
}
