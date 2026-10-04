/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { FileList } from '../src/composites/FileList';
import { fileIcon } from '../src/composites/FileList/behavior/file-icon';
import { fileName } from '../src/composites/FileList/behavior/file-name';

const FILES = [
  { path: 'C:\\runs\\friday\\AP_1.zip', size: 18.4 * 1024 * 1024, modified: Date.UTC(2026, 9, 4, 19, 2) },
  { path: 'runs/friday/server.log', size: 307 * 1024 },
  { path: 'runs/friday/AP_1.apsave', name: 'Save of Friday', icon: 'save' },
];
const noop = () => {};

describe('FileList names and icons', () => {
  it('takes the name after the last slash of either kind, or the name given', () => {
    expect(FILES.map(fileName)).toEqual(['AP_1.zip', 'server.log', 'Save of Friday']);
  });

  it('picks the icon from the extension, the icon given first', () => {
    expect(fileIcon('AP_1.zip')).toBe('archive');
    expect(fileIcon('server.LOG')).toBe('file-text');
    expect(fileIcon('map.png')).toBe('image');
    expect(fileIcon('AP_1.aplttp')).toBe('file');
    expect(fileIcon('.gitignore')).toBe('file');
    expect(fileIcon('AP_1.apsave', 'save')).toBe('save');
  });
});

describe('FileList', () => {
  it('draws one named list item per file with its size and date', () => {
    const html = renderToString(h(FileList, { files: FILES, label: 'Output', onOpen: noop, onReveal: noop }));
    expect(html).toMatch(/^<ul class="file-list" aria-label="Output"/);
    expect(html.match(/class="file-list__row"/g)).toHaveLength(3);
    expect(html).toContain('>18.4 MB<');
    expect(html).toContain('>307 KB<');
    expect(html).toContain('dateTime="2026-10-04T19:02:00.000Z"');
    expect(html).toContain('aria-label="Open AP_1.zip"');
    expect(html).toContain('aria-label="Show server.log in its folder"');
  });

  it('leaves out the buttons without handlers', () => {
    const html = renderToString(h(FileList, { files: FILES }));
    expect(html).not.toContain('<button');
    expect(html).toContain('aria-label="Files"');
  });

  it('says why the list is empty', () => {
    expect(renderToString(h(FileList, { files: [] }))).toContain('No files yet.');
    const html = renderToString(h(FileList, { files: [], empty: 'No output files yet.', dense: true }));
    expect(html).toMatch(/file-list--empty" data-dense="">No output files yet\.</);
  });
});
