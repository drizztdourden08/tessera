/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Markdown } from '../src/composites/Markdown';
import { SearchInput, Status, Tabs, Tag } from '../src/primitives';

const read = (path) => readFileSync(path, 'utf8');
const noop = () => undefined;

describe('SearchInput width narrow-fill', () => {
  it('adds its own class and keeps narrow as it was', () => {
    expect(renderToString(h(SearchInput, { value: '', onChange: noop, width: 'narrow-fill' }))).toContain('control-narrow-fill');
    expect(renderToString(h(SearchInput, { value: '', onChange: noop, width: 'narrow' }))).not.toContain('control-narrow-fill');
    expect(renderToString(h(SearchInput, { value: '', onChange: noop }))).not.toContain('control-narrow');
  });

  it('fills the row at the pixel width of the field-w-fill-below token', () => {
    expect(read('src/tokens/size.css')).toContain('--field-w-fill-below: calc(420 * var(--size-1))');
    const css = read('src/theme/field-surface.css');
    expect([...css.matchAll(/@container \(width < (\d+)px\)/g)].map((m) => m[1])).toEqual(['420']);
    expect(css).toMatch(/@container \(width < 420px\) \{\s+:is\([^)]*\)\.control-narrow-fill \{\s+flex: 1 1 auto;\s+inline-size: 100%;/);
  });
});

describe('DropdownMenu select row layout', () => {
  it('already stacks the label above the Select in the second grid row', () => {
    const css = read('src/composites/DropdownMenu/sub-components/MenuPanel.css');
    expect(css).toMatch(/\.dropdown__label \{\s+grid-area: 1 \/ 3;/);
    expect(css).toMatch(/\.dropdown__select-field \{\s+grid-area: 2 \/ 3 \/ auto \/ span 2;/);
  });
});

describe('Tabs badgeFill', () => {
  const badgeOf = (props) => renderToString(h(Tabs, { tabs: [{ id: 'jobs', label: 'Jobs', badge: 3, badgeTone: 'info' }], activeTab: '', onTabChange: noop, ...props })).match(/class="(badge [^"]*)"/)?.[1];

  it('keeps the tinted inline badge by default', () => {
    expect(badgeOf({})).toContain('badge--inline');
    expect(badgeOf({ badgeFill: 'tint' })).toContain('badge--inline');
  });

  it('draws the solid number badge with solid', () => {
    const solid = badgeOf({ badgeFill: 'solid' });
    expect(solid).toContain('badge--number');
    expect(solid).toContain('badge--info');
    expect(solid).not.toContain('badge--inline');
  });
});

describe('Tag reason', () => {
  const draw = (props) => renderToString(h(Tag, { variant: 'urgency', color: 'danger', ...props }, 'brock-lint'));

  it('draws nothing extra without a reason', () => {
    expect(draw({})).not.toContain('tag__reason');
    expect(draw({})).not.toContain('tag--reasoned');
  });

  it('draws the reason after the name in its own part', () => {
    const out = draw({ reason: 'timed out' });
    expect(out).toContain('tag--reasoned');
    expect(out.indexOf('brock-lint')).toBeLessThan(out.indexOf('tag__reason'));
    expect(out).toContain('>timed out</span>');
  });

  it('puts the name in the text colour and only the reason in the tone', () => {
    const css = read('src/primitives/Tag/Tag.css');
    expect(css).toMatch(/\.tag--reasoned \{\s+color: var\(--c-text\);/);
    expect(css).toMatch(/\.tag__reason \{[^}]*color: var\(--tag-ink\);/);
  });
});

describe('Status reason', () => {
  const draw = (props) => renderToString(h(Status, { tone: 'danger', ...props }, 'Failed'));

  it('draws nothing extra without a reason', () => {
    expect(draw({})).not.toContain('status__reason');
    expect(draw({})).not.toContain('status--reasoned');
  });

  it('draws the reason after the word and keeps the word in the text colour', () => {
    const out = draw({ reason: 'timed out' });
    expect(out).toContain('status--reasoned');
    expect(out.indexOf('Failed')).toBeLessThan(out.indexOf('status__reason'));
    const css = read('src/primitives/Status/Status.css');
    expect(css).toMatch(/\.status--reasoned \{\s+color: var\(--c-text\);/);
    expect(css).toMatch(/\.status__reason \{\s+color: var\(--status-ink\);/);
  });
});

describe('Markdown idLinkTone', () => {
  const ids = { pattern: /T-\d+/, href: (id) => `https://example.com/${id}` };
  const draw = (props) => renderToString(h(Markdown, { source: 'Fixed T-5, see [the notes](https://example.com/notes).', linkIds: ids, ...props }));
  const toneOf = (html, text) => html.match(new RegExp(`data-tone="([a-z]+)"[^>]*>${text}<`))?.[1];

  it('gives ids and web links the same tone without it', () => {
    const out = draw({ linkTone: 'info' });
    expect(toneOf(out, 'T-5')).toBe('info');
    expect(toneOf(out, 'the notes')).toBe('info');
  });

  it('gives only the id links the id tone', () => {
    const out = draw({ linkTone: 'info', idLinkTone: 'neutral' });
    expect(toneOf(out, 'T-5')).toBe('neutral');
    expect(toneOf(out, 'the notes')).toBe('info');
  });

  it('keeps web links on the default tone when only the id tone is set', () => {
    const out = draw({ idLinkTone: 'neutral' });
    expect(toneOf(out, 'T-5')).toBe('neutral');
    expect(toneOf(out, 'the notes')).toBe('primary');
  });

  it('does not leak the marker into the page', () => {
    expect(draw({ idLinkTone: 'neutral' })).not.toContain('data-id-link');
  });
});
