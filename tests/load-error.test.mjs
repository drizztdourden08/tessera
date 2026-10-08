/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { ErrorBoundary } from '../src/composites/ErrorBoundary';
import { LoadError } from '../src/composites/LoadError';
import { rawError } from '../src/composites/LoadError/behavior/raw-error';
import { Callout } from '../src/primitives/Callout';
import { Disclosure } from '../src/primitives/Disclosure';

const RAW = 'connect ECONNREFUSED 127.0.0.1:7341';
const noop = () => undefined;
const draw = (props) => renderToString(h(LoadError, { message: 'Could not load your sessions.', ...props }));
const raw = (html) => /<pre class="[^"]*load-error__raw" tabindex="0">([^<]*)<\/pre>/.exec(html)?.[1];

describe('Disclosure', () => {
  it('is a details element with a chevron summary, closed unless defaultOpen', () => {
    const closed = renderToString(h(Disclosure, { summary: 'What is new' }, 'Notes'));
    expect(closed).toMatch(/^<details class="disclosure disclosure--md"><summary class="disclosure__summary"><svg[^>]*disclosure__chevron/);
    expect(closed).toContain('What is new</summary><div class="disclosure__body">Notes</div></details>');
    expect(renderToString(h(Disclosure, { summary: 'Details', defaultOpen: true, size: 'sm', className: 'x' }, 'Raw')))
      .toMatch(/^<details open="" class="disclosure disclosure--sm x">/);
  });
});

describe('Callout details', () => {
  it('puts block content in a full width part under the line, and changes nothing without it', () => {
    expect(renderToString(h(Callout, { tone: 'danger' }, 'Note'))).toMatch(/^<div role="note" class="callout callout--box callout--danger">/);
    const html = renderToString(h(Callout, { tone: 'info', details: h('p', null, 'More') }, 'Note'));
    expect(html).toContain('class="callout callout--box callout--info callout--details"');
    expect(html).toMatch(/callout__text">Note<\/p><div class="callout__details"><p>More<\/p><\/div><\/div>$/);
  });
});

describe('rawError', () => {
  it('reads an Error, a string, an object and nothing', () => {
    const error = new Error('boom');
    expect(rawError(error)).toBe(error.stack);
    expect(rawError(Object.assign(new Error('bare'), { stack: undefined }))).toBe('bare');
    expect(rawError(RAW)).toBe(RAW);
    expect(rawError({ code: 7 })).toBe('{\n  "code": 7\n}');
    const loop = {};
    loop.self = loop;
    expect(rawError(loop)).toBe('[object Object]');
    expect(rawError(42)).toBe('42');
    for (const empty of [undefined, null, false, '']) expect(rawError(empty)).toBeNull();
  });
});

describe('LoadError', () => {
  it('centres the sentence as an alert, with Details closed and no Retry by default', () => {
    const html = draw({ error: RAW });
    expect(html).toMatch(/^<div class="load-error load-error--center"><div role="alert" class="load-error__lead">/);
    expect(html).toContain('load-error__message">Could not load your sessions.</span>');
    expect(html).toContain('<details class="disclosure disclosure--md load-error__details load-error__details--center">');
    expect(raw(html)).toBe(RAW);
    expect(html).not.toContain('retry-button');
  });

  it('adds Retry with onRetry, spinning while retrying, and leaves Details out with no error', () => {
    const html = draw({ onRetry: noop, retrying: true });
    expect(html).toContain('class="retry-button load-error__retry"');
    expect(html).toContain('aria-busy="true"');
    expect(html).not.toContain('<details');
  });

  it('draws the box as a danger Callout with Retry as its action and Details under the line', () => {
    const html = draw({ variant: 'box', error: RAW, onRetry: noop, className: 'mine' });
    expect(html).toMatch(/^<div role="note" class="callout callout--box callout--danger callout--details load-error load-error--box mine">/);
    expect(html).toContain('<span class="text-el text-el--span load-error__message" role="alert">Could not load your sessions.</span>');
    expect(html).toMatch(/<div class="callout__action"><span class="retry-button load-error__retry"><button class="btn btn--secondary/);
    expect(html).toMatch(/<div class="callout__details"><details class="disclosure disclosure--md load-error__details">/);
  });

  it('draws inline in small text with a ghost Retry', () => {
    const html = draw({ variant: 'inline', error: RAW, onRetry: noop });
    expect(html).toMatch(/^<div class="load-error load-error--inline">/);
    expect(html).toContain('btn btn--ghost');
    expect(html).toContain('disclosure disclosure--sm load-error__details"');
  });
});

describe('ErrorBoundary fallback', () => {
  const caught = (props) => {
    const boundary = new ErrorBoundary({ children: null, ...props });
    boundary.state = { caught: true, error: new Error('The total is not a number') };
    return boundary;
  };

  it('shows the label as the sentence and the caught error behind Details, with no Retry by default', () => {
    const html = renderToString(caught({ label: 'The order summary could not be shown' }).render());
    expect(html).toMatch(/^<div role="note" class="callout callout--box callout--danger callout--details load-error load-error--box">/);
    expect(html).toContain('role="alert">The order summary could not be shown</span>');
    expect(raw(html)).toMatch(/^Error: The total is not a number/);
    expect(html).not.toContain('retry-button');
  });

  it('adds Retry with onRetry, which calls it and renders the children again', () => {
    const onRetry = vi.fn();
    const boundary = caught({ onRetry, action: h('button', null, 'Contact support') });
    const html = renderToString(boundary.render());
    expect(html).toMatch(/^<div class="error-boundary"><div role="note" class="callout[^"]*load-error--box">/);
    expect(html).toContain('retry-button load-error__retry');
    expect(html.endsWith('<div class="error-boundary__action"><button>Contact support</button></div></div>')).toBe(true);
    const setState = vi.spyOn(boundary, 'setState').mockImplementation(noop);
    boundary.retry();
    expect(onRetry).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledWith({ caught: false, error: undefined });
  });
});
