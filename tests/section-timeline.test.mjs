/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SectionTimeline } from '../src/composites/SectionTimeline';
import { jumpNavigate } from '../src/composites/SectionTimeline/behavior/jump-navigate';
import { navigateClick } from '../src/primitives/Link/behavior/navigate-click';
import { timelineProgress } from '../src/composites/SectionTimeline/behavior/timeline-progress';

const GROUPS = [
  { id: 'start', label: 'Start', children: [{ id: 'intro', label: 'Intro', href: '#intro' }, { id: 'setup', label: 'Setup', href: '#setup' }] },
  { id: 'play', label: 'Play', children: [{ id: 'rules', label: 'Rules', href: '#rules' }] },
];
const tagsWith = (html, text) => (html.match(/<[a-z0-9]+ [^>]*>/g) ?? []).filter((tag) => tag.includes(text));
const draw = (props = {}) => renderToStaticMarkup(h(SectionTimeline, { groups: GROUPS, ariaLabel: 'On this page', ...props }));
const css = (file) => fs.readFileSync(new URL(`../src/composites/SectionTimeline/${file}`, import.meta.url), 'utf8');

describe('a section timeline', () => {
  const html = draw({ activeId: 'setup' });

  it('is a nav with a label that holds a list of links', () => {
    const [nav] = tagsWith(html, 'section-timeline"');
    expect(nav).toMatch(/^<nav /);
    expect(nav).toContain('aria-label="On this page"');
    expect(tagsWith(html, 'href=')).toHaveLength(3);
  });

  it('names each group by its title', () => {
    const lists = tagsWith(html, 'section-timeline__links');
    expect(lists).toHaveLength(2);
    expect(lists.every((tag) => tag.includes('aria-labelledby='))).toBe(true);
    expect(html).toContain('>Start<');
    expect(html).toContain('>Play<');
  });

  it('marks only the active child as the current location', () => {
    const links = tagsWith(html, 'href=');
    expect(links.map((tag) => tag.includes('aria-current="location"'))).toEqual([false, true, false]);
  });

  it('hides the line and its fill from assistive tech', () => {
    expect(tagsWith(html, 'section-timeline__line')[0]).toContain('aria-hidden="true"');
  });

  it('is shown when live, dimmed when idle and out of the page when hidden', () => {
    expect(tagsWith(html, 'section-timeline"')[0]).not.toContain('hidden');
    expect(tagsWith(draw({ state: 'idle' }), 'section-timeline"')[0]).toContain('data-state="idle"');
    const [hidden] = tagsWith(draw({ state: 'hidden' }), 'section-timeline"');
    expect(hidden).toContain('hidden=""');
    expect(hidden).toContain('data-state="hidden"');
  });

  it('calls onJump with the id of a followed link, and cancels the browser jump', () => {
    const jumped = [];
    const navigate = jumpNavigate((id) => jumped.push(id), 'setup');
    const event = { button: 0, defaultPrevented: false, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, preventDefault() { this.defaultPrevented = true; }, currentTarget: { getAttribute: () => null, hasAttribute: () => false } };
    navigateClick('#setup', (href) => navigate(href), undefined)(event);
    expect(jumped).toEqual(['setup']);
    expect(event.defaultPrevented).toBe(true);
  });

  it('leaves the link alone when there is no onJump', () => {
    expect(jumpNavigate(undefined, 'setup')).toBeUndefined();
    expect(draw()).toContain('href="#intro"');
  });
});

describe('the progress of a section timeline', () => {
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

  it('writes the value for the CSS and the driver name of a view timeline', () => {
    const scroll = tagsWith(draw({ timeline: 'scroll', progress: 0.5 }), 'section-timeline"')[0];
    expect(scroll).toContain('data-timeline="scroll"');
    expect(scroll).toContain('--section-timeline-progress:0.5');
    const named = tagsWith(draw({ timeline: '--page' }), 'section-timeline"')[0];
    expect(named).toContain('data-timeline="named"');
    expect(named).toContain('--section-timeline-name:--page');
    expect(tagsWith(draw(), 'section-timeline"')[0]).not.toContain('data-timeline');
  });
});

describe('the style of a section timeline', () => {
  const style = css('SectionTimeline.css');

  it('uses animation-timeline only inside @supports, under no reduced motion', () => {
    expect(style).toContain('animation-timeline: scroll(root)');
    const outside = style.slice(0, style.indexOf('@keyframes'));
    expect(outside).not.toContain('animation-timeline');
    const guarded = style.slice(style.indexOf('@media (prefers-reduced-motion: no-preference)'));
    expect(guarded).toContain('@supports (animation-timeline: scroll())');
    expect(guarded.indexOf('animation-timeline')).toBeGreaterThan(guarded.indexOf('@supports'));
  });

  it('keeps a fallback fill from the progress value, and no transition under reduced motion', () => {
    expect(style).toContain('scaleY(var(--section-timeline-progress, 0))');
    const reduced = style.slice(style.indexOf('@media (prefers-reduced-motion: reduce)'));
    expect(reduced).toContain('transition: none');
  });
});
