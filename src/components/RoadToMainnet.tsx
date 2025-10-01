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

    const mount = document.getElementById('issues-feed');
    if (!mount) {
      return;
    }

    type IssueLike = {
      title?: string;
      url?: string;
      html_url?: string;
      number?: number | string;
      id?: number | string;
      updated_at?: string;
      updatedAt?: string;
      updated?: string;
    };

    const normalize = (data: unknown): IssueLike[] => {
      if (Array.isArray(data)) {
        return data as IssueLike[];
      }

      if (data && typeof data === 'object') {
        const obj = data as Record<string, unknown>;

        if (obj.phases && typeof obj.phases === 'object') {
          return Object.values(obj.phases as Record<string, IssueLike[]>).flat();
        }

        if (Array.isArray(obj.issues)) {
          return obj.issues as IssueLike[];
        }

        if (Array.isArray(obj.items)) {
          return obj.items as IssueLike[];
        }
      }

      return [];
    };

    let cancelled = false;
    mount.textContent = 'Loading…';

    const url = new URL('roadmap.json', window.location.href);
    url.searchParams.set('t', Date.now().toString());

    fetch(url.toString(), { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((raw) => {
        if (cancelled) {
          return;
        }

        console.log('[Track Issues] raw roadmap.json:', raw);
        const list = normalize(raw);
        console.log('[Track Issues] normalized issues:', list);

        if (!list.length) {
          mount.innerHTML = "<div style='opacity:.7'>No open issues.</div>";
          return;
        }

        const pageSize = 10;
        const totalPages = Math.max(1, Math.ceil(list.length / pageSize));
        let page = 0;

        const createCard = (issue: IssueLike) => {
          const card = document.createElement('article');
          card.style.cssText =
            'padding:12px;border:1px solid #23304a;border-radius:12px;background:#0f1a33;';

          const a = document.createElement('a');
          a.href =
            (typeof issue.url === 'string' && issue.url) ||
            (typeof issue.html_url === 'string' && issue.html_url) ||
            '#';
          a.target = '_blank';
          a.rel = 'noopener';
          a.style.cssText = 'font-weight:600;text-decoration:none;color:#cfe8ff;';
          a.textContent =
            (typeof issue.title === 'string' && issue.title) || '(untitled issue)';

          const meta = document.createElement('div');
          meta.style.cssText = 'margin-top:6px;font-size:12px;opacity:.75;color:#cfe8ff;';
          const id =
            (typeof issue.number !== 'undefined' && issue.number) ??
            (typeof issue.id !== 'undefined' && issue.id) ??
            '—';
          const dt =
            (typeof issue.updated_at === 'string' && issue.updated_at) ||
            (typeof issue.updatedAt === 'string' && issue.updatedAt) ||
            (typeof issue.updated === 'string' && issue.updated) ||
            null;
          const when = dt ? new Date(dt).toLocaleDateString() : '—';
          meta.textContent = `#${id} • updated ${when}`;

          card.append(a, meta);
          return card;
        };

        const renderPage = () => {
          const frag = document.createDocumentFragment();
          const items = list.slice(page * pageSize, page * pageSize + pageSize);

          const grid = document.createElement('div');
          grid.style.cssText = 'display:grid;gap:12px;';
          items.forEach((issue) => {
            grid.appendChild(createCard(issue));
          });
          frag.appendChild(grid);

          if (totalPages > 1) {
            const nav = document.createElement('div');
            nav.style.cssText =
              'display:flex;align-items:center;justify-content:flex-end;gap:12px;margin-top:12px;';

            const status = document.createElement('span');
            status.style.cssText = 'font-size:12px;color:#cfe8ffb3;';
            status.textContent = `Page ${page + 1} of ${totalPages}`;

            const buttonStyle = (btn: HTMLButtonElement) => {
              btn.style.cssText =
                'border:1px solid #23304a;border-radius:9999px;background:transparent;color:#cfe8ff;padding:6px 12px;font-size:12px;font-weight:600;display:flex;align-items:center;gap:4px;transition:opacity .2s ease;';
              btn.style.opacity = btn.disabled ? '0.35' : '1';
              btn.style.cursor = btn.disabled ? 'not-allowed' : 'pointer';
            };

            const prev = document.createElement('button');
            prev.type = 'button';
            prev.textContent = '‹ Prev';
            prev.disabled = page === 0;
            buttonStyle(prev);
            prev.addEventListener('click', () => {
              if (page === 0) {
                return;
              }
              page -= 1;
              renderPage();
            });

            const next = document.createElement('button');
            next.type = 'button';
            next.textContent = 'Next ›';
            next.disabled = page >= totalPages - 1;
            buttonStyle(next);
            next.addEventListener('click', () => {
              if (page >= totalPages - 1) {
                return;
              }
              page += 1;
              renderPage();
            });

            nav.append(prev, status, next);
            frag.appendChild(nav);
          }

          mount.innerHTML = '';
          mount.appendChild(frag);
        };

        renderPage();
      })
      .catch((err) => {
        if (cancelled) {
          return;
        }

        const message = err instanceof Error ? err.message : String(err);
        mount.innerHTML = `<pre style="white-space:pre-wrap;color:#ff6b6b;background:#131c33;border:1px solid #23304a;border-radius:12px;padding:12px;">Failed to load roadmap.json\n${message}</pre>`;
      });

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

      <div className="rounded-[16px] border-[0.4px] border-[#C9CFED99] bg-[#172552] p-[6px] shadow-soft backdrop-blur">
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
        <div className="rounded-[16px] border-[0.4px] border-[#C9CFED99] bg-[#172552] p-[6px]">
          {tab === 'issues' ? (
            <div id="issues-feed" style={{ display: 'grid', gap: '12px' }} />
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
