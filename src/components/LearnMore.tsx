import { useEffect, useMemo, useState } from 'react';
import type { Phase, Status } from '../data/statusSchema';
import { ChevronIcon, ExternalLinkIcon, InfoIcon } from './icons';

type LearnMoreProps = {
  phases: Phase[];
  links: Status['links'];
};

export function LearnMore({ phases, links }: LearnMoreProps) {
  const defaultOpenId = phases[0]?.key ?? 'devnet';
  const [openId, setOpenId] = useState<Phase['key']>(defaultOpenId);
  useEffect(() => {
    setOpenId(defaultOpenId);
  }, [defaultOpenId]);

  const summaries = phases.reduce<Record<Phase['key'], string>>((acc, phase) => {
    acc[phase.key] = phase.summary;
    return acc;
  }, Object.create(null));

  const questions = useMemo(
    () => phases.map((phase) => ({ id: phase.key, title: `What is ${phase.title}?` })),
    [phases]
  );

  const toggle = (id: Phase['key']) => {
    setOpenId(id);
  };

  const linkButtons = [
    { label: 'Governance Forum', href: links.governanceForum },
    { label: 'Technical Docs', href: links.technicalDocs },
    { label: 'Audit Reports', href: links.auditReports }
  ];

  return (
    <section aria-labelledby="learn-more-heading" className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#16c8ff]/15">
          <InfoIcon className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h2 id="learn-more-heading" className="text-xl font-semibold text-slate-900 dark:text-white">
            Learn more
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Dive deeper into each network phase and the documentation supporting the roadmap.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {questions.map((question) => {
          const isOpen = openId === question.id;
          return (
            <article key={question.id} className="overflow-hidden rounded-2xl border border-white/25 bg-white/80 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left focus-visible:outline-none"
                aria-expanded={isOpen}
                aria-controls={`${question.id}-panel`}
                onClick={() => toggle(question.id)}
              >
                <span className="flex items-center gap-3 text-base font-semibold text-slate-900 dark:text-slate-100">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#16c8ff]/15">
                    <InfoIcon className="h-5 w-5" />
                  </span>
                  {question.title}
                </span>
                <span aria-hidden="true" className={`transition-transform ${isOpen ? 'rotate-90' : ''}`}>
                  <ChevronIcon className="h-4 w-4" />
                </span>
              </button>
              <div
                id={`${question.id}-panel`}
                role="region"
                aria-live="polite"
                aria-hidden={!isOpen}
                className={`px-6 pb-6 text-sm leading-relaxed text-slate-600 transition-[max-height,opacity] duration-300 ease-out dark:text-slate-300 ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                {summaries[question.id] ?? 'Details coming soon.'}
              </div>
            </article>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-3">
        {linkButtons.map((link) => (
          <a
            key={link.label}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:text-[#16c8ff] dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
          >
            {link.label}
            <ExternalLinkIcon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </section>
  );
}
