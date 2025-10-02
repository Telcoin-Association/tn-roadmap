import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import AdiriLogoUrl from '@/assets/adiri.svg?url';
import type { Phase, Status } from '../data/statusSchema';
import { ChevronIcon, ExternalLinkIcon, InfoIcon } from './icons';

const MAINNET_LOGO_URL = '/IMG/Mainnet.svg';

type LearnMoreProps = {
  phases: Phase[];
  links: Status['links'];
};

type LearnMoreSection = { id: string; title: string; body: string[] };
type LearnMorePhaseSection = LearnMoreSection & { id: Phase['key'] };

const LEARN_MORE_PHASE_ORDER: Phase['key'][] = ['testnet', 'mainnet', 'devnet'];

const LEARN_MORE_CONTENT: Record<Phase['key'], { title: string; body: string[] }> = {
  devnet: {
    title: 'History of the Telcoin Network',
    body: [
      'The Telcoin Network has been years in the making, starting with the vision to unite telecommunications and blockchain into a single, compliant infrastructure for global financial services.',
      'Development began with the Genesis phase (Devnet), where the team focused on core architecture, validator models, and securing the system through rigorous internal testing. This was followed by Alpha Testnet (2023), which opened the door for early validation and developer experimentation.',
      'In Beta Testnet (2024), mobile network operators (MNOs) and partners began participating under real world conditions, stress-testing performance and compliance at scale. These stages laid the foundation for the upcoming Mainnet launch, which will arrive in two phases: Alpha Mainnet (targeted 2025 Q4) and Beta Mainnet (2026 Q2).',
      'From its earliest planning to today, the Telcoin Network has stayed focused on telecom grade standards, GSMA aligned validator governance, and real world use cases like payments, stablecoin remittances, and mobile financial services. Each milestone brings the network closer to delivering secure, compliant, and decentralized financial access to every mobile phone user worldwide.',
    ],
  },
  testnet: {
    title: 'What is Adiri',
    body: [
      'Adiri is Telcoin Network’s public testnet, where the community and partners including mobile network operators (MNOs) spinning up validator nodes can interact with the network in a live but non-production setting.',
      'This stage follows Adiri stabilization and will roll out in phases. Early iterations of Adiri may still see instability or bugs as the network undergoes continuous upgrades and audit cycles. That’s intentional: Adiri is where real-world testing happens, and where we make sure validator participation, governance mechanics, and protocol updates all function securely before moving to mainnet.',
      'Adiri represents a critical milestone because it’s the first time the broader ecosystem validators, developers, and community members can meaningfully engage with Telcoin Network.',
    ],
  },
  mainnet: {
    title: 'What is Mainnet',
    body: [
      'Mainnet represents the full launch of Telcoin Network the moment we transition from testing to production and deliver a live, fully operational Layer 1 blockchain operation. Together, these phases deliver the security and decentralization guarantees expected of a Layer 1 blockchain.',
      'This is where everything becomes real. Mainnet will use actual Telcoin (TEL) as its native currency, enabling genuine value transfer, real economic activity, and production-ready application deployment. Unlike the testing phases, every transaction, every smart contract, and every piece of value on Mainnet will have real-world significance.',
      'Mainnet is the culmination of all our development efforts the secure, decentralized network that validators, developers, and users can trust for critical operations. After proving our technology through rigorous testing across Adiri environments, Mainnet represents our commitment to delivering the security, performance, and decentralization guarantees expected of a world-class L1 blockchain.',
      'For the Telcoin community, Mainnet launch marks a pivotal milestone: the transformation of years of development into a live network that will power the future of accessible financial services. This is when Telcoin Network stops being a promise and becomes a standard.',
    ],
  },
};

const ADDITIONAL_LEARN_MORE_SECTIONS: LearnMoreSection[] = [
  {
    id: 'enterprise-ready-platform',
    title: 'Enterprise Ready Platform',
    body: [
      'The Telcoin Network is designed for enterprises across telecom, fintech, and beyond. By combining GSMA grade standards with EVM compatibility, it offers a secure and compliant platform where operators can deploy blockchain-based financial services at scale. Mobile network operators and their subsidiaries can launch automated, programmable services tailored to local markets, seamlessly bridging existing financial systems with blockchain. This enables enterprises to deliver scalable, real world financial products directly to mobile users worldwide.',
    ],
  },
  {
    id: 'trust-and-security',
    title: 'Trust and Security',
    body: [
      'Trust and security are embedded into the foundation of the Telcoin Network. Validators are GSMA Operator Members, leveraging their established infrastructure, compliance frameworks, and regulatory expertise to secure the network. Every stage of development has been reinforced by external audits, rigorous testing, and an open security competition to identify and resolve potential vulnerabilities. This layered approach ensures the Telcoin Network not only meets telecom grade standards of reliability but also delivers the decentralization and resilience expected of a public blockchain.',
    ],
  },
  {
    id: 'regulation-and-compliance',
    title: 'Regulation and Compliance',
    body: [
      'The Telcoin Network is built with compliance at its core. By anchoring validator participation to GSMA Operator Members and their subsidiaries, the network ensures that only entities with proven regulatory standing can secure the system. This model bridges blockchain with global telecom and financial compliance standards, enabling enterprises to innovate without sacrificing oversight. From KYC/AML readiness to interoperability with existing financial rails, the Telcoin Network is designed to meet the regulatory expectations of jurisdictions worldwide while preserving the openness and transparency of a public blockchain.',
    ],
  },
];

export function LearnMore({ phases, links }: LearnMoreProps) {
  const orderedSections = useMemo(
    () => phases.map((phase) => ({ key: phase.key, status: phase.status })),
    [phases]
  );
  const defaultOpenId = useMemo(() => {
    const hasAdiri = orderedSections.some((section) => section.key === 'testnet');
    if (hasAdiri) {
      return 'testnet';
    }

    const activePhase = orderedSections.find(
      (section) => section.status === 'in_progress'
    );
    return activePhase?.key ?? orderedSections[0]?.key ?? null;
  }, [orderedSections]);
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const hashToPhaseKey: Record<string, Phase['key']> = {
      'history-of-the-telcoin-network': 'devnet',
      'what-is-adiri': 'testnet',
      'what-is-mainnet': 'mainnet',
    };

    const applyHash = () => {
      const hash = window.location.hash.replace('#', '');
      const matchedPhase = hashToPhaseKey[hash];

      if (matchedPhase) {
        setOpenId(matchedPhase);

        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        setOpenId(defaultOpenId);
      }
    };

    applyHash();
    window.addEventListener('hashchange', applyHash);

    return () => {
      window.removeEventListener('hashchange', applyHash);
    };
  }, [defaultOpenId]);

  const sections = useMemo<LearnMoreSection[]>(() => {
    const phaseSections = orderedSections.map<LearnMorePhaseSection>((section) => ({
      id: section.key,
      title: LEARN_MORE_CONTENT[section.key]?.title ?? 'Learn more',
      body: LEARN_MORE_CONTENT[section.key]?.body ?? ['Details coming soon.'],
    }));

    const sortedPhaseSections = LEARN_MORE_PHASE_ORDER.flatMap((key) =>
      phaseSections.filter((section) => section.id === key)
    );

    const remainingPhaseSections = phaseSections.filter(
      (section) => !LEARN_MORE_PHASE_ORDER.includes(section.id)
    );

    const combinedSections = [
      ...sortedPhaseSections,
      ...remainingPhaseSections,
      ...ADDITIONAL_LEARN_MORE_SECTIONS,
    ];

    const normalizeTitle = (title: string | undefined) =>
      title?.trim().toLowerCase() ?? '';

    const historyIndex = combinedSections.findIndex(
      (section) => normalizeTitle(section.title) === 'history of the telcoin network',
    );

    if (historyIndex === -1) {
      return combinedSections;
    }

    const [historySection] = combinedSections.splice(historyIndex, 1);
    const regulationIndex = combinedSections.findIndex(
      (section) => normalizeTitle(section.title) === 'regulation and compliance',
    );

    if (regulationIndex === -1) {
      combinedSections.push(historySection);
      return combinedSections;
    }

    combinedSections.splice(regulationIndex + 1, 0, historySection);

    return combinedSections;
  }, [orderedSections]);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const linkButtons = [
    { label: 'Governance Forum', href: links.governanceForum },
    { label: 'Docs', href: links.technicalDocs },
    { label: 'Adiri RPC', href: 'https://chainlist.org/chain/2017' },
    { label: 'Track Issues', href: 'https://github.com/Telcoin-Association/telcoin-network/issues' },
    { label: 'Telcoin Association', href: 'https://www.telcoin.org/' },
    { label: 'Twitter', href: 'https://x.com/TelcoinTAO' },
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
            Dive deeper into each network phase and the documentation supporting the
            roadmap.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {sections.map((section) => {
          const isOpen = openId === section.id;
          const t = section.title?.trim().toLowerCase();
          const isHistory = t === 'history of the telcoin network';
          const isAdiri = t === 'what is adiri';
          const isMainnet = t === 'what is mainnet';
          const rowLogo = isAdiri
            ? { src: AdiriLogoUrl, alt: 'Adiri logo' }
            : isMainnet
              ? { src: MAINNET_LOGO_URL, alt: 'Mainnet logo' }
              : undefined;
          return (
            <article
              key={section.id}
              id={
                isHistory
                  ? 'history-of-the-telcoin-network'
                  : isAdiri
                    ? 'what-is-adiri'
                    : isMainnet
                      ? 'what-is-mainnet'
                      : `learn-more-${section.id}`
              }
              className="overflow-hidden rounded-[16px] border-[0.4px] border-[#C9CFED99] bg-[#172552] shadow-soft backdrop-blur"
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
                <span
                  aria-hidden="true"
                  className={`transition-transform ${isOpen ? 'rotate-90' : ''}`}
                >
                  <ChevronIcon className="h-4 w-4" />
                </span>
              </motion.button>
              <div
                id={`${section.id}-panel`}
                role="region"
                aria-live="polite"
                aria-hidden={!isOpen}
                className={`space-y-4 px-6 pb-6 text-sm leading-relaxed text-fg-muted transition-[max-height,opacity] duration-300 ease-out ${isOpen ? 'max-h-[1600px] opacity-100' : 'max-h-0 opacity-0'}`}
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
