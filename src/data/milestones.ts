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
      text: 'Stabilize Horizon Environment',
      slug: 'stabilize-horizon-environment',
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
      text: 'Phase 1',
      slug: 'phase-1',
      details: [
        'Patch Public Vulnerabilities',
        'Stabilize Horizon Environment',
        'Security Findings Final Patch',
      ],
    },
    {
      text: 'Phase 2',
      slug: 'phase-2',
      details: [
        'Genesis Opening Ceremony with MNO Partners',
        'MNO Onboarding',
        'Integrate Adiri Testnets with Bridge Solution',
        'Adiri Alpha Audits',
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
