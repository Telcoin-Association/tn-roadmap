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

type IssueLabel = { id: number; name: string };

type Issue = {
  id: number;
  number: number;
  title: string;
  html_url: string;
  updated_at: string;
  labels: IssueLabel[];
  pull_request?: unknown;
};

const ISSUES_API_URL =
  'https://api.github.com/repos/Telcoin-Association/telcoin-network/issues?state=open&per_page=100';

export default function RoadToMainnet() {
  const [tab, setTab] = useState<TabKey>('horizon');
  const [issuesState, setIssuesState] = useState<{
    status: 'idle' | 'loading' | 'error' | 'success';
    data: Issue[];
  }>({ status: 'idle', data: [] });

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
    if (tab !== 'issues' || issuesState.status !== 'idle') {
      return;
    }

    let isMounted = true;
    setIssuesState({ status: 'loading', data: [] });

    const controller = new AbortController();

    const fetchIssues = async () => {
      try {
        const res = await fetch(ISSUES_API_URL, {
          headers: { Accept: 'application/vnd.github+json' },
          signal: controller.signal
        });

        if (!res.ok) {
          throw new Error('Request failed');
        }

        const payload = (await res.json()) as Issue[];
        const issues = payload.filter((issue) => !issue.pull_request);

        if (isMounted) {
          setIssuesState({ status: 'success', data: issues });
        }
      } catch (error) {
        if (!isMounted || (error instanceof DOMException && error.name === 'AbortError')) {
          return;
        }

        setIssuesState({ status: 'error', data: [] });
      }
    };

    fetchIssues();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [tab, issuesState.status]);

  const renderIssues = () => {
    if (issuesState.status === 'loading') {
      return <div className="text-sm text-white/80">Loading open issues…</div>;
    }

    if (issuesState.status === 'error') {
      return <div className="text-sm text-white/80">Couldn’t load issues.</div>;
    }

    if (issuesState.status === 'success' && issuesState.data.length === 0) {
      return <div className="text-sm text-white/80">No open issues.</div>;
    }

    return issuesState.data.map((issue) => {
      const updatedAt = new Date(issue.updated_at).toLocaleDateString();
      return (
        <article
          key={issue.id}
          className="rounded-xl border border-white/15 bg-white/10 p-4 text-sm text-white/90 transition hover:border-white/25 hover:bg-white/15"
        >
          <a
            href={issue.html_url}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-white hover:underline"
          >
            {issue.title}
          </a>
          {issue.labels?.length ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {issue.labels.map((label) => (
                <span
                  key={label.id ?? `${issue.id}-${label.name}`}
                  className="inline-flex items-center rounded-full border border-white/20 px-2 py-0.5 text-xs text-white/80"
                >
                  {label.name}
                </span>
              ))}
            </div>
          ) : null}
          <div className="mt-2 text-xs text-white/60">#{issue.number} • updated {updatedAt}</div>
        </article>
      );
    });
  };

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
            <section
              id="issues"
              className="grid gap-3"
              aria-live={issuesState.status === 'loading' ? 'polite' : 'off'}
            >
              {renderIssues()}
            </section>
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
