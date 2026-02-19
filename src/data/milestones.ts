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
      done: true,
      slug: 'patch-security-findings',
      details: [
        'Address all vulnerabilities identified during the security competition and audits to ensure the network meets telecom-grade security standards.',
      ],
    },
    {
      text: 'Enhance Test Coverage',
      done: true,
      slug: 'enhance-test-coverage',
      details: [
        'Expand automated and manual testing to cover edge cases, validator interactions, and stress scenarios, reducing the chance of regressions.',
      ],
    },
    {
      text: 'Production Harden Database Read/Write Strategy',
      done: true,
      slug: 'production-harden-database-read-write-strategy',
      details: [
        'Harden database read and write paths for production workloads with improved performance, reliability, and resilience.',
      ],
    },
    {
      text: 'Production Harden P2P Networking',
      slug: 'production-harden-p2p-networking',
      details: [
        'Strengthen peer-to-peer networking for production readiness, including stability, efficiency, and abuse resistance improvements.',
      ],
    },
    {
      text: 'Production Harden Syncing Strategy',
      slug: 'production-harden-syncing-strategy',
      details: [
        'Improve syncing strategy to ensure reliable state synchronization under real-world network conditions.',
      ],
    },
    {
      text: 'Integrate with Bridge Partner',
      slug: 'integrate-with-bridge-partner',
      details: [
        'Coordinate integration with a bridge partner to enable cross-chain interoperability for the Adiri network.',
      ],
    },
    {
      text: 'Improve Documentation',
      done: true,
      slug: 'improve-documentation',
      details: [
        'Update and expand developer, validator, and user documentation to support smooth onboarding, transparency, and ecosystem growth.',
      ],
    },
    {
      text: 'MiCA whitepaper',
      done: true,
      slug: 'write-mica-whitepaper-with-legal-now',
      details: [
        'Collaborate with the legal team to produce a MiCA-compliant whitepaper that clarifies Telcoin Network’s regulatory positioning ahead of the public release.',
      ],
    },
    {
      text: 'Improve async logging for all nodes in the network',
      done: true,
      slug: 'improve-async-logging-for-all-nodes',
      details: [
        'Enhance asynchronous logging pipelines for validator and supporting nodes to improve observability and reduce performance impact during peak load.',
      ],
    },
    {
      text: 'Stress Test Deployed Network for Public Release',
      slug: 'stress-test-deployed-network',
      details: [
        'Run coordinated stress scenarios across the deployed Adiri environment to validate stability, throughput, and reliability before opening public access.',
      ],
    },
    {
      text: 'Confirming availability of specialist researchers with security partners',
      slug: 'confirm-specialist-researcher-availability',
      details: [
        'Initial coordination underway with security partners to confirm availability of specialized security researchers.',
      ],
    },
    {
      text: 'Support P2P Streaming for Bulk Data Transfer',
      slug: 'support-p2p-streaming-for-bulk-data-transfer',
      details: [
        'Implement peer-to-peer streaming mechanisms to enable efficient bulk data transfer between nodes, improving sync performance and reducing reliance on centralized distribution.',
      ],
    },
    {
      text: 'Streamline Database Infrastructure for Production',
      slug: 'streamline-database-infrastructure-for-production',
      details: [
        'Refactor and optimise database architecture to ensure production-grade performance, reliability, and scalability across validators and observers.',
      ],
    },
    {
      text: 'Custom TN RPC Endpoints',
      slug: 'custom-tn-rpc-endpoints',
      details: [
        'Develop dedicated Telcoin Network RPC endpoints tailored to ecosystem use cases, improving performance, flexibility, and infrastructure control.',
      ],
    },
    {
      text: 'Harden Epoch Boundary Records for Secure Syncing',
      slug: 'harden-epoch-boundary-records-for-secure-syncing',
      details: [
        'Improve validation and integrity checks around epoch boundary records to ensure secure, deterministic syncing across network participants.',
      ],
    },
    {
      text: 'Better Tools for Validators to Sync, Stake, and Activate',
      slug: 'better-tools-for-validators-to-sync-stake-and-activate',
      details: [
        'Enhance CLI tooling and workflows for validators to sync more efficiently, stake with clearer flows, and activate validators with improved reliability and UX.',
      ],
    },
    {
      text: 'Updates to Support Open-Source Contributions',
      done: true,
      slug: 'updates-to-support-open-source-contributions',
      details: [
        'Implemented structural and workflow improvements to make the repository more accessible for external contributors, improving transparency and community participation.',
      ],
    },
    {
      text: 'Parallelize Testing Infrastructure for Faster, More Reliable Testing',
      done: true,
      slug: 'parallelize-testing-infrastructure-for-faster-more-reliable-testing',
      details: [
        'Refactored testing systems to run in parallel, significantly reducing CI times and increasing reliability of test coverage.',
      ],
    },
    {
      text: 'Support Multiple Workers for Parallel Fee Markets',
      slug: 'support-multiple-workers-for-parallel-fee-markets',
      details: [
        'Enable validators to operate multiple workers to segregate transaction pools for independent fee markets, use-case specific execution environments, and horizontal scalability without separate chains.',
      ],
    },
    {
      text: 'Deploy new faucet service',
      slug: 'deploy-new-faucet-service',
      details: [
        'Launch a public faucet that distributes small amounts of testnet TEL, allowing developers and community members to easily access tokens for testing applications and transactions on the network.',
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
