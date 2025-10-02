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
      text: 'Pre-Cantina Competition',
      done: true,
      slug: 'pre-cantina-competition',
      details: [
        'Preparation phase to finalize core components and stabilize the network ahead of the open security competition run by Cantina.',
      ],
    },
    {
      text: 'Initial Spin-Up of TAO-Controlled Validator Nodes',
      done: true,
      slug: 'initial-spin-up-of-tao-controlled-validator-nodes',
      details: [
        'Deployment of the first validator set operated by the Telcoin Autonomous Organization (TAO) to secure and coordinate early network operations.',
      ],
    },
    {
      text: 'Launch Block Explorer',
      done: true,
      slug: 'launch-block-explorer',
      details: [
        'Public release of a Telcoin Network block explorer, enabling developers and the community to view blocks, transactions, and validator activity transparently.',
      ],
    },
    {
      text: 'Demo PoC',
      done: true,
      slug: 'demo-poc',
      details: [
        'Demonstration of a proof-of-concept application to showcase the network’s functionality and real-world use cases.',
      ],
    },
    {
      text: 'Feature Complete',
      done: true,
      slug: 'feature-complete',
      details: [
        'Reaching the point where all planned core features are implemented and the network is functionally ready for audit and testing.',
      ],
    },
    {
      text: '4-Week Security Assessment',
      done: true,
      slug: '4-week-security-assessment',
      details: [
        'A dedicated month-long review involving audits, penetration testing, and vulnerability assessment to identify and resolve security issues before Mainnet launch.',
      ],
    },
  ],
  adiri: [
    {
      text: 'Patch Security Findings',
      slug: 'patch-security-findings',
      details: [
        'Address all vulnerabilities identified during the security competition and audits to ensure the network meets telecom-grade security standards.',
      ],
    },
    {
      text: 'Enhance Test Coverage',
      slug: 'enhance-test-coverage',
      details: [
        'Expand automated and manual testing to cover edge cases, validator interactions, and stress scenarios, reducing the chance of regressions.',
      ],
    },
    {
      text: 'Production Harden Code Base',
      slug: 'production-harden-code-base',
      details: [
        'Optimize and stabilize the code for real-world use, including performance tuning, reliability improvements, and resilience under high load.',
      ],
    },
    {
      text: 'Improve Documentation',
      slug: 'improve-documentation',
      details: [
        'Update and expand developer, validator, and user documentation to support smooth onboarding, transparency, and ecosystem growth.',
      ],
    },
    {
      text: 'Relaunch Network',
      slug: 'relaunch-network',
      details: [
        'Bring the Telcoin Network back online with fixes, improvements, and readiness for the transition into the Mainnet launch phases.',
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
