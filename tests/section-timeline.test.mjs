/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { jumpNavigate } from '../src/composites/SectionTimeline/behavior/jump-navigate';
import { navigateClick } from '../src/primitives/Link/behavior/navigate-click';
import { timelineProgress } from '../src/composites/SectionTimeline/behavior/timeline-progress';

const GROUPS = [
  { id: 'start', label: 'Start', children: [{ id: 'intro', label: 'Intro', href: '#intro' }, { id: 'setup', label: 'Setup', href: '#setup' }] },
  { id: 'play', label: 'Play', children: [{ id: 'rules', label: 'Rules', href: '#rules' }] },
];

describe('K1 a section timeline', { tags: ['critical'] }, () => {
  it('calls onJump with the id of a followed link, and cancels the browser jump', () => {
    const jumped = [];
    const navigate = jumpNavigate((id) => jumped.push(id), 'setup');
    const event = { button: 0, defaultPrevented: false, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, preventDefault() { this.defaultPrevented = true; }, currentTarget: { getAttribute: () => null, hasAttribute: () => false } };
    navigateClick('#setup', (href) => navigate(href), undefined)(event);
    expect(jumped).toEqual(['setup']);
    expect(event.defaultPrevented).toBe(true);
  });
});

describe('K1 the progress of a section timeline', { tags: ['critical'] }, () => {
  it('takes a given value first, kept between 0 and 1', () => {
    expect(timelineProgress(GROUPS, 'intro', 0.4)).toBe(0.4);
    expect(timelineProgress(GROUPS, 'intro', 3)).toBe(1);
    expect(timelineProgress(GROUPS, 'intro', -1)).toBe(0);
  });

  it('falls back to the place of the active section, and to 0 without one', () => {
    expect(timelineProgress(GROUPS, 'rules', undefined)).toBe(1);
    expect(timelineProgress(GROUPS, 'intro', undefined)).toBeCloseTo(1 / 3);
    expect(timelineProgress(GROUPS, undefined, undefined)).toBe(0);
    expect(timelineProgress(GROUPS, 'missing', undefined)).toBe(0);
  });
});
