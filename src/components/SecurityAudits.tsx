import { useEffect, useState } from 'react';

import { buildDeveloperNoteSections } from '../data/developerNotes';
import type { Status } from '../data/statusSchema';

type SecurityAuditsProps = Pick<Status['security'], 'notes'>;

type ClosedPullRequest = {
  number: number;
  title: string;
  url: string;
  closed_at: string;
};

const CLOSED_PRS_PAGE_SIZE = 5;

function ClosedPullRequestsFeed() {
  const [prs, setPrs] = useState<ClosedPullRequest[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const url = new URL('closed-prs.json', window.location.href);
    url.searchParams.set('t', Date.now().toString());

    fetch(url.toString(), { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((data: ClosedPullRequest[]) => {
        if (!cancelled) {
          setPrs(data);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const totalPages = prs ? Math.max(1, Math.ceil(prs.length / CLOSED_PRS_PAGE_SIZE)) : 1;
  const pagePrs = prs ? prs.slice(page * CLOSED_PRS_PAGE_SIZE, page * CLOSED_PRS_PAGE_SIZE + CLOSED_PRS_PAGE_SIZE) : [];

  return (
    <article className="flex flex-1 flex-col gap-4 rounded-[16px] border-[0.4px] border-[#C9CFED99] bg-[#172552] p-5 shadow-soft backdrop-blur transition-all duration-300 hover:border-primary/40 hover:shadow-glow">
      <header className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
          <img
            src="/IMG/Audit.svg"
            alt=""
            aria-hidden="true"
            className="h-6 w-6 shrink-0"
            loading="eager"
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-fg">Recently Closed Pull Requests</h3>
          <p className="text-xs text-fg-muted">
            Closed in the telcoin-network repository over the last 30 days.
          </p>
        </div>
      </header>

      {error ? (
        <p className="text-sm text-red-400">Failed to load closed pull requests.</p>
      ) : prs === null ? (
        <p className="text-sm text-fg-muted">Loading…</p>
      ) : prs.length === 0 ? (
        <p className="text-sm text-fg-muted">No pull requests closed in the last 30 days.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {pagePrs.map((pr) => (
              <li key={pr.number}>
                <a
                  href={pr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border border-white/10 bg-white/5 p-3 text-fg backdrop-blur transition hover:border-primary/40"
                >
                  <span className="text-sm font-medium">{pr.title}</span>
                  <span className="mt-1 block text-xs text-fg-muted">
                    #{pr.number} • closed {new Date(pr.closed_at).toLocaleDateString()}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          {totalPages > 1 && (
            <div className="mt-auto flex items-center justify-between gap-3 pt-2 text-xs text-fg-muted">
              <span>
                Page {page + 1} of {totalPages}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(p - 1, 0))}
                  disabled={page === 0}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-fg transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
                  disabled={page === totalPages - 1}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-fg transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </article>
  );
}

export function SecurityAudits({ notes }: SecurityAuditsProps) {
  const developerNoteSections = buildDeveloperNoteSections(notes);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = developerNoteSections.length;
  const currentSection = developerNoteSections[currentPage];

  return (
    <section aria-labelledby="security-heading" className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/20 text-primary">
          <img
            src="/IMG/Audit.svg"
            alt="Latest updates"
            className="h-6 w-6 md:h-7 md:w-7 shrink-0"
            loading="eager"
          />
        </div>
        <div className="space-y-1">
          <h2 id="security-heading" className="text-xl font-bold text-fg">
            Latest Updates
          </h2>
          <p className="text-sm text-fg-muted">
            A summary of the latest development milestones, security improvements, and outstanding items on the path to Mainnet.
          </p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <article className="flex h-full flex-col rounded-[16px] border-[0.4px] border-[#C9CFED99] bg-[#172552] p-6 shadow-soft backdrop-blur transition-all duration-300 hover:border-primary/40 hover:shadow-glow">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-fg">{currentSection.title}</h3>
            <ul className="mt-4 space-y-3 text-sm text-fg-muted">
              {currentSection.items.map((note) => (
                <li key={note} className="flex items-start gap-3">
                  <img
                    src="/IMG/Checkmark.svg"
                    alt="Developer note"
                    className="h-5 w-5 md:h-6 md:w-6 shrink-0"
                    loading="eager"
                  />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6 text-xs text-fg-muted">
            <span>
              Page {currentPage + 1} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(page - 1, 0))}
                disabled={currentPage === 0}
                className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-fg transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages - 1))}
                disabled={currentPage === totalPages - 1}
                className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-fg transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </article>
        <div className="flex flex-col gap-4">
          <ClosedPullRequestsFeed />
        </div>
      </div>
    </section>
  );
}
