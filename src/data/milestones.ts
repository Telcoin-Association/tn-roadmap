export type PhaseKey = 'horizon' | 'adiri' | 'mainnet';

export type Milestone = {
  text: string;
  done?: boolean;
  /** hash-id friendly: e.g., "patch-public-vulnerabilities" */
  slug: string;
  /** shown only in Road to mainnet detail tiles */
  details?: string[];
};

export const MILESTONES: Record<PhaseKey, Milestone[]> = {
  horizon: [
    {
      text: 'Patch Public Vulnerabilities',
      slug: 'patch-public-vulnerabilities',
      done: true,
      details: [
        'Priority findings addressed and patched',
        'Confirm patch and code hardening via 3rd party security researchers and community',
      ],
    },
    {
      text: 'Stabilize Adiri Environment',
      slug: 'stabilize-adiri-environment',
      details: [
        'Deploy public devnet nodes',
        'Reset telscan.io',
      ],
    },
    {
      text: 'Security Findings Final Patch',
      slug: 'security-findings-final-patch',
      details: [
        'After Priority Fixes (remaining) completed',
        'Confirm patch and code hardening',
      ],
    },
  ],
  adiri: [
    {
      text: 'Genesis Opening Ceremony with MNO Partners',
      slug: 'genesis-opening-ceremony-with-mno-partners',
      details: [
        'Adiri testnet genesis ceremony with MNO partners',
        'Begin onboarding MNO partners to Adiri testnet',
      ],
    },
    {
      text: 'MNO Onboarding',
      slug: 'mno-onboarding',
      details: [
        'White glove onboarding MNO partners to Adiri testnet',
      ],
    },
    {
      text: 'Integrate Adiri Testnets with Bridge Solution',
      slug: 'integrate-adiri-testnets-with-bridge-solution',
      details: [
        'Bridge integration for Adiri Testnet',
      ],
    },
    {
      text: 'Adiri Alpha Audits',
      slug: 'adiri-alpha-audits',
      details: [
        'RecoverableWrapper',
        'BLS library',
        'Libp2p',
        'State sync',
        'Execution layer',
        'Cryptographic key management',
        'Bridge',
        'Competition',
      ],
    },
  ],
  mainnet: [
    {
      text: 'Launch',
      slug: 'launch',
      details: [], // (no extra text provided)
    },
  ],
};
