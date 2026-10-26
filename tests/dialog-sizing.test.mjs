/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import { Dialog } from '../src/composites/Dialog';
import { DialogShell } from '../src/composites/DialogShell';
import { JobDialog } from '../src/composites/JobDialog';

vi.mock('../src/primitives/Portal/Portal', () => ({ Portal: ({ children }) => children }));

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const css = read('../src/composites/DialogShell/DialogShell.css');
const canonical = read('../src/tokens/canonical.css');
const scale = read('../src/tokens/scale.css');

const classOfDialog = (html) => html.match(/<div [^>]*class="([^"]*)"[^>]*role="dialog"/)?.[1].split(' ') ?? [];
const shell = (props) => renderToStaticMarkup(h(DialogShell, { open: true, onClose: vi.fn(), title: 'Title', ...props }, 'Body'));
const pixels = (text, name) => Number(text.match(new RegExp(`--${name}:\\s*(\\d+)px`))?.[1]);
const sizeOf = (name) => {
  const alias = canonical.match(new RegExp(`--${name}:\\s*var\\(--(size-\\d+)\\)`))?.[1];
  return pixels(scale, alias);
};

describe('the size classes of a dialog', () => {
  it('defaults to sm and takes md and lg', () => {
    expect(classOfDialog(shell({}))).toContain('dialog--sm');
    expect(classOfDialog(shell({ size: 'md' }))).toContain('dialog--md');
    expect(classOfDialog(shell({ size: 'lg' }))).toContain('dialog--lg');
    expect(classOfDialog(shell({ size: 'lg' }))).not.toContain('dialog--sm');
  });

  it('adds dialog--steady only when asked', () => {
    expect(classOfDialog(shell({}))).not.toContain('dialog--steady');
    expect(classOfDialog(shell({ steady: true }))).toContain('dialog--steady');
  });

  it('keeps the caller class beside the size', () => {
    expect(classOfDialog(shell({ size: 'md', className: 'mine' }))).toEqual(expect.arrayContaining(['dialog', 'dialog--md', 'mine']));
  });

  it('passes size and steady from Dialog to the shell', () => {
    const html = renderToStaticMarkup(h(Dialog, { open: true, title: 'T', message: 'M', size: 'lg', steady: true, onConfirm: vi.fn(), onCancel: vi.fn() }));
    expect(classOfDialog(html)).toEqual(expect.arrayContaining(['dialog--lg', 'dialog--steady']));
  });

  it('holds a JobDialog at a steady md width', () => {
    const html = renderToStaticMarkup(h(JobDialog, { open: true, title: 'Installing', state: 'running', percent: 40, onHide: vi.fn() }));
    expect(classOfDialog(html)).toEqual(expect.arrayContaining(['dialog--md', 'dialog--steady', 'job-dialog']));
  });
});

describe('the sizing rules of a dialog', () => {
  it('follows the content, clamped by the size and by the viewport minus the margin', () => {
    expect(canonical).toMatch(/--dialog-fit:\s*calc\(100vw - var\(--dialog-margin\) \* 2\);/);
    expect(css).toMatch(/\.dialog \{[^}]*inline-size: fit-content;/s);
    expect(css).toMatch(/\.dialog \{[^}]*min-inline-size: min\(var\(--dialog-min\), var\(--dialog-fit\)\);/s);
    expect(css).toMatch(/\.dialog \{[^}]*max-inline-size: min\(var\(--dialog-max\), var\(--dialog-fit\)\);/s);
  });

  it('grows in height up to the viewport minus the margin', () => {
    expect(css).toMatch(/\.dialog \{[^}]*max-block-size: calc\(100vh - var\(--dialog-margin\) \* 2\);/s);
    expect(css).not.toMatch(/\.dialog \{[^}]*[^-]block-size: /s);
  });

  it('draws each size from its own min and max tokens', () => {
    ['sm', 'md', 'lg'].forEach((size) => {
      expect(css).toMatch(new RegExp(`\\.dialog--${size} \\{\\s*--dialog-min: var\\(--dialog-min-${size}\\);\\s*--dialog-max: var\\(--dialog-w-${size}\\);`));
    });
  });

  it('pins a steady dialog to the max of its size', () => {
    expect(css).toMatch(/\.dialog--steady \{\s*inline-size: min\(var\(--dialog-max\), var\(--dialog-fit\)\);/);
  });

  it('writes no raw length', () => {
    expect(css).not.toMatch(/\d+px/);
  });
});

describe('the dialog size tokens', () => {
  it('climb from sm to lg with each min no wider than its max', () => {
    const mins = ['dialog-min-sm', 'dialog-min-md', 'dialog-min-lg'].map(sizeOf);
    const maxes = ['dialog-w-sm', 'dialog-w-md', 'dialog-w-lg'].map(sizeOf);
    mins.forEach((min, index) => expect(min).toBeLessThanOrEqual(maxes[index]));
    expect([...mins].sort((a, b) => a - b)).toEqual(mins);
    expect([...maxes].sort((a, b) => a - b)).toEqual(maxes);
  });

  it('keep the margin on the spacing scale', () => {
    expect(canonical).toMatch(/--dialog-margin:\s*var\(--space-2xl\);/);
  });
});
