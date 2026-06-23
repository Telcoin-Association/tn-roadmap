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

export type Phase3Group = {
  text: string;
  slug: string;
  items: CustomRoadToMainnetItem[];
};

export const ADIRI_PHASE_3_GROUPS: Phase3Group[] = [
  {
    text: 'Validator Onboarding & Ecosystem',
    slug: 'validator-onboarding-ecosystem',
    items: [
      {
        text: 'TN Whitepaper',
        slug: 'tn-whitepaper',
        done: true,
        description:
          'Drafting and reviewing the Telcoin Network whitepaper to consolidate technical architecture, governance model, and ecosystem positioning for external stakeholders.',
      },
      {
        text: 'Decentralize Network (Onboard MNO Validators)',
        slug: 'decentralize-network-onboard-mno-validators',
        done: true,
        description:
          'Transition from TAO-operated validators to a broader, decentralized set by onboarding mobile network operators (MNOs) as validators, aligning governance with GSMA standards and expanding security through diverse participation.',
      },
      {
        text: 'Launch Community-Driven Testing Tools',
        slug: 'launch-community-driven-testing-tools',
        done: true,
        description:
          'Release community-led testing tools and workflows so external contributors can validate network behavior and report regressions earlier.',
      },
      {
        text: 'Improve Batch Build Times for Increased Transaction Throughput',
        slug: 'improve-batch-build-times-for-increased-transaction-throughput',
        done: true,
        description:
          'Reduce batch build latency to increase effective transaction throughput and improve end-to-end execution performance under sustained load.',
      },
      {
        text: 'Improve Syncing Times for New Nodes',
        slug: 'improve-syncing-times-for-new-nodes',
        done: true,
        description:
          'Further optimize initial node sync performance to reduce time-to-participation for new validators and observers.',
      },
      {
        text: 'Integrate Adiri Testnet with Bridge Solution',
        slug: 'integrate-adiri-testnet-with-bridge-solution',
        inProgress: true,
        description:
          'Connect the Adiri testnet to a cross-chain bridge, enabling the movement of assets like TEL and stablecoins between the Telcoin Network and external chains for testing interoperability.',
      },
      {
        text: 'Onboard and Integrate DVNs for TN Mainnet Bridge',
        slug: 'onboard-dvns-for-mainnet-bridge',
        description:
          'Onboarding and integrating with DVNs for TN mainnet bridge.',
      },
      {
        text: 'Support for dApps to Build on Observer Nodes Directly (ExEx Feature)',
        slug: 'support-for-dapps-to-build-on-observer-nodes-directly-exex-feature',
        inProgress: true,
        description:
          'Enable dApps to build directly on observer nodes via the ExEx feature, improving development flexibility and reducing integration friction.',
      },
    ],
  },
  {
    text: 'P2P Networking Hardening',
    slug: 'p2p-networking-hardening',
    items: [
      {
        text: 'Refactor Peer Identity Tracking',
        slug: 'refactor-peer-identity-tracking',
        done: true,
        description:
          'Refactoring how peer identities are tracked by nodes to production harden, simplify code, and reduce bug surfaces.',
      },
      {
        text: 'Differentiate Trusted Peers from Protocol-Verified Validators',
        slug: 'differentiate-trusted-peers-from-verified-validators',
        done: true,
        description:
          'Differentiating peers on the network between node operator identified trusted peers and protocol verified validators to ensure robust connectivity.',
      },
      {
        text: 'Reduce Friction for Real-Time Consensus Sync',
        slug: 'reduce-friction-for-realtime-consensus-sync',
        done: true,
        description:
          'Reducing friction for syncing nodes that are caught up to the current epoch and attempting to stream consensus in real-time.',
      },
      {
        text: 'Publish Public RPC Information on Node Records',
        slug: 'publish-public-rpc-on-node-records',
        done: true,
        description:
          'Publishing public RPC information on node records to support off-chain RPC discovery.',
      },
      {
        text: 'Production Harden Fallback Dial Attempts Between Validators',
        slug: 'production-harden-fallback-dial-attempts',
        inProgress: true,
        description:
          'Production hardening fallback dial attempts between validators to ensure robust connectivity for committee-voting validators.',
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
    ],
  },
  {
    text: 'Security & Mainnet Readiness',
    slug: 'security-mainnet-readiness',
    items: [
      {
        text: 'AI Security Scans',
        slug: 'ai-security-scans',
        inProgress: true,
        description:
          'Ongoing AI-assisted security scans to continuously evaluate node software and supporting services for vulnerabilities and risky changes, ahead of third-party human security assessments.',
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
        text: 'Security Hardening of Epoch Record Validation',
        slug: 'security-harden-epoch-record-validation',
        description:
          'Security hardening of epoch record validation for syncing nodes.',
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
    ],
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
        "Demonstration of a proof-of-concept application to showcase the network's functionality and real-world use cases.",
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
      text: 'Security & Audit Readiness',
      done: true,
      slug: 'security-audit-readiness',
      details: [
        'Patch Security Findings',
        'Confirming availability of specialist researchers with security partners',
      ],
    },
    {
      text: 'Database Infrastructure',
      done: true,
      slug: 'database-infrastructure',
      details: [
        'Production Harden Database Read/Write Strategy',
        'Streamline Database Infrastructure for Production',
        'Patch database bug for missing batches',
        'Isolate execution environment',
      ],
    },
    {
      text: 'P2P Networking & Syncing',
      done: true,
      slug: 'p2p-networking-and-syncing',
      details: [
        'Production Harden P2P Networking',
        'Production Harden Syncing Strategy',
        'Support P2P Streaming for Bulk Data Transfer',
        'Harden Epoch Boundary Records for Secure Syncing',
        'Better Tools for Validators to Sync, Stake, and Activate',
      ],
    },
    {
      text: 'Developer & Community Infrastructure',
      done: true,
      slug: 'developer-community-infrastructure',
      details: [
        'Enhance Test Coverage',
        'Parallelize Testing Infrastructure for Faster, More Reliable Testing',
        'Improve async logging for all nodes in the network',
        'Updates to Support Open-Source Contributions',
        'Improve Documentation',
      ],
    },
    {
      text: 'Protocol Features & Testnet Launch',
      done: true,
      slug: 'protocol-features-testnet-launch',
      details: [
        'Support Multiple Workers for Parallel Fee Markets',
        'Control network parameters on-chain',
        'Custom TN RPC Endpoints',
        'Deploy new faucet service',
        'MiCA whitepaper',
        'Stress Test Deployed Network for Public Release',
        'Relaunch Network',
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
