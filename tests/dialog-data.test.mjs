/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { DialogShell } from '../src/composites/DialogShell';
import { JobDialog } from '../src/composites/JobDialog';

vi.mock('../src/primitives/Portal/Portal', () => ({ Portal: ({ children }) => children }));

const tagsWith = (html, text) => (html.match(/<[a-z0-9]+ [^>]*>/g) ?? []).filter((tag) => tag.includes(text));
const attribute = (tag, name) => tag.match(new RegExp(` ${name}="([^"]*)"`))?.[1];

const expectOnDialog = (html) => {
  const [dialog, ...rest] = tagsWith(html, 'role="dialog"');
  expect(rest).toEqual([]);
  expect(attribute(dialog, 'id')).toBe('job-7');
  expect(attribute(dialog, 'data-job-id')).toBe('7');
  expect(attribute(dialog, 'data-kind')).toBe('install');
  expect(tagsWith(html, 'data-job-id')).toEqual([dialog]);
  expect(tagsWith(html, 'id="job-7"')).toEqual([dialog]);
  const labelledBy = attribute(dialog, 'aria-labelledby');
  expect(labelledBy).toBeTruthy();
  expect(labelledBy).not.toBe('job-7');
  const [heading] = tagsWith(html, `id="${labelledBy}"`);
  expect(heading).toMatch(/^<h3 /);
};

const passed = { id: 'job-7', data: { 'data-job-id': '7', 'data-kind': 'install' } };

describe('id and data on a dialog', () => {
  it('land on the DialogShell element with role dialog, and the title still names it', () => {
    const html = renderToStaticMarkup(h(DialogShell, { open: true, onClose: vi.fn(), title: 'Install', ...passed }, 'Body'));
    expectOnDialog(html);
  });

  it('land on the JobDialog element with role dialog, and the title still names it', () => {
    const html = renderToStaticMarkup(h(JobDialog, { open: true, title: 'Installing', state: 'running', percent: 40, onHide: vi.fn(), ...passed }));
    expectOnDialog(html);
  });

  it('leave the dialog without an id when none is passed', () => {
    const html = renderToStaticMarkup(h(DialogShell, { open: true, onClose: vi.fn(), title: 'Install' }, 'Body'));
    const [dialog] = tagsWith(html, 'role="dialog"');
    expect(attribute(dialog, 'id')).toBeUndefined();
  });
});
