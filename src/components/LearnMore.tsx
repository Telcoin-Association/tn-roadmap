import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { Phase, Status } from '../data/statusSchema';
import { ChevronIcon, ExternalLinkIcon, InfoIcon } from './icons';

type LearnMoreProps = {
  phases: Phase[];
  links: Status['links'];
};

export function LearnMore({ phases, links }: LearnMoreProps) {
  const defaultOpenId = phases[0]?.key ?? null;
  const [openId, setOpenId] = useState<Phase['key'] | null>(defaultOpenId);
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
    setOpenId((current) => (current === id ? null : id));
  };

  const linkButtons = [
    { label: 'Governance Forum', href: links.governanceForum },
    { label: 'Technical Docs', href: links.technicalDocs },
    { label: 'Faucet', href: 'https://www.telcoin.network/faucet' }
  ];

  return (
    <section aria-labelledby="learn-more-heading" className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/20 text-primary">
          <InfoIcon className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h2 id="learn-more-heading" className="text-xl font-bold text-fg">
            Learn more
          </h2>
          <p className="text-sm text-fg-muted">
            Dive deeper into each network phase and the documentation supporting the roadmap.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {questions.map((question) => {
          const isOpen = openId === question.id;
          const content = (summaries[question.id] ?? 'Details coming soon.').split('\n\n');
          return (
            <article
              key={question.id}
              id={`learn-more-${question.id}`}
              className="overflow-hidden rounded-2xl border-2 border-border/60 bg-card shadow-soft backdrop-blur"
            >
              <motion.button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left focus-visible:outline-none"
                aria-expanded={isOpen}
                aria-controls={`${question.id}-panel`}
                onClick={() => toggle(question.id)}
                whileTap={{ scale: 0.99 }}
              >
                <span className="flex items-center gap-3 text-base font-semibold text-fg">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 text-primary">
                    <InfoIcon className="h-5 w-5" />
                  </span>
                  {question.title}
                </span>
                <span aria-hidden="true" className={`transition-transform ${isOpen ? 'rotate-90' : ''}`}>
                  <ChevronIcon className="h-4 w-4" />
                </span>
              </motion.button>
              <div
                id={`${question.id}-panel`}
                role="region"
                aria-live="polite"
                aria-hidden={!isOpen}
                className={`px-6 pb-6 text-sm leading-relaxed text-fg-muted transition-[max-height,opacity] duration-300 ease-out ${isOpen ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="space-y-3">
                  {content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-3">
        {linkButtons.map((link) => (
          <motion.a
            key={link.label}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-fg shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:text-primary"
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            whileHover={{ y: -4 }}
            whileFocus={{ y: -2 }}
          >
            {link.label}
            <ExternalLinkIcon className="h-4 w-4" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
