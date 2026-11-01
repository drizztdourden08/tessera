/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { droppedPath } from '../src/composites/PathInput/behavior/dropped-path';
import { splitPath } from '../src/composites/PathInput/behavior/split-path';

const KEY = String.raw`C:\Users\ana\.ssh\archipelago-servers\home-nas\id_ed25519`;
const BRAM = String.raw`D:\p\Bram.yaml`;
const BRAM_E = String.raw`E:\Bram.yaml`;

const item = (name, { folder = false, path } = {}) => {
  const file = { name, webkitRelativePath: '', ...(path ? { path } : {}) };
  return { kind: 'file', getAsFile: () => file, webkitGetAsEntry: () => ({ isDirectory: folder }) };
};
const data = (...items) => ({ items });

describe('K1 PathInput', { tags: ['critical'] }, () => {
  it('cuts a long path in the middle and keeps the file name whole', () => {
    expect(splitPath(KEY)).toEqual({ head: String.raw`C:\Users\ana\.ssh\archipelago-servers`, tail: String.raw`\home-nas\id_ed25519` });
    expect(splitPath('/home/ana/a.txt')).toEqual({ head: '/home', tail: '/ana/a.txt' });
    expect(splitPath('notes.txt')).toEqual({ head: 'notes.txt', tail: '' });
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
