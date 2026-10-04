/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ValidationSummary } from '../src/composites/ValidationSummary';

const PROBLEMS = ['a', 'b', 'c', 'd', 'e', 'f'].map((id) => ({ id, message: `Fix ${id}`, field: `field-${id}` }));
const noop = () => {};
const items = (html) => [...html.matchAll(/role="listitem"[^>]*>.*?(Fix \w)/g)].map((match) => match[1]);

describe('ValidationSummary', () => {
  it('draws nothing without problems', () => {
    expect(renderToString(h(ValidationSummary, { problems: [] }))).toBe('');
  });

  it('counts the problems in an alert and lists the first four', () => {
    const html = renderToString(h(ValidationSummary, { problems: PROBLEMS, onFocusField: noop }));
    expect(html).toMatch(/^<div role="alert"/);
    expect(html).toContain('callout--danger');
    expect(html).toContain('6 things to fix before saving');
    expect(html).toContain('role="list"');
    expect(items(html)).toEqual(['Fix a', 'Fix b', 'Fix c', 'Fix d']);
    expect(html).toContain('and 2 more');
  });

  it('makes a problem with a field a button, and plain text without onFocusField', () => {
    const linked = renderToString(h(ValidationSummary, { problems: PROBLEMS.slice(0, 1), onFocusField: noop }));
    expect(linked).toMatch(/<button[^>]*validation-summary__jump/);
    expect(linked).toContain('1 thing to fix before saving');
    const plain = renderToString(h(ValidationSummary, { problems: PROBLEMS.slice(0, 1) }));
    expect(plain).not.toContain('<button');
  });

  it('takes the title, the warning tone and max', () => {
    const html = renderToString(h(ValidationSummary, { problems: PROBLEMS, title: '2 options need a look', tone: 'warning', max: 2 }));
    expect(html).toContain('callout--warning');
    expect(html).toContain('2 options need a look');
    expect(items(html)).toEqual(['Fix a', 'Fix b']);
    expect(html).toContain('and 4 more');
  });
});
