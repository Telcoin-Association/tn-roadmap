export type PhaseKey = 'horizon' | 'adiri' | 'mainnet';

export type Milestone = {
  text: string;
  done?: boolean;
  status?: 'completed' | 'in_progress' | 'queued';
  /** hash-id friendly: e.g., "patch-public-vulnerabilities" */
  slug: string;
  /** short explainer shown in Road to Mainnet detail view */
  description?: string;
  /** shown only in Road to mainnet detail tiles */
  details?: string[];
};

export type CustomRoadToMainnetItem = {
  text: string;
  slug: string;
  description?: string;
  inProgress?: boolean;
  done?: boolean;
  updatedInVersion?: string;
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
        inProgress: true,
        updatedInVersion: '2026-08-20',
        description:
          'Onboarding and integrating with DVNs for TN mainnet bridge.',
      },
      {
        text: 'Support for dApps to Build on Observer Nodes Directly (ExEx Feature)',
        slug: 'support-for-dapps-to-build-on-observer-nodes-directly-exex-feature',
        done: true,
        description:
          'Enable dApps to build directly on observer nodes via the ExEx feature, improving development flexibility and reducing integration friction.',
      },
      {
        text: 'Snapshot Support for Instant Node Syncing',
        slug: 'snapshot-support-instant-syncing',
        done: true,
        updatedInVersion: '2026-08-20',
        description:
          'Snapshot syncing allows new nodes to join the network immediately without reprocessing all historical data from genesis. Snapshots are written every epoch.',
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
        done: true,
        description:
          'Production hardening fallback dial attempts between validators to ensure robust connectivity for committee-voting validators.',
      },
      {
        text: 'Enhance BLS Key to Peer ID Mapping',
        slug: 'enhance-bls-key-to-peer-id-mapping',
        done: true,
        description:
          'Enhancing mapping between validator BLS keys used by the application and peer IDs used by the networking layer to trigger discovery attempts when information is missing.',
      },
      {
        text: 'Eliminate False Positives for Validator Gossip at Epoch Boundaries',
        slug: 'eliminate-validator-gossip-false-positives',
        done: true,
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
        done: true,
        description:
          'Enhancing protocol identity handshakes to prevent primary/worker cross-network contamination.',
      },
      {
        text: 'Bidirectional Streaming for Staying Synced at Canonical Tip',
        slug: 'bidirectional-streaming-canonical-tip',
        inProgress: true,
        description:
          'Implementing bidirectional streaming so nodes can continuously stay synced at the canonical tip without relying on polling or one-way pushes.',
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
        done: true,
        description:
          'Moving the BLS staking library from approximately 500 lines of gas-consuming Solidity down to just 7 lines of code as an EVM pre-compile on Telcoin Network.',
      },
      {
        text: 'Standardize Compressed BLS Pubkey Usage for All Validator Staking Actions',
        slug: 'standardize-compressed-bls-pubkey-staking',
        done: true,
        description:
          'Ensuring all validator staking actions consistently use compressed BLS public keys, reducing ambiguity and hardening the staking contract interface.',
      },
      {
        text: 'Worker Gateway to Reduce DoS Attack Surface',
        slug: 'worker-gateway-dos-reduction',
        inProgress: true,
        description:
          'Worker gateway to reduce DoS attack surface.',
      },
      {
        text: 'Consensus Registry Security Assessment',
        slug: 'consensus-registry-security-assessment',
        done: true,
        description:
          'Scheduling and completing the consensus registry security assessment with external security partners.',
      },
      {
        text: 'Security Hardening of Epoch Record Validation',
        slug: 'security-harden-epoch-record-validation',
        done: true,
        description:
          'Security hardening of epoch record validation for syncing nodes.',
      },
      {
        text: 'Execution Engine Security Assessment',
        slug: 'execution-engine-security-assessment',
        inProgress: true,
        description:
          'Scheduling and completing the execution engine security assessment.',
      },
      {
        text: 'Node Metrics',
        slug: 'node-metrics',
        done: true,
        description:
          'Enhanced metrics visibility including round progressions, certificate formations, and syncing distances for real-time network state monitoring.',
      },
      {
        text: 'Fork Adiri Testnet to Include Final Audited Consensus Registry Bytecode',
        slug: 'fork-adiri-testnet-audited-consensus-registry',
        done: true,
        updatedInVersion: '2026-08-20',
        description:
          'Forking Adiri testnet to deploy the final audited Consensus Registry smart contract bytecode ahead of mainnet.',
      },
      {
        text: 'Improve Deterministic Source of Entropy for Random Validator Selection in Future Committees',
        slug: 'deterministic-entropy-validator-selection',
        inProgress: true,
        updatedInVersion: '2026-08-20',
        description:
          'Improve the deterministic entropy source used for random validator committee selection to strengthen fairness and security guarantees.',
      },
      {
        text: 'Finalize Native Token Strategy Pending TEL3 TELIP Outcome',
        slug: 'finalize-native-token-strategy-tel3-telip',
        done: true,
        updatedInVersion: '2026-08-20',
        description:
          'Finalizing the native token strategy for Telcoin Network mainnet, contingent on the outcome of the TEL3 TELIP governance process.',
      },
      {
        text: 'Dynamic Basefee Adjustments at Epoch Boundaries',
        slug: 'dynamic-basefee-epoch-boundaries',
        inProgress: true,
        description:
          'Implementing dynamic basefee adjustments that occur at epoch boundaries, enabling more responsive fee market behaviour as network load changes.',
      },
    ],
  },
];

const MS_PER_DAY = 24 * 60 * 60 * 1000;

const parseUpdateTimestamp = (value: string): number | null => {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  // Date-only tags are treated as start-of-day UTC.
  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(trimmed)
    ? `${trimmed}T00:00:00Z`
    : trimmed;
  const timestamp = Date.parse(normalized);
  return Number.isNaN(timestamp) ? null : timestamp;
};

export const isUpdatedWithinLast24Hours = (tag: string, asOf: string): boolean => {
  const tagTime = parseUpdateTimestamp(tag);
  const asOfTime = parseUpdateTimestamp(asOf);
  if (tagTime === null || asOfTime === null) {
    return false;
  }
  const delta = asOfTime - tagTime;
  return delta >= 0 && delta <= MS_PER_DAY;
};

export const getNewInUpdateItems = (asOf: string) =>
  ADIRI_PHASE_3_GROUPS.flatMap((group) =>
    group.items.filter(
      (item) =>
        Boolean(item.updatedInVersion) &&
        isUpdatedWithinLast24Hours(item.updatedInVersion as string, asOf),
    ),
  );

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
