export type PhaseKey = 'horizon' | 'adiri' | 'mainnet';

export type Milestone = {
  text: string;
  done?: boolean;
  status?: 'completed' | 'in_progress' | 'queued';
  /** hash-id friendly: e.g., "patch-public-vulnerabilities" */
  slug: string;
  /** shown only in Road to mainnet detail tiles */
  details?: string[];
};

export type CustomRoadToMainnetItem = {
  text: string;
  slug: string;
  description?: string;
  inProgress?: boolean;
  done?: boolean;
};

export const ADIRI_PHASE_3_ITEMS: CustomRoadToMainnetItem[] = [
  {
    text: 'TN Whitepaper',
    slug: 'tn-whitepaper',
    done: true,
    description:
      'Drafting and reviewing the Telcoin Network whitepaper to consolidate technical architecture, governance model, and ecosystem positioning for external stakeholders.',
  },
  {
    text: 'Integrate Adiri Testnet with Bridge Solution',
    slug: 'integrate-adiri-testnet-with-bridge-solution',
    inProgress: true,
    description:
      'Connect the Adiri testnet to a cross-chain bridge, enabling the movement of assets like TEL and stablecoins between the Telcoin Network and external chains for testing interoperability.',
  },
  {
    text: 'Decentralize Network (Onboard MNO Validators)',
    slug: 'decentralize-network-onboard-mno-validators',
    done: true,
    description:
      'Transition from TAO-operated validators to a broader, decentralized set by onboarding mobile network operators (MNOs) as validators, aligning governance with GSMA standards and expanding security through diverse participation.',
  },
  {
    text: 'AI Security Scans',
    slug: 'ai-security-scans',
    inProgress: true,
    description:
      'Introduce AI-assisted security scans to continuously evaluate node software and supporting services for vulnerabilities and risky changes.',
  },
  {
    text: 'Improve Batch Build Times for Increased Transaction Throughput',
    slug: 'improve-batch-build-times-for-increased-transaction-throughput',
    done: true,
    description:
      'Reduce batch build latency to increase effective transaction throughput and improve end-to-end execution performance under sustained load.',
  },
  {
    text: 'Support for dApps to Build on Observer Nodes Directly (ExEx Feature)',
    slug: 'support-for-dapps-to-build-on-observer-nodes-directly-exex-feature',
    inProgress: true,
    description:
      'Enable dApps to build directly on observer nodes via the ExEx feature, improving development flexibility and reducing integration friction.',
  },
  {
    text: 'Launch Community-Driven Testing Tools',
    slug: 'launch-community-driven-testing-tools',
    done: true,
    description:
      'Release community-led testing tools and workflows so external contributors can validate network behavior and report regressions earlier.',
  },
  {
    text: 'Improve Syncing Times for New Nodes',
    slug: 'improve-syncing-times-for-new-nodes',
    done: true,
    description:
      'Further optimize initial node sync performance to reduce time-to-participation for new validators and observers.',
  },
  {
    text: 'Refactor Peer Identity Tracking',
    slug: 'refactor-peer-identity-tracking',
    inProgress: true,
    description:
      'Refactoring how peer identities are tracked by nodes to production harden, simplify code, and reduce bug surfaces.',
  },
  {
    text: 'Production Harden Fallback Dial Attempts Between Validators',
    slug: 'production-harden-fallback-dial-attempts',
    inProgress: true,
    description:
      'Production hardening fallback dial attempts between validators to ensure robust connectivity for committee-voting validators.',
  },
  {
    text: 'Differentiate Trusted Peers from Protocol-Verified Validators',
    slug: 'differentiate-trusted-peers-from-verified-validators',
    inProgress: true,
    description:
      'Differentiating peers on the network between node operator identified trusted peers and protocol verified validators to ensure robust connectivity.',
  },
  {
    text: 'Enhance BLS Key to Peer ID Mapping',
    slug: 'enhance-bls-key-to-peer-id-mapping',
    inProgress: true,
    description:
      'Enhancing mapping between validator BLS keys used by the application and peer IDs used by the networking layer to trigger discovery attempts when information is missing.',
  },
  {
    text: 'Eliminate False Positives for Validator Gossip at Epoch Boundaries',
    slug: 'eliminate-validator-gossip-false-positives',
    inProgress: true,
    description:
      'Eliminating false positives for validator gossip arriving late around epoch boundaries.',
  },
  {
    text: 'Refactor Startup to Dial Bootstrap Nodes',
    slug: 'refactor-startup-dial-bootstrap-nodes',
    inProgress: true,
    description:
      'Refactoring startup to dial bootstrap nodes instead of genesis committee to reduce network burden for existing validators and offload to TA-managed observer nodes to further decentralize the network.',
  },
  {
    text: 'Enhance Protocol Identity Handshakes',
    slug: 'enhance-protocol-identity-handshakes',
    inProgress: true,
    description:
      'Enhancing protocol identity handshakes to prevent primary/worker cross-network contamination.',
  },
  {
    text: 'Reduce Friction for Real-Time Consensus Sync',
    slug: 'reduce-friction-for-realtime-consensus-sync',
    inProgress: true,
    description:
      'Reducing friction for syncing nodes that are caught up to the current epoch and attempting to stream consensus in real-time.',
  },
  {
    text: 'Publish Public RPC Information on Node Records',
    slug: 'publish-public-rpc-on-node-records',
    inProgress: true,
    description:
      'Publishing public RPC information on node records to support off-chain RPC discovery.',
  },
  {
    text: 'Security Hardening of Epoch Record Validation',
    slug: 'security-harden-epoch-record-validation',
    description:
      'Security hardening of epoch record validation for syncing nodes.',
  },
  {
    text: 'Onboard and Integrate DVNs for TN Mainnet Bridge',
    slug: 'onboard-dvns-for-mainnet-bridge',
    description:
      'Onboarding and integrating with DVNs for TN mainnet bridge.',
  },
  {
    text: 'Move BLS Staking Library to EVM Precompile',
    slug: 'bls-staking-library-evm-precompile',
    description:
      'Moving the BLS staking library from approximately 500 lines of gas-consuming Solidity down to just 7 lines of code as an EVM pre-compile on Telcoin Network.',
  },
  {
    text: 'Worker Gateway to Reduce DoS Attack Surface',
    slug: 'worker-gateway-dos-reduction',
    description:
      'Worker gateway to reduce DoS attack surface.',
  },
  {
    text: 'Consensus Registry Security Assessment',
    slug: 'consensus-registry-security-assessment',
    description:
      'Scheduling and completing the consensus registry security assessment with external security partners.',
  },
  {
    text: 'Execution Engine Security Assessment',
    slug: 'execution-engine-security-assessment',
    description:
      'Scheduling and completing the execution engine security assessment.',
  },
];

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
      done: true,
      slug: 'production-harden-p2p-networking',
      details: [
        'Strengthen peer-to-peer networking for production readiness, including stability, efficiency, and abuse resistance improvements.',
      ],
    },
    {
      text: 'Production Harden Syncing Strategy',
      done: true,
      slug: 'production-harden-syncing-strategy',
      details: [
        'Improve syncing strategy to ensure reliable state synchronization under real-world network conditions.',
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
      done: true,
      slug: 'stress-test-deployed-network',
      details: [
        'Run coordinated stress scenarios across the deployed Adiri environment to validate stability, throughput, and reliability before opening public access.',
      ],
    },
    {
      text: 'Confirming availability of specialist researchers with security partners',
      done: true,
      slug: 'confirm-specialist-researcher-availability',
      details: [
        'Initial coordination underway with security partners to confirm availability of specialized security researchers.',
      ],
    },
    {
      text: 'Support P2P Streaming for Bulk Data Transfer',
      done: true,
      slug: 'support-p2p-streaming-for-bulk-data-transfer',
      details: [
        'Implement peer-to-peer streaming mechanisms to enable efficient bulk data transfer between nodes, improving sync performance and reducing reliance on centralized distribution.',
      ],
    },
    {
      text: 'Streamline Database Infrastructure for Production',
      done: true,
      slug: 'streamline-database-infrastructure-for-production',
      details: [
        'Refactor and optimise database architecture to ensure production-grade performance, reliability, and scalability across validators and observers.',
      ],
    },
    {
      text: 'Custom TN RPC Endpoints',
      done: true,
      slug: 'custom-tn-rpc-endpoints',
      details: [
        'Develop dedicated Telcoin Network RPC endpoints tailored to ecosystem use cases, improving performance, flexibility, and infrastructure control.',
      ],
    },
    {
      text: 'Patch database bug for missing batches',
      done: true,
      slug: 'patch-database-bug-for-missing-batches',
      details: [
        'Patched a database issue that caused some batches to be missing, improving consistency and reliability in batch processing.',
      ],
    },
    {
      text: 'Control network parameters on-chain',
      done: true,
      slug: 'control-network-parameters-on-chain',
      details: [
        'Implement on-chain controls for key network parameters to improve transparency, governance, and operational flexibility.',
      ],
    },
    {
      text: 'Harden Epoch Boundary Records for Secure Syncing',
      done: true,
      slug: 'harden-epoch-boundary-records-for-secure-syncing',
      details: [
        'Improve validation and integrity checks around epoch boundary records to ensure secure, deterministic syncing across network participants.',
      ],
    },
    {
      text: 'Better Tools for Validators to Sync, Stake, and Activate',
      done: true,
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
      done: true,
      slug: 'support-multiple-workers-for-parallel-fee-markets',
      details: [
        'Enable validators to operate multiple workers to segregate transaction pools for independent fee markets, use-case specific execution environments, and horizontal scalability without separate chains.',
      ],
    },
    {
      text: 'Deploy new faucet service',
      done: true,
      slug: 'deploy-new-faucet-service',
      details: [
        'Launch a public faucet that distributes small amounts of testnet TEL, allowing developers and community members to easily access tokens for testing applications and transactions on the network.',
      ],
    },
    {
      text: 'Isolate execution environment',
      done: true,
      slug: 'isolate-execution-environment',
      details: [
        'Completed isolation of the execution environment to improve security boundaries, operational resilience, and deterministic node behavior under production conditions.',
      ],
    },
    {
      text: 'Relaunch Network',
      done: true,
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
