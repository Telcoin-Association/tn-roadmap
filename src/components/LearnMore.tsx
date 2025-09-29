import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import HorizonLogoUrl from '@/assets/horizon.svg?url';
import AdiriLogoUrl from '@/assets/adiri.svg?url';
import type { Phase, Status } from '../data/statusSchema';
import { ChevronIcon, ExternalLinkIcon, InfoIcon } from './icons';

const MAINNET_LOGO_URL = '/IMG/Mainnet.svg';

type LearnMoreProps = {
  phases: Phase[];
  links: Status['links'];
};

const LEARN_MORE_CONTENT: Record<Phase['key'], { title: string; body: string[] }> = {
  devnet: {
    title: 'What is Horizon',
    body: [
      "Horizon is the name for the Telcoin Network’s development environment (previously called Devnet). It’s where new features, protocol upgrades, and network improvements are first deployed and tested by the core engineering team.",
      "At this stage, the focus is on fixing the last set of high-priority security findings and validating that all the moving parts of the network perform as expected. Horizon isn’t designed for public use—it’s primarily an internal proving ground—but it plays a critical role in unblocking progress to the next stage, Adiri. Once Horizon reaches stability, the network will be ready for broader testing with external partners."
    ]
  },
  testnet: {
    title: 'What is Adiri',
    body: [
      'Adiri is the Telcoin Network’s public testnet, where the community and partners—including mobile network operators (MNOs) spinning up validator nodes—can interact with the network in a live but non-production setting.',
      'This stage follows Horizon stabilization and will roll out in phases. Early iterations of Adiri may still see instability or bugs as the network undergoes continuous upgrades and audit cycles. That’s intentional: Adiri is where real-world testing happens, and where we make sure validator participation, governance mechanics, and protocol updates all function securely before moving to mainnet.',
      'Adiri represents a critical milestone because it’s the first time the broader ecosystem—validators, developers, and community members—can meaningfully engage with the Telcoin Network.'
    ]
  },
  mainnet: {
    title: 'What is Mainnet',
    body: [
      'Mainnet is the name for the Telcoin Network’s mainnet launch—the culmination of the Horizon and Adiri phases. Once Adiri has achieved stability and passed the final rounds of audits and the open security competition, the network will transition to Mainnet.',
      'Mainnet represents the full public launch of the Telcoin Network, where validators, developers, and users can rely on the system for real value transfer and application deployment. It’s the point at which the network moves from testing to production, with the security and decentralization guarantees expected of a Layer 1 blockchain.'
    ]
  }
};

export function LearnMore({ phases, links }: LearnMoreProps) {
  const orderedSections = useMemo(() => phases.map((phase) => ({ key: phase.key, status: phase.status })), [phases]);
  const defaultOpenId = useMemo(() => {
    const activePhase = orderedSections.find((section) => section.status === 'in_progress');
    return activePhase?.key ?? orderedSections[0]?.key ?? null;
  }, [orderedSections]);
  const [openId, setOpenId] = useState<Phase['key'] | null>(defaultOpenId);
  useEffect(() => {
    setOpenId(defaultOpenId);
  }, [defaultOpenId]);

  const sections = orderedSections.map((section) => ({
    id: section.key,
    title: LEARN_MORE_CONTENT[section.key]?.title ?? 'Learn more',
    body: LEARN_MORE_CONTENT[section.key]?.body ?? ['Details coming soon.']
  }));

  const toggle = (id: Phase['key']) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const linkButtons = [
    { label: 'Governance Forum', href: links.governanceForum },
    { label: 'Technical Docs', href: links.technicalDocs },
    { label: 'Faucet', href: 'https://www.telcoin.network/faucet' },
    { label: 'Telcoin Association', href: 'https://www.telcoin.org/' },
    { label: 'Telcoin TAO Twitter', href: 'https://x.com/TelcoinTAO' }
  ];

  return (
    <section aria-labelledby="learn-more-heading" className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/20 text-primary">
          <img
            src="/IMG/Info.svg"
            alt="Learn more"
            className="h-6 w-6 md:h-7 md:w-7 shrink-0"
            loading="eager"
          />
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
        {sections.map((section) => {
          const isOpen = openId === section.id;
          const t = section.title?.trim().toLowerCase();
          const isHorizon = t === 'what is horizon';
          const isAdiri = t === 'what is adiri';
          const isMainnet = t === 'what is mainnet';
          const rowLogo = isHorizon
            ? { src: HorizonLogoUrl, alt: 'Horizon logo' }
            : isAdiri
              ? { src: AdiriLogoUrl, alt: 'Adiri logo' }
              : isMainnet
                ? { src: MAINNET_LOGO_URL, alt: 'Mainnet logo' }
                : undefined;
          return (
            <article
              key={section.id}
              id={`learn-more-${section.id}`}
              className="overflow-hidden rounded-2xl border-2 border-border/60 bg-card shadow-soft backdrop-blur"
            >
              <motion.button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left focus-visible:outline-none"
                aria-expanded={isOpen}
                aria-controls={`${section.id}-panel`}
                onClick={() => toggle(section.id)}
                whileTap={{ scale: 0.99 }}
              >
                <span className="flex items-center gap-3 text-base font-semibold text-fg">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    {rowLogo ? (
                      <img
                        src={rowLogo.src}
                        alt={rowLogo.alt}
                        className="h-7 w-7 shrink-0 object-contain md:h-8 md:w-8"
                        loading="eager"
                        decoding="async"
                      />
                    ) : (
                      <InfoIcon className="h-5 w-5 md:h-6 md:w-6" />
                    )}
                  </div>
                  {section.title}
                </span>
                <span aria-hidden="true" className={`transition-transform ${isOpen ? 'rotate-90' : ''}`}>
                  <ChevronIcon className="h-4 w-4" />
                </span>
              </motion.button>
              <div
                id={`${section.id}-panel`}
                role="region"
                aria-live="polite"
                aria-hidden={!isOpen}
                className={`space-y-4 px-6 pb-6 text-sm leading-relaxed text-fg-muted transition-[max-height,opacity] duration-300 ease-out ${isOpen ? 'max-h-[720px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                {section.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
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
