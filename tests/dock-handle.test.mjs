/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { handleOf } from '../src/composites/DockLayout/behavior/handle-of';
import { isElement } from '../src/primitives/dom/is-element';

const attributeIn = (selector) => /^\[([^\]=]+)\]$/.exec(selector)?.[1];

const node = (tag, attrs = {}, parent = null, { svg = false } = {}) => {
  const element = {
    nodeType: 1,
    tagName: svg ? tag : tag.toUpperCase(),
    parent,
    hasAttribute: (name) => name in attrs,
    matches: (selector) => selector.split(',').some((part) => part === tag || attrs[attributeIn(part)] !== undefined),
    closest(selector) {
      for (let at = this; at; at = at.parent) if (at.matches(selector)) return at;
      return null;
    },
  };
  if (!svg) element.offsetHeight = 20;
  return element;
};

const iconIn = (parent) => {
  const svg = node('svg', {}, parent, { svg: true });
  return { svg, path: node('path', {}, svg, { svg: true }) };
};

describe('the drag handle a press starts from', () => {
  it('is found from the icon of a widget grip, the svg and its path alike', () => {
    const grip = node('div', { 'data-drag-widget': 'players' });
    const { svg, path } = iconIn(grip);
    expect(handleOf(svg)).toBe(grip);
    expect(handleOf(path)).toBe(grip);
  });

  it('is found from the icon and the label of the main view grip', () => {
    const grip = node('div', { 'data-drag-main': '' });
    expect(handleOf(iconIn(grip).path)).toBe(grip);
    expect(handleOf(node('span', {}, grip))).toBe(grip);
  });

  it('is found from an icon anywhere in a title strip', () => {
    const strip = node('div', { 'data-drag-widget': 'log' });
    const title = node('span', {}, strip);
    expect(handleOf(iconIn(title).svg)).toBe(strip);
  });

  it('is a tab chip when its icon is pressed, though the chip is a button', () => {
    const strip = node('div', { 'data-drag-widget': 'log' });
    const chip = node('button', { 'data-drag-tab': 'hints' }, strip);
    expect(handleOf(iconIn(chip).path)).toBe(chip);
  });

  it('is none for the icon of a button in the strip, which stays a click', () => {
    const strip = node('div', { 'data-drag-widget': 'log' });
    const close = node('button', {}, strip);
    expect(handleOf(iconIn(close).svg)).toBeNull();
    expect(handleOf(iconIn(close).path)).toBeNull();
  });

  it('is none outside a handle, for text nodes and for targets that are not elements', () => {
    expect(handleOf(iconIn(node('div')).svg)).toBeNull();
    expect(handleOf({ nodeType: 3 })).toBeNull();
    expect(handleOf({})).toBeNull();
    expect(handleOf(null)).toBeNull();
  });
});

describe('isElement', () => {
  it('takes html and svg elements and nothing else', () => {
    expect(isElement(node('div'))).toBe(true);
    expect(isElement(node('svg', {}, null, { svg: true }))).toBe(true);
    expect(isElement({ nodeType: 9 })).toBe(false);
    expect(isElement({ nodeType: 3 })).toBe(false);
    expect(isElement(undefined)).toBe(false);
  });
});
