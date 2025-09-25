import '@testing-library/jest-dom/vitest';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { RoadToDeploymentFlow } from '../Flow';
import { ROADMAP } from '../../../data/roadmap';

describe('RoadToDeploymentFlow', () => {
  beforeAll(() => {
    class ResizeObserverMock {
      observe() {}
      unobserve() {}
      disconnect() {}
    }

    if (!('ResizeObserver' in globalThis)) {
      (globalThis as unknown as { ResizeObserver: typeof ResizeObserverMock }).ResizeObserver = ResizeObserverMock;
    }

    const globalWindow = globalThis as unknown as Window & typeof globalThis;
    if (typeof globalWindow.matchMedia !== 'function') {
      globalWindow.matchMedia = (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        addListener: () => undefined,
        removeListener: () => undefined,
        dispatchEvent: () => false
      });
    }
  });

  it('renders a node for each roadmap phase', async () => {
    render(<RoadToDeploymentFlow onSelectPhase={() => {}} />);

    for (const phase of ROADMAP) {
      expect(await screen.findByTestId(`roadmap-node-${phase.id}`)).toBeInTheDocument();
    }
  });

  it('invokes the selection callback when a node is activated', async () => {
    const handleSelect = vi.fn();
    render(<RoadToDeploymentFlow onSelectPhase={handleSelect} />);

    const node = await screen.findByTestId('roadmap-node-genesis');
    const button = within(node).getByRole('button', { hidden: true });
    button.dispatchEvent(new Event('click', { bubbles: true }));

    expect(handleSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'genesis' }));
  });
});
