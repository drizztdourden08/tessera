/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Drawer } from '../src/composites/Drawer';
import { WindowHeader } from '../src/composites/WindowHeader';
import { Card } from '../src/primitives/Card';
import { Flex } from '../src/primitives/Flex';
import { FoldText } from '../src/primitives/FoldText';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

describe('container on Card and Flex', () => {
  it('adds the container class only when asked', () => {
    expect(renderToString(h(Card, { container: true }, 'x'))).toContain('card--container');
    expect(renderToString(h(Card, null, 'x'))).not.toContain('card--container');
    expect(renderToString(h(Flex, { container: true }, 'x'))).toContain('flex--container');
    expect(renderToString(h(Flex, null, 'x'))).not.toContain('flex--container');
  });

  it('sets an inline size container in CSS', () => {
    expect(read('src/primitives/Card/Card.css')).toMatch(/\.card--container \{\s*container-type: inline-size;/);
    expect(read('src/primitives/Flex/Flex.css')).toContain('.flex--container { container-type: inline-size; }');
  });
});

describe('FoldText hug', () => {
  it('fills with truncate middle and hugs when asked', () => {
    expect(renderToString(h(FoldText, { truncate: 'middle' }, 'a/b/c.txt'))).toContain('fold-text--fill');
    const hugged = renderToString(h(FoldText, { truncate: 'middle', hug: true }, 'a/b/c.txt'));
    expect(hugged).not.toContain('fold-text--fill');
    expect(hugged).toContain('fold-text__text--hug');
    expect(hugged).toContain('fold-text__sizer');
  });
});

describe('header actions in the eyebrow row', () => {
  const props = { eyebrow: 'INC-1', title: 'Title', actions: h('button', null, 'Pin') };

  it('keeps the actions in the title row by default', () => {
    const out = renderToString(h(WindowHeader, props));
    expect(out).not.toContain('window-header__eyebrow-row');
    expect(out).toContain('window-header__actions');
  });

  it('moves the actions into the eyebrow row once, and not without an eyebrow', () => {
    const out = renderToString(h(WindowHeader, { ...props, actionsRow: 'eyebrow' }));
    expect(out).toContain('window-header__eyebrow-row');
    expect(out.match(/window-header__actions/g)).toHaveLength(1);
    expect(out.indexOf('window-header__eyebrow-row')).toBeLessThan(out.indexOf('window-header__actions'));
    const bare = renderToString(h(WindowHeader, { title: 'Title', actions: props.actions, actionsRow: 'eyebrow' }));
    expect(bare).not.toContain('window-header__eyebrow-row');
    expect(bare).toContain('window-header__actions');
  });

  it('passes headerActionsRow from the Drawer', () => {
    const out = renderToString(h(Drawer, { open: true, onClose: () => undefined, eyebrow: 'INC-1', title: 'T', headerActions: props.actions, headerActionsRow: 'eyebrow' }, 'x'));
    expect(out).toContain('window-header__eyebrow-row');
  });
});
