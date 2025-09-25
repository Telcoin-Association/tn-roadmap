export const SECTION_COPY = {
  header: {
    title: 'Telcoin Network Status',
    descriptionTemplate: (phaseList: string) =>
      phaseList
        ? `Visibility into our ${phaseList} progress and what remains before launch.`
        : 'Visibility into Telcoin Network progress and what remains before launch.'
  },
  phaseOverview: {
    heading: 'Phase overview',
    descriptionTemplate: (phaseList: string) =>
      `Track where Telcoin Network stands across ${phaseList || 'each network phase'}.`
  },
  security: {
    heading: 'Security & audits',
    description:
      'Highlights from recent reviews and what remains before mainnet readiness.',
    noteHeading: 'Security notes',
    priorityFindingsTitle: 'Priority Findings (public-facing)',
    afterPriorityFixesTitle: 'After Priority Fixes (remaining)'
  },
  roadmap: {
    heading: 'Road to Mainnet',
    description: 'Milestones required to unlock mainnet launch readiness.'
  },
  learnMore: {
    heading: 'Learn more',
    description:
      'Dive deeper into each network phase and the documentation supporting the roadmap.',
    questionTemplate: (title: string) => `What is ${title}?`,
    defaultSummary: 'Details coming soon.'
  }
} as const;

export type SectionCopy = typeof SECTION_COPY;
