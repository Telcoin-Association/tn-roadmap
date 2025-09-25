import { useState } from 'react';
import type { Phase, Status } from '../data/statusSchema';

type LearnMoreProps = {
  phases: Phase[];
  links: Status['links'];
};

const QUESTIONS: { id: Phase['key']; title: string }[] = [
  { id: 'devnet', title: 'What is Devnet?' },
  { id: 'testnet', title: 'What is Public Testnet?' },
  { id: 'mainnet', title: 'What is Mainnet?' }
];

export function LearnMore({ phases, links }: LearnMoreProps) {
  const [openId, setOpenId] = useState<Phase['key']>('devnet');

  const summaries = phases.reduce<Record<Phase['key'], string>>((acc, phase) => {
    acc[phase.key] = phase.summary;
    return acc;
  }, Object.create(null));

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
      <div className="space-y-1">
        <h2 id="learn-more-heading" className="text-xl font-semibold text-slate-900 dark:text-white">
          Learn more
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Dive deeper into each network phase and the documentation supporting the roadmap.
        </p>
      </div>
      <div className="space-y-4">
        {QUESTIONS.map((question) => {
          const isOpen = openId === question.id;
          return (
            <article key={question.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left focus-visible:outline-none"
                aria-expanded={isOpen}
                aria-controls={`${question.id}-panel`}
                onClick={() => toggle(question.id)}
              >
                <span className="text-base font-semibold text-slate-900 dark:text-slate-100">{question.title}</span>
                <span aria-hidden="true" className={`transition-transform ${isOpen ? 'rotate-90' : ''}`}>
                  ›
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
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-soft transition hover:-translate-y-0.5 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
          >
            {link.label}
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
