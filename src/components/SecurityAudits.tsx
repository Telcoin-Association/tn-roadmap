import type { ReactNode } from 'react';

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
  description,
  metrics,
  icon
}: {
  title: string;
  description?: string;
  metrics: Record<string, number>;
  icon: ReactNode;
}) {
  const entries = Object.entries(metrics);
  return (
    <article className="flex flex-1 flex-col gap-4 rounded-[16px] border-[0.4px] border-[#C9CFED99] bg-[#172552] p-5 shadow-soft backdrop-blur">
      <header className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
          {icon}
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-fg">{title}</h3>
          {description ? (
            <p className="text-xs text-fg-muted">{description}</p>
          ) : null}
        </div>
      </header>
      <dl className="grid grid-cols-2 gap-4 text-sm">
        {entries.map(([key, value]) => (
          <div key={key} className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-3 text-fg backdrop-blur">
            <dt className="text-xs uppercase tracking-wide text-fg-muted">
              {STAT_LABELS[key] ?? key}
            </dt>
            <dd className="text-xl font-semibold text-fg">{value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export function SecurityAudits({ notes, publicFindings, afterPriorityFixes }: SecurityAuditsProps) {
  return (
    <section aria-labelledby="security-heading" className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/20 text-primary">
          <img
            src="/IMG/Audit.svg"
            alt="Security and Audits"
            className="h-6 w-6 md:h-7 md:w-7 shrink-0"
            loading="eager"
          />
        </div>
        <div className="space-y-1">
          <h2 id="security-heading" className="text-xl font-bold text-fg">
            Security and Audits
          </h2>
          <p className="text-sm text-fg-muted">
            Highlights from recent reviews and what remains before mainnet readiness.
          </p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <article className="rounded-[16px] border-[0.4px] border-[#C9CFED99] bg-[#172552] p-6 shadow-soft backdrop-blur">
          <h3 className="text-lg font-semibold text-fg">Security notes</h3>
          <ul className="mt-4 space-y-3 text-sm text-fg-muted">
            {notes.map((note) => (
              <li key={note} className="flex items-start gap-3">
                <img
                  src="/IMG/Checkmark.svg"
                  alt="Security note"
                  className="h-5 w-5 md:h-6 md:w-6 shrink-0"
                  loading="eager"
                />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </article>
        <div className="flex flex-col gap-4">
          <StatCard
            title="Priority Security Patches"
            description="Security issues reachable through public APIs, apps, or network endpoints."
            metrics={publicFindings}
            icon={
              <img
                src="/IMG/Audit.svg"
                alt="Public-facing vulnerabilities"
                className="h-6 w-6 md:h-7 md:w-7 shrink-0"
                loading="eager"
              />
            }
          />
          <StatCard
            title="Remaining Security Patches"
            description="Issues relevant to validator peers and internal infrastructure, prioritized after public-facing fixes."
            metrics={afterPriorityFixes}
            icon={
              <img
                src="/IMG/Audit.svg"
                alt="Internal security findings"
                className="h-6 w-6 md:h-7 md:w-7 shrink-0"
                loading="eager"
              />
            }
          />
        </div>
      </div>
    </section>
  );
}
