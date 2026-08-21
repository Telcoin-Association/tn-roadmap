export type DeveloperNoteSection = {
  title: string;
  date: string;
  items: string[];
};

const AUGUST_20_DEVELOPER_NOTES = [
  'The past two weeks have been almost entirely focused on security and correctness for the protocol — 65 pull requests merged across the Rust protocol codebase, with eight engineers aligned on a single goal: delivering a mainnet that is ready, secure, and scalable.',
  'Telcoin Network is now one week into its latest independent security assessment with the Cantina team. Researchers were handpicked by the protocol team with security guidance from Uku. Every finding is being fixed privately first and then published in full — nothing is being buried quietly.',
  'The 65 merged pull requests break down into approximately 50 security hardening changes and 15 correctness fixes, improving node operator feedback, metrics, and protocol reliability. The network has never been more reliable.',
  'Snapshot support has shipped, allowing nodes to sync from any point in history and recover quickly without reprocessing data from genesis.',
  'Significant work went into bolstering the foundation for RPC infrastructure scaling — important given the unique nature of the EVM chain and private mempool architecture.',
  'On the contract side, final changes were submitted for the audit closing report. Two additional coverage gaps were found and closed during a final internal review — before the feature has ever been switched on. Full sweeps across all contracts using automated tools and internal manual review are returning zero critical issues.',
  'The smart contract codebase is frozen and ready for mainnet. This frees the protocol team to focus exclusively on the Rust node software and the larger protocol that validators will run.',
  'A second Adiri testnet fork was executed this morning, deploying the final audited consensus registry bytecode. Managing these forks on testnet is invaluable practice before ever forking mainnet — a commitment to keeping Adiri stable and long-lived for dApp developers.',
  'The node now has approximately 1,500 automated tests, and across the contracts there is more than two lines of test code for every line of production code. Test coverage includes node operation simulations, malicious attack scenarios, and stress testing — enforced in code, not process.',
  'Application development on Telcoin Network is actively underway with dApps being built on observer nodes using the ExEx feature. The remaining work is not about building new things or fixing bugs — it is about closing security gaps and production verification.',
];

const JULY_31_DEVELOPER_NOTES = [
  "The past two weeks represent the most productive engineering window in the project's history: 85 pull requests and 79 issues closed across the protocol and smart contract codebases.",
  'First independent security audit results are in from Cantina. The review covered the staking and consensus registry contracts and found no critical findings and no high severity findings. In total there were 15 findings — three mediums, 11 lows, and one informational — all of which are now closed. Twelve were resolved with patched code; three were reviewed, accepted, and will be documented with reasoning in the published report.',
  'The medium findings all related to edge cases around validator penalty and reward logic. These improvements ultimately strengthen protections for the operators who secure the network. The staking and consensus registry contracts are now frozen and ready for mainnet.',
  'Beyond the audit, the staking contract received additional safety improvements: delegation now carries a deadline and can be revoked, stake can be topped up after a penalty, and stake setting changes now take effect at the end of each epoch rather than requiring a manual push — reducing operational overhead and the trust required from validators.',
  'Approximately 20 node reliability and consistency hardening items were closed in a systematic sweep. Public endpoints were scrutinized and hardened, including the worker gateway foundation which now includes rate limits, size caps, transaction screening, metrics, and a dashboard ready to scale under load.',
  'Snapshot syncing support is now in place, allowing new nodes to join the network immediately rather than reprocessing all data from genesis. Snapshots are written every epoch for participating nodes, dramatically reducing onboarding time for incoming validators.',
  'Metrics visibility was significantly improved, including round progressions, certificate formations, and syncing distances — giving the team and operators clearer insight into real-time network state.',
  'The execution codebase was reorganized in preparation for external security auditors: modules are smaller and thoroughly documented, duplicate code consolidated, legacy protocol paths deleted, and the test suite is meaningfully faster with reduced timing-based flakiness.',
  'AI-assisted security scanning continues to evolve with multi-agent sub-agents running multiple custom query angles. Cantina, the primary security partner, has access to member-only AI models including Mythos, which were applied to the TE3 staking audits. The final audit report is being prepared for publication.',
];

const DECEMBER_DEVELOPER_NOTES = [
  'Deployed latest version of protocol (devnet)',
  'Identified some issues to address (syncing, forking, DB writing)',
  'Closed 14 issues last three weeks',
  'Remaining issues are related to production hardening',
];

const UPDATED_DEVELOPER_NOTES = [
  'Closed 16 issues last two weeks',
  'Identify and improve storage utilization for primary consensus contract on-chain (increase performance for critical/routine protocol smart-contract interactions)',
];

const JANUARY_DEVELOPER_NOTES = [
  'Milestone achieved: all issues identified from audits resolved and patched',
  'Redeployed devnet to put enhancements and patches into production environment',
  'Emphasis on production-ready hardening for MNO onboarding',
];

const JANUARY_22_DEVELOPER_NOTES = [
  'Stress testing continues to surface minor issues, all of which have now been resolved. Community testers are running observer nodes and providing feedback, with coordination underway to transition qualified observers into staked validator roles.',
  'The BLS cryptography library is now feature complete, including a first-of-its-kind implementation using new Pectra BLS precompiles. Ongoing database and networking refactors are delivering meaningful performance improvements.',
  'Two major technical deliverables remain in progress. Once complete, focus will shift to test coverage, documentation, and internal audits to maximize confidence ahead of final security audits.',
  'Hardware procurement is underway for select datacenter partners, with several VM environments nearing operational readiness.',
  'Financial planning for the 2026 bridging partner budget is being finalized.',
];

const FEBRUARY_05_DEVELOPER_NOTES = [
  'Stress testing is ongoing and has identified some minor stability issues.',
  'During stress testing, the devnet has occasionally paused, with nodes recovering cleanly after restart.',
  'Overall reliability continues to improve as testing progresses.',
  'Early findings point to database behaviour, which is being addressed as part of an ongoing refactor.',
  'The BLS cryptography library is now feature complete.',
  'Internal audit feedback is being worked through.',
  'An external 9-day security assessment has been quoted by Spearbit/Cantina.',
  'Database and networking refactors are still in progress.',
  'Individual improvements are nearing completion.',
  'These will be combined in a final integration update.',
  'Open-source contributions from the community (notably TanguyDeTaxis) have been very helpful.',
  'Significant improvements have been made to the testing infrastructure.',
  'Build and test times are faster.',
  'Automated testing on pull requests has been improved.',
  'Custom RPC methods and network metrics continue to expand.',
  'Community-run observer and validator nodes continue to support broader network testing efforts.',
];



const APRIL_20_DEVELOPER_NOTES = [
  "The team has nearly completed prioritized work on state-breaking changes including pre-compiles and execution-level protocol changes that would cause a fork if upgraded while the network is running. This work will lock in the network's core on-chain architecture.",
  'Testnet will have a stable release soon with final deterministic changes, supporting over 7,000 validators (up from 1,100 cap), native ERC20 interface support, and production-ready database. The stable version is intended to last indefinitely.',
  "A pre-compile extending the ERC20 interface to native token balances was implemented so users don't need to wrap TEL for DeFi transactions or dApp integration. The core consensus registry was also improved, increasing validator capacity from ~1,100 to over 7,000 validators.",
  'AI-assisted security scans continue on a monthly basis (compared to the far higher cost of manual research), methodically working through isolated crates. Third-party human security assessments will follow as the final security gate before mainnet launch.',
  'Testnet will run in parallel with mainnet indefinitely as a sandbox environment using identical code, tools, and data centers (only differing by chain IDs). This allows safe testing of updates before applying them to mainnet and gives developers a testing environment.',
];


const JULY_03_DEVELOPER_NOTES = [
  'ExEx feature shipped — dApps can now build directly on observer nodes, improving development flexibility and reducing integration friction.',
  'Protocol identity handshakes complete — primary/worker cross-network contamination is fully prevented.',
  'Move BLS Staking Library to EVM Precompile is done, reducing staking contract complexity from ~500 lines of Solidity to 7 lines while reusing code already in audit scope.',
  'Compressed BLS pubkey usage is now standardized across all validator staking actions, hardening the staking contract interface.',
  'Worker Gateway work is underway to reduce the DoS attack surface for the execution layer.',
  'Consensus Registry Security Assessment is now in progress with external security partners.',
  'Two new Security & Mainnet Readiness items added: finalizing native token strategy pending TEL3 TELIP outcome, and dynamic basefee adjustments at epoch boundaries.',
  'Bidirectional streaming for canonical tip sync is in progress, allowing nodes to stay continuously synced without relying on polling.',
];

const JUNE_24_DEVELOPER_NOTES = [
  'Team has expanded and closed over 35 pull requests this period, with strong momentum heading into the final stretch before mainnet.',
  'Peer identity improvements are complete — the network now reliably distinguishes between protocol-verified validators and operator-designated trusted nodes across epoch boundaries.',
  'Reduced friction for real-time syncing and snapshot synchronization, improving how nodes stay current after initial sync.',
  'Monitoring infrastructure is live — node operators can opt in to share metrics and logs with a centralized component, helping the protocol team and operators identify and track network stability improvements.',
  'Public RPC information is now published on node records, unblocking a public-facing community dashboard showing live network activity.',
  'CLI tooling for developers is in progress; active meetings underway with ecosystem partners and major industry players interested in building on Telcoin Network.',
  'Working closely with GSMA and MNO partners to define priority use cases ahead of mainnet — focused on intercarrier settlements, stablecoin remittances, and on-chain FX.',
  'Engaged Spearbit for security audits — three audits in scope, kicking off as early as next week with staggered scheduling.',
];

const JUNE_08_DEVELOPER_NOTES = [
  'Networking work continues across several fronts as the validator set grows. There are two classes of nodes on the network: validator nodes that participate in committee voting, and observer nodes that track committee state.',
  'Historic state sync is performing well and relatively quick, validating the underlying system is working as intended. The team has identified friction points in how nodes stay current after their initial sync, and improvements are underway to ensure validators can smoothly transition into committees at epoch boundaries.',
  'AI-assisted security scans continue to deliver results. The most recent scan surfaced an issue in the core consensus registry related to how certain BLS cryptographic keys are validated — specifically, a gap that could allow the same validator to register a key more than once. With a permissioned validator set the practical risk is low, but this type of gap is not acceptable heading into mainnet.',
  'In response, the team has identified a more elegant long-term fix: moving the BLS staking library from approximately 500 lines of gas-consuming Solidity down to just 7 lines of code as an EVM pre-compile on Telcoin Network. This dramatically reduces the attack surface, has no effect on Ethereum compatibility, and reuses code already in scope for other audits — effectively extending the security budget.',
  'This is the last known issue ahead of the consensus registry security assessment. The team has reached out to security partners and is scheduling that audit for the coming weeks.',
  'Five new data center nodes have been onboarded over the past two weeks, with at least one more expected online shortly. The protocol team is working on on-chain tracking metrics and off-chain dashboard infrastructure to surface accurate, human-readable node participation data publicly.',
];

const MAY_27_DEVELOPER_NOTES = [
  'Network is feature complete and the core foundation remains stable, with final optimizations now being implemented ahead of mainnet launch.',
  'Adiri testnet access has expanded with broader RPC endpoint availability, improving public access to network data.',
  'Validator onboarding is actively underway, with successful onboarding already completed and additional coordination meetings scheduled to bring more validators online.',
  'Release process has been hardened with cryptographic signatures on official Telcoin Association releases, enabling node operators to verify binaries are maintainer-signed.',
  'Security focus is concentrated on the network and execution layers, with daily deep scans and attack-surface analysis continuing.',
  'Smart contract layer is confirmed ready, with final internal code review in progress before third-party audit handoff.',
  'Discussions are in progress with Cantina to schedule the next audit round, and continuous audits will remain part of ongoing mainnet security operations.',
  'Bridge partner coordination continues with active testing and deployment on stable Adiri testnet in preparation for full mainnet launch deployment.',
];

const MAY_07_DEVELOPER_NOTES = [
  'Adiri testnet has officially launched as a stable network — the final phase before mainnet. MNOs can now onboard as validators and developers can build dApps directly on the network.',
  'Block explorer is live at telscan.io, powered by a new Nethereum-based deployment with full transaction routing support.',
  'Faucet page restored with stablecoin drip support for developer onboarding.',
  'Community-contributed test coverage expansion underway — targeting ~125 new tests across certifier, storage, and type crates with a structured harness approach.',
  'DNS and infrastructure finalized for stable testnet deployment across MNO data center environments.',
  'Testnet teardown and redeployment completed to establish the stable long-running network build.',
];

const APRIL_24_DEVELOPER_NOTES = [
  "Significant progress has been made on state-breaking changes and pre-compiles to lock in the network's core on-chain architecture.",
  'Validator capacity has increased dramatically from approximately 1,100 to over 7,000.',
  'Native ERC20 interface improvements now allow users to interact with TEL in DeFi without wrapping.',
  'AI-assisted security scans continue efficiently, and third-party audits can run in parallel rather than sequentially. This means 2 or 3 audits can be conducted at the same time, and 8 weeks is an estimate of total audit time rather than a completion timeline.',
  'Testnet nodes are being deployed in MNO data centers with improved tooling, including bash scripts and container images.',
  'Faucet decentralization is in its final stages.',
  'LayerZero incident learnings are being actively applied to further strengthen bridge security.',
];

const MARCH_13_DEVELOPER_NOTES = [
  'Closed 12 pull requests covering production hardening, bug fixes, and security improvements.',
  'Production hardening syncing strategy is complete and confirming specialist researcher availability with security partners is complete.',
  'Execution environment isolation has been completed to accelerate core protocol execution and readiness.',
  'Support multiple workers for parallel fee markets and deploy new faucet service are complete.',
  'TN Whitepaper drafting is now in progress.',
  'Database layer upgrades were completed and merged, clearing the way for testnet launch readiness activities.',
  'P2P streaming for bulk data transfer remains in final testing and nearing completion.',
  'Protocol team is preparing testnet launch in MNO data center environments, with initial validator cohort planning underway.',
  'Bridging work is advancing after receipt of initial LayerZero scoping prerequisites.',
  'Unified web presence initiative is in wireframing phase with focus on user journeys, SEO, and audience-specific information architecture.',
  'MWC highlighted strong MNO engagement across regions, with validator onboarding and telecom payment use-cases actively progressing.',
  'Mainnet launch remains dependent on completion of testnet validation and security assessments.',
];

const FEBRUARY_19_DEVELOPER_NOTES = [
  'Done: Support P2P Streaming for Bulk Data Transfer — Implement peer-to-peer streaming mechanisms to enable efficient bulk data transfer between nodes, improving sync performance and reducing reliance on centralized distribution.',
  'In Progress: Streamline Database Infrastructure for Production — Refactor and optimise database architecture to ensure production-grade performance, reliability, and scalability across validators and observers.',
  'Done: Custom TN RPC Endpoints — Develop dedicated Telcoin Network RPC endpoints tailored to ecosystem use cases, improving performance, flexibility, and infrastructure control.',
  'In Progress: Harden Epoch Boundary Records for Secure Syncing — Improve validation and integrity checks around epoch boundary records to ensure secure, deterministic syncing across network participants.',
  'In Progress: Better Tools for Validators to Sync, Stake, and Activate — Enhance CLI tooling and workflows for validators to sync more efficiently, stake with clearer flows, and activate validators with improved reliability and UX.',
  'Done: Support Multiple Workers for Parallel Fee Markets — Enable validators to operate multiple workers to segregate transaction pools, allowing independent fee markets, use-case specific execution environments, and horizontal scalability without separate chains.',
  'Done: Updates to Support Open-Source Contributions — Implemented structural and workflow improvements to make the repository more accessible for external contributors, improving transparency and community participation.',
  'Done: Parallelize Testing Infrastructure — Refactored testing systems to run in parallel, significantly reducing CI times and increasing reliability of test coverage.',
];

const developerNoteDates = [
  '2026-08-20T00:00:00Z',
  '2026-07-31T00:00:00Z',
  '2026-07-03T00:00:00Z',
  '2026-06-24T00:00:00Z',
  '2026-06-08T00:00:00Z',
  '2026-05-27T00:00:00Z',
  '2026-05-07T00:00:00Z',
  '2026-04-24T00:00:00Z',
  '2026-04-20T00:00:00Z',
  '2026-03-29T00:00:00Z',
  '2026-02-19T00:00:00Z',
  '2026-02-05T00:00:00Z',
  '2026-01-22T00:00:00Z',
  '2026-01-09T00:00:00Z',
  '2025-12-19T00:00:00Z',
  '2025-12-03T00:00:00Z',
  '2025-11-13T00:00:00Z',
];

export const getLatestDeveloperNotes = (): string[] => AUGUST_20_DEVELOPER_NOTES;

export const getLatestDeveloperNotesDate = () =>
  developerNoteDates.reduce((latest, current) =>
    new Date(current).valueOf() > new Date(latest).valueOf() ? current : latest
  );

export const buildDeveloperNoteSections = (recentNotes: string[]): DeveloperNoteSection[] => [
  {
    title: 'Developer Notes - Updated 20 August 2026',
    date: '2026-08-20',
    items: AUGUST_20_DEVELOPER_NOTES,
  },
  {
    title: 'Developer Notes - Updated 31 July 2026',
    date: '2026-07-31',
    items: JULY_31_DEVELOPER_NOTES,
  },
  {
    title: 'Developer Notes - Updated 3 July 2026',
    date: '2026-07-03',
    items: JULY_03_DEVELOPER_NOTES,
  },
  {
    title: 'Developer Notes - Updated 24 June 2026',
    date: '2026-06-24',
    items: JUNE_24_DEVELOPER_NOTES,
  },
  {
    title: 'Developer Notes - Updated 8 June 2026',
    date: '2026-06-08',
    items: JUNE_08_DEVELOPER_NOTES,
  },
  {
    title: 'Developer Notes - Updated 27 May 2026',
    date: '2026-05-27',
    items: MAY_27_DEVELOPER_NOTES,
  },
  {
    title: 'Developer Notes - Updated 7 May 2026',
    date: '2026-05-07',
    items: MAY_07_DEVELOPER_NOTES,
  },
  {
    title: 'Developer Notes - Updated 24 April 2026',
    date: '2026-04-24',
    items: APRIL_24_DEVELOPER_NOTES,
  },
  {
    title: 'Developer Notes - Updated 20 April 2026',
    date: '2026-04-20',
    items: APRIL_20_DEVELOPER_NOTES,
  },
  {
    title: 'Developer Notes - Updated 29 March 2026',
    date: '2026-03-29',
    items: MARCH_13_DEVELOPER_NOTES,
  },
  {
    title: 'Developer Notes - Updated 19th February 2026',
    date: '2026-02-19',
    items: FEBRUARY_19_DEVELOPER_NOTES,
  },
  {
    title: 'Developer Notes - Updated 05 February 2026',
    date: '2026-02-05',
    items: FEBRUARY_05_DEVELOPER_NOTES,
  },
  {
    title: 'Developer Notes - Updated 22 January 2026',
    date: '2026-01-22',
    items: JANUARY_22_DEVELOPER_NOTES,
  },
  {
    title: 'Developer Notes - Updated 9 January 2026',
    date: '2026-01-09',
    items: JANUARY_DEVELOPER_NOTES,
  },
  {
    title: 'Developer Notes - Updated 19 December 2025',
    date: '2025-12-19',
    items: recentNotes,
  },
  {
    title: 'Developer Notes - Updated 03rd December 2025',
    date: '2025-12-03',
    items: DECEMBER_DEVELOPER_NOTES,
  },
  {
    title: 'Developer Notes - Updated 13th November 2025',
    date: '2025-11-13',
    items: UPDATED_DEVELOPER_NOTES,
  },
];
