/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Box } from '../src/primitives/Box';
import { Link } from '../src/primitives/Link';
import { isPlainClick } from '../src/primitives/Link/behavior/is-plain-click';
import { navigateClick } from '../src/primitives/Link/behavior/navigate-click';
import { Toggle } from '../src/primitives/Toggle';

const anchor = (attributes = {}) => ({
  getAttribute: (name) => attributes[name] ?? null,
  hasAttribute: (name) => name in attributes,
});

const click = (overrides = {}) => {
  const event = {
    button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, defaultPrevented: false,
    currentTarget: anchor(), prevented: false, ...overrides,
  };
  event.preventDefault = () => { event.prevented = true; event.defaultPrevented = true; };
  return event;
};

const follow = (href, event, onClick) => {
  const went = [];
  navigateClick(href, (to) => went.push(to), onClick)(event);
  return { went };
};

describe('Link', () => {
  it('draws a styled anchor with its tone', () => {
    const html = renderToString(h(Link, { href: '/guide', tone: 'secondary', className: 'own' }, 'Guide'));
    expect(html).toContain('href="/guide"');
    expect(html).toContain('class="link own"');
    expect(html).toContain('data-tone="secondary"');
  });

  it('opens an external link in a new tab, safely, and says so', () => {
    const html = renderToString(h(Link, { href: 'https://example.com', external: true }, 'Docs'));
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain('aria-label="opens in a new tab"');
    expect(html).toMatch(/<svg[^>]*role="img"[^>]*aria-label="opens in a new tab"/);
    expect(html).not.toMatch(/<svg[^>]*aria-hidden="true"[^>]*aria-label="opens in a new tab"/);
  });

  it('is not what Box draws for an href any more', () => {
    expect(renderToString(h(Box, null, 'Plain'))).toBe('<div>Plain</div>');
  });

  it('draws the Toggle link as an external Link', () => {
    const html = renderToString(h(Toggle, { checked: true, onChange: () => undefined, label: 'Sync', description: 'Keeps saves in step.', link: '/sync' }));
    expect(html).toContain('class="link toggle__link"');
    expect(html).toContain('target="_blank"');
  });
});

describe('Link with navigate', () => {
  it('still renders a real href', () => {
    expect(renderToString(h(Link, { href: '/saves/2', navigate: () => undefined }, 'Slot 2'))).toContain('href="/saves/2"');
  });

  it('keeps the plain onClick when it has no navigate', () => {
    const onClick = () => undefined;
    expect(navigateClick('/saves/2', undefined, onClick)).toBe(onClick);
  });

  it('hands a plain click to navigate instead of loading the page', () => {
    const event = click();
    const { went } = follow('/saves/2', event);
    expect(went).toEqual(['/saves/2']);
    expect(event.prevented).toBe(true);
  });

  it('leaves modified, middle and new tab clicks to the browser', () => {
    const cases = [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }, { currentTarget: anchor({ target: '_blank' }) }, { currentTarget: anchor({ download: '' }) }];
    for (const overrides of cases) {
      const event = click(overrides);
      expect(follow('/saves/2', event).went).toEqual([]);
      expect(event.prevented).toBe(false);
    }
  });

  it('runs its own onClick first, which can stop the navigation', () => {
    const event = click();
    const { went } = follow('/saves/2', event, (e) => e.preventDefault());
    expect(went).toEqual([]);
    expect(isPlainClick(click({ defaultPrevented: true }))).toBe(false);
  });
});
