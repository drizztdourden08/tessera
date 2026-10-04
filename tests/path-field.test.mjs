/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { PathField } from '../src/primitives/PathField';
import { droppedPath } from '../src/primitives/PathField/behavior/dropped-path';
import { splitPath } from '../src/primitives/PathField/behavior/split-path';

const KEY = String.raw`C:\Users\ana\.ssh\archipelago-servers\home-nas\id_ed25519`;
const BRAM = String.raw`D:\p\Bram.yaml`;
const BRAM_E = String.raw`E:\Bram.yaml`;

const item = (name, { folder = false, path } = {}) => {
  const file = { name, webkitRelativePath: '', ...(path ? { path } : {}) };
  return { kind: 'file', getAsFile: () => file, webkitGetAsEntry: () => ({ isDirectory: folder }) };
};
const data = (...items) => ({ items });
const labels = (html) => [...html.matchAll(/<button[^>]*aria-label="([^"]+)"/g)].map((match) => match[1]);

describe('PathField', () => {
  it('cuts a long path in the middle and keeps the file name whole', () => {
    expect(splitPath(KEY)).toEqual({ head: String.raw`C:\Users\ana\.ssh\archipelago-servers`, tail: String.raw`\home-nas\id_ed25519` });
    expect(splitPath('/home/ana/a.txt')).toEqual({ head: '/home', tail: '/ana/a.txt' });
    expect(splitPath('notes.txt')).toEqual({ head: 'notes.txt', tail: '' });
  });

  it('draws the path, its title and the copy, reveal, clear and change buttons', () => {
    const html = renderToString(h(PathField, { value: KEY, onChange: () => {}, onBrowse: () => null, onReveal: () => {} }));
    expect(html).toContain(`title="${KEY}"`);
    expect(html).toContain('data-masked="true"');
    expect(html).toContain('class="path-field__tail"');
    expect(labels(html)).toEqual(['Copy the path', 'Show in folder', 'Clear the path']);
    expect(html).toContain('>Change...<');
  });

  it('shows Browse and the placeholder when empty, and only copy and reveal when read only', () => {
    const empty = renderToString(h(PathField, { value: null, onChange: () => {}, onBrowse: () => null, kind: 'folder' }));
    expect(empty).toContain('placeholder="No folder yet"');
    expect(empty).toContain('>Browse...<');
    const shown = renderToString(h(PathField, { value: KEY, kind: 'folder', readOnly: true, onReveal: () => {}, onBrowse: () => null }));
    expect(labels(shown)).toEqual(['Copy the path', 'Open the folder']);
    expect(shown).toContain('readOnly=""');
    expect(shown).not.toContain('Change...');
  });

  it('takes the first dropped item that fits, with its path where the platform gives one', () => {
    expect(droppedPath(data(item('Bram.yaml', { path: BRAM })), { kind: 'file' })).toEqual({ path: BRAM });
    expect(droppedPath(data(item('Bram.yaml')), { kind: 'file' })).toEqual({ path: 'Bram.yaml' });
    expect(droppedPath(data(item('Bram.yaml')), { kind: 'file', resolvePath: () => BRAM_E })).toEqual({ path: BRAM_E });
    expect(droppedPath(data(item('runs', { folder: true }), item('a.yml')), { kind: 'file', accept: ['.yaml', '.yml'] })).toEqual({ path: 'a.yml' });
  });

  it('turns away a folder, a file or an ending that does not fit, and ignores drops with no file', () => {
    expect(droppedPath(data(item('runs', { folder: true })), { kind: 'file' })).toEqual({ problem: 'folder' });
    expect(droppedPath(data(item('a.zip')), { kind: 'folder' })).toEqual({ problem: 'file' });
    expect(droppedPath(data(item('notes.txt')), { kind: 'file', accept: ['.yaml'] })).toEqual({ problem: 'type' });
    expect(droppedPath(data(item('runs', { folder: true })), { kind: 'any', accept: ['.yaml'] })).toEqual({ path: 'runs' });
    expect(droppedPath(data({ kind: 'string', getAsFile: () => null }), { kind: 'any' })).toBeNull();
  });
});
