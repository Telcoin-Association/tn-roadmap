export type PhaseKey = 'horizon' | 'adiri' | 'mainnet';

export type Milestone = { text: string; done?: boolean; details?: string[] };

export const MILESTONES: Record<PhaseKey, Milestone[]> = {
  horizon: [
    {
      text: 'Patch Public Vulnerabilities',
      done: true,
      details: [
        'Priority findings addressed and patched',
        'Confirm patch and code hardening via 3rd party security researchers and community',
      ],
    },
    {
      text: 'Stabilize Horizon Environment',
      details: ['Deploy public devnet nodes', 'Reset telscan.io'],
    },
    {
      text: 'Security Findings Final Patches',
      details: [
        'After Priority Fixes (remaining) completed',
        'Confirm patch and code hardening',
      ],
    },
  ],
  adiri: [
    {
      text: 'Genesis Opening Ceremony with MNO Partners',
      details: [
        'Adiri testnet genesis ceremony with MNO partners',
        'Begin onboarding MNO partners to Adiri testnet',
      ],
    },
    {
      text: 'MNO Onboarding',
      details: ['White glove onboarding MNO partners to Adiri testnet'],
    },
    {
      text: 'Integrate Adiri Testnets with Bridge Solution',
      details: ['Bridge integration for Adiri Testnet'],
    },
    {
      text: 'Adiri Alpha Audits',
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
    { text: 'Launch' },
  ],
};
