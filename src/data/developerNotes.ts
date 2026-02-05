export type DeveloperNoteSection = {
  title: string;
  date: string;
  items: string[];
};

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

const developerNoteDates = [
  '2026-02-05T00:00:00Z',
  '2026-01-22T00:00:00Z',
  '2026-01-09T00:00:00Z',
  '2025-12-19T00:00:00Z',
  '2025-12-03T00:00:00Z',
  '2025-11-13T00:00:00Z',
];

export const getLatestDeveloperNotesDate = () =>
  developerNoteDates.reduce((latest, current) =>
    new Date(current).valueOf() > new Date(latest).valueOf() ? current : latest
  );

export const buildDeveloperNoteSections = (recentNotes: string[]): DeveloperNoteSection[] => [
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
