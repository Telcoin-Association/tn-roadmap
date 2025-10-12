import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { PhaseKey } from '@/data/milestones';
import { MILESTONES } from '@/data/milestones';
import { ROAD_TO_MAINNET_SECTION_ID, roadToMainnetId } from '@/utils/ids';

import { ExternalLinkIcon } from './icons';
import ActivityIconUrl from '/IMG/activity.svg?url';

type CustomItem = { text: string; slug: string; description?: string };

const SHARED_ADIRI_PHASE_3_ITEMS: CustomItem[] = [
  { text: 'MVP demonstrating EVM + BFT consensus', slug: 'mvp-demonstrating-evm-bft-consensus' },
  { text: 'Demo at MWC', slug: 'demo-at-mwc' },
  { text: 'Expand development team', slug: 'expand-development-team' },
  { text: 'Open-source codebase', slug: 'open-source-codebase' },
  { text: 'Upgrade p2p network layer', slug: 'upgrade-p2p-network-layer' },
  { text: 'Consensus smart contract security assessment', slug: 'consensus-smart-contract-security-assessment' },
];

const ADIRI_PHASE_3_ITEMS: CustomItem[] = [
  {
    text: 'Integrate Adiri Testnet with Bridge Solution',
    slug: 'integrate-adiri-testnet-with-bridge-solution',
    description:
      'Connect the Adiri testnet to a cross-chain bridge, enabling the movement of assets like TEL and stablecoins between the Telcoin Network and external chains for testing interoperability.',
  },
  {
    text: 'Decentralize Network (Onboard MNO Validators)',
    slug: 'decentralize-network-onboard-mno-validators',
    description:
      'Transition from TAO-operated validators to a broader, decentralized set by onboarding mobile network operators (MNOs) as validators, aligning governance with GSMA standards and expanding security through diverse participation.',
  },
];

const MAINNET_PHASE_ITEMS: CustomItem[] = [
  { text: 'Cryptography security assessment', slug: 'cryptography-security-assessment' },
  { text: 'P2P Network security assessment', slug: 'p2p-network-security-assessment' },
  { text: 'Smart contract security assessments', slug: 'smart-contract-security-assessments' },
  { text: 'Execution layer security assessment', slug: 'execution-layer-security-assessment' },
  { text: 'State synchronization security assessment', slug: 'state-synchronization-security-assessment' },
  { text: 'Patch security findings', slug: 'patch-security-findings' },
];

const HISTORY_ITEMS: CustomItem[] = SHARED_ADIRI_PHASE_3_ITEMS.map((item) => ({
  ...item,
  slug: `history-${item.slug}`,
}));

const ACTIVE_PHASE_2_SLUGS = new Set<string>([
  'patch-security-findings',
  'enhance-test-coverage',
  'improve-documentation',
]);

type TabKey = PhaseKey | 'adiri-phase-3' | 'history' | 'issues';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'horizon', label: 'Adiri Phase 1' },
  { key: 'adiri', label: 'Adiri Phase 2' },
  { key: 'adiri-phase-3', label: 'Adiri Phase 3' },
  { key: 'mainnet', label: 'Mainnet' },
  { key: 'issues', label: 'Track Issues' },
  { key: 'history', label: 'History' }
];

const isTabKey = (value: string): value is TabKey => TABS.some((tab) => tab.key === value);

const isPhaseKey = (value: TabKey): value is 'horizon' | 'adiri' => value === 'horizon' || value === 'adiri';

export default function RoadToMainnet() {
  const [tab, setTab] = useState<TabKey>('horizon');
  const reduceMotion = useReducedMotion();

  // On hash change or first load, infer tab from '#road-to-mainnet-{phase}-...'
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const applyFromHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      const part = hash.split('-')[3]; // road to mainnet {phase} ...
      if (part && isTabKey(part)) {
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
    const part = hash.split('-')[3];
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

        console.log('[Track Issues feed] raw roadmap.json:', raw);
        const list = normalize(raw);
        console.log('[Track Issues feed] normalized issues:', list);

        if (!list.length) {
          mount.innerHTML = "<div style='opacity:.7'>No open issues.</div>";
          return;
        }

        const pageSize = 5;
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
      if (mount.id === 'issues-feed') {
        mount.replaceChildren();
        mount.textContent = '';
      }
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

      <div
        id={`road-to-mainnet-${tab}-tab`}
        className="rounded-[16px] border-[0.4px] border-[#C9CFED99] bg-[#172552] p-6 shadow-soft backdrop-blur"
      >
        {/* Tabs */}
        <div className="mx-auto mb-5 flex flex-wrap justify-center gap-2 rounded-xl bg-white/5 p-1 sm:gap-1">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                tab === key ? 'bg-white/15 text-white' : 'text-white/70 hover:text-white/90'
              }`}
              aria-pressed={tab === key}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Detail list */}
        <div className="rounded-[16px] bg-[#172552] p-6">
          {tab === 'issues' ? (
            <div key="issues" id="issues-feed" style={{ display: 'grid', gap: '12px' }} />
          ) : tab === 'adiri-phase-3' ? (
            <ul key="adiri-phase-3" className="space-y-4">
              {ADIRI_PHASE_3_ITEMS.map((item) => (
                <li key={item.slug} className="flex items-start gap-3">
                  <img
                    src="/IMG/Loading.svg"
                    alt=""
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 motion-safe:animate-spin-slow"
                  />
                  <div className="space-y-1 text-sm text-white/90">
                    <div className="font-semibold">{item.text}</div>
                    {item.description && (
                      <p className="text-white/75">{item.description}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : tab === 'mainnet' ? (
            <ul key="mainnet" className="space-y-4">
              {MAINNET_PHASE_ITEMS.map((item) => (
                <li key={item.slug} className="flex items-start gap-3">
                  <img
                    src="/IMG/Loading.svg"
                    alt=""
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 motion-safe:animate-spin-slow"
                  />
                  <span className="text-sm font-semibold text-white/90">{item.text}</span>
                </li>
              ))}
            </ul>
          ) : tab === 'history' ? (
            <div key="history" className="space-y-6">
              <ul className="space-y-4">
                {HISTORY_ITEMS.map((item) => (
                  <li key={item.slug} className="flex items-start gap-3">
                    <img
                      src="/IMG/Checkmark.svg"
                      alt=""
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0"
                    />
                    <span className="text-sm font-semibold text-white/90">{item.text}</span>
                  </li>
                ))}
              </ul>
              <div>
                <a
                  href="https://github.com/orgs/Telcoin-Association/projects/2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/80"
                >
                  Github closed issues
                  <ExternalLinkIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          ) : isPhaseKey(tab) ? (
            <ul key={tab} className="space-y-6">
              {MILESTONES[tab].map((m) => {
                const isActivePhase2Item = tab === 'adiri' && ACTIVE_PHASE_2_SLUGS.has(m.slug);
                const shouldAnimateHeading = isActivePhase2Item && !reduceMotion;

                return (
                  <li key={m.slug} id={roadToMainnetId(tab, m.slug)} className="scroll-mt-24">
                    {isActivePhase2Item ? (
                      <motion.div
                        className="text-sm font-semibold text-white/90"
                        animate={shouldAnimateHeading ? { opacity: [1, 0.5, 1] } : undefined}
                        transition={
                          shouldAnimateHeading
                            ? {
                                duration: 1.2,
                                repeat: Infinity,
                                repeatType: 'reverse',
                                ease: 'easeInOut',
                              }
                            : undefined
                        }
                      >
                        {m.text}
                      </motion.div>
                    ) : (
                      <div className="text-sm font-semibold text-white/90">{m.text}</div>
                    )}
                  {m.details && m.details.length > 0 && (
                    <ul className="mt-2 space-y-3">
                      {m.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <img
                            src={
                              isActivePhase2Item
                                ? ActivityIconUrl
                                : tab === 'horizon'
                                ? '/IMG/Checkmark.svg'
                                : '/IMG/Loading.svg'
                            }
                            alt=""
                            aria-hidden="true"
                            className={`mt-0.5 h-5 w-5 shrink-0${
                              !isActivePhase2Item && tab === 'adiri'
                                ? ' motion-safe:animate-spin-slow'
                                : ''
                            }`}
                          />
                          <span className={`text-sm leading-6 ${isActivePhase2Item ? 'text-white' : 'text-white/80'}`}>
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
