import type { Status } from '../data/statusSchema';
import { NetworkIcon, ShieldIcon, SparkIcon } from './icons';
import { SECTION_COPY } from '../data/sectionCopy';

type SecurityAuditsProps = Pick<Status['security'], 'notes' | 'publicFindings' | 'afterPriorityFixes'>;

const STAT_LABELS: Record<string, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
  info: 'Info'
};

function StatCard({
  title,
  metrics,
  icon: Icon
}: {
  title: string;
  metrics: Record<string, number>;
  icon: typeof NetworkIcon;
}) {
  const entries = Object.entries(metrics);
  return (
    <article className="flex flex-1 flex-col gap-4 rounded-2xl border-2 border-border/60 bg-card p-5 shadow-soft backdrop-blur">
      <header className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-semibold text-fg">{title}</h3>
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
          <ShieldIcon className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h2 id="security-heading" className="text-xl font-bold text-fg">
            {SECTION_COPY.security.heading}
          </h2>
          <p className="text-sm text-fg-muted">{SECTION_COPY.security.description}</p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <article className="rounded-2xl border-2 border-border/60 bg-card p-6 shadow-soft backdrop-blur">
          <h3 className="text-lg font-semibold text-fg">{SECTION_COPY.security.noteHeading}</h3>
          <ul className="mt-4 space-y-3 text-sm text-fg-muted">
            {notes.map((note) => (
              <li key={note} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-1">
                  <SparkIcon className="h-4 w-4 text-accent" />
                </span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </article>
        <div className="flex flex-col gap-4">
          <StatCard
            title={SECTION_COPY.security.priorityFindingsTitle}
            metrics={publicFindings}
            icon={NetworkIcon}
          />
          <StatCard
            title={SECTION_COPY.security.afterPriorityFixesTitle}
            metrics={afterPriorityFixes}
            icon={ShieldIcon}
          />
        </div>
      </div>
    </section>
  );
}
