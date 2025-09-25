import type { Status } from '../data/statusSchema';

type SecurityAuditsProps = Pick<Status['security'], 'notes' | 'publicFindings' | 'afterPriorityFixes'>;

const STAT_LABELS: Record<string, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
  info: 'Info'
};

function StatCard({
  title,
  metrics
}: {
  title: string;
  metrics: Record<string, number>;
}) {
  const entries = Object.entries(metrics);
  return (
    <article className="flex flex-1 flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <header>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      </header>
      <dl className="grid grid-cols-2 gap-4 text-sm">
        {entries.map(([key, value]) => (
          <div key={key} className="flex flex-col rounded-xl bg-slate-100/60 p-3 text-slate-700 dark:bg-slate-800/80 dark:text-slate-200">
            <dt className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {STAT_LABELS[key] ?? key}
            </dt>
            <dd className="text-xl font-semibold text-slate-900 dark:text-white">{value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export function SecurityAudits({ notes, publicFindings, afterPriorityFixes }: SecurityAuditsProps) {
  return (
    <section aria-labelledby="security-heading" className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 id="security-heading" className="text-xl font-semibold text-slate-900 dark:text-white">
            Security &amp; audits
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Highlights from recent reviews and what remains before mainnet readiness.
          </p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Security notes</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
            {notes.map((note) => (
              <li key={note} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </article>
        <div className="flex flex-col gap-4">
          <StatCard title="Priority Findings (public-facing)" metrics={publicFindings} />
          <StatCard title="After Priority Fixes (remaining)" metrics={afterPriorityFixes} />
        </div>
      </div>
    </section>
  );
}
