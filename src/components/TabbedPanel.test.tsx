import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

vi.mock('./RoadToMainnet', () => ({
  default: () => <div>Roadmap content</div>,
}));

vi.mock('./LearnMore', () => ({
  LearnMore: () => <div>Learn more content</div>,
}));

vi.mock('./SecurityAudits', () => ({
  SecurityAudits: () => <div>Developer notes content</div>,
}));

import { TabbedPanel } from './TabbedPanel';

const props = {
  phases: [],
  links: {
    governanceForum: '',
    technicalDocs: '',
    auditReports: '',
  },
  notes: [''] as [string, ...string[]],
};

describe('TabbedPanel', () => {
  it('renders the developer notes tab by default', async () => {
    render(<TabbedPanel {...props} />);

    expect(await screen.findByText('Developer notes content')).toBeInTheDocument();
    expect(screen.queryByText('Learn more content')).not.toBeInTheDocument();
  });

  it('loads the selected tab content without changing the tab labels', async () => {
    const user = userEvent.setup();
    render(<TabbedPanel {...props} />);

    await user.click(screen.getByRole('button', { name: 'Learn More' }));

    expect(await screen.findByText('Learn more content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Road to Mainnet' })).toBeInTheDocument();
  });
});
