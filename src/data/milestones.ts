export type PhaseKey = 'horizon' | 'adiri' | 'mainnet';

export type Milestone = { text: string; done?: boolean };

export const MILESTONES: Record<PhaseKey, Milestone[]> = {
  horizon: [
    { text: 'Patch Public Vulnerabilities', done: true },
    { text: 'Stabilize Horizon Environment' },
    { text: 'Security Findings Final Patches' },
  ],
  adiri: [
    { text: 'Genesis Ceremony w/ MNO Partners' },
    { text: 'MNO Onboarding' },
    { text: 'Integrate Testnets w/ Bridge Solution' },
    { text: 'Adiri Alpha Audits' },
  ],
  mainnet: [
    { text: 'Launch' },
  ],
};
