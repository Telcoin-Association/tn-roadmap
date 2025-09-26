export type PhaseStatus = 'blocked' | 'in_progress' | 'up_next' | 'planned' | 'done';

export interface Phase {
  id: string;
  title: string;
  subtitle?: string;
  status: PhaseStatus;
  description: string;
  links?: { label: string; href: string }[];
  metrics?: Record<string, number>;
  dependsOn?: string[];
}

export const ROADMAP: Phase[] = [
  {
    id: 'fixes',
    title: 'Fix remaining vulnerabilities',
    status: 'in_progress',
    description: 'Address all high/medium findings; backfilled unit + integration tests.',
    metrics: { high: 0, medium: 14, low: 36 },
    links: [{ label: 'Review Horizon (Devnet) context', href: '#learn-more-devnet' }]
  },
  {
    id: 'genesis',
    title: 'Relaunch Horizon',
    subtitle: 'Devnet relaunch',
    status: 'up_next',
    description: 'Stabilize Horizon (Devnet) to unblock Adiri rollout.',
    dependsOn: ['fixes'],
    links: [{ label: 'See Horizon readiness', href: '#learn-more-devnet' }]
  },
  {
    id: 'horizon',
    title: 'Launch Adiri',
    subtitle: 'Public Testnet',
    status: 'planned',
    description: 'Early Adiri iterations guarded; audits complete.',
    dependsOn: ['genesis'],
    links: [{ label: 'Review Adiri plan', href: '#learn-more-testnet' }]
  },
  {
    id: 'audits',
    title: 'Final audits & competition',
    status: 'planned',
    description: 'Public competition required for insurance & 24/7 bounty coverage.',
    dependsOn: ['horizon'],
    links: [{ label: 'Read audit prep', href: '#security-section' }]
  },
  {
    id: 'zenith',
    title: 'Mainnet launch',
    subtitle: 'Mainnet readiness',
    status: 'planned',
    description: 'Mainnet launch after competition sign-off.',
    dependsOn: ['audits'],
    links: [{ label: 'Learn about Mainnet', href: '#learn-more-mainnet' }]
  }
];
