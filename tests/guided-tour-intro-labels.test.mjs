/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { TourBubbleButtons } from '../src/composites/GuidedTour/sub-components/TourBubbleButtons';

vi.mock('../src/primitives/TesseraProvider/behavior/useTesseraStrings', async () => {
  const { TESSERA_STRINGS } = await import('../src/primitives/strings/tessera-strings.constants');
  return { useTesseraStrings: () => TESSERA_STRINGS };
});

describe('K1 the buttons of the intro step', { tags: ['critical'] }, () => {
  const tour = { index: 0, total: 3, close: vi.fn(), back: vi.fn(), next: vi.fn() };
  const intro = { id: 'welcome', title: 'Welcome', body: 'Hello', intro: true };

  it('goes to the next step on Start and ends the tour on Skip', () => {
    const next = vi.fn();
    const close = vi.fn();
    const card = TourBubbleButtons({ tour: { ...tour, next, close }, step: intro, advance: 'next' });
    const buttons = [];
    const walk = (node) => {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) { node.forEach(walk); return; }
      if (node.props?.onClick && node.props.children !== undefined && typeof node.props.children === 'string') buttons.push(node.props);
      walk(node.props?.children);
    };
    walk(card);
    const named = (label) => buttons.find((props) => props.children === label);
    named('Start the tour').onClick();
    expect(next).toHaveBeenCalledTimes(1);
    expect(close).not.toHaveBeenCalled();
    named('Skip').onClick();
    expect(close).toHaveBeenCalledTimes(1);
  });
});
