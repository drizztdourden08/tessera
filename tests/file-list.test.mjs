/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { fileIcon } from '../src/composites/FileList/behavior/file-icon';
import { fileName } from '../src/composites/FileList/behavior/file-name';

const FILES = [
  { path: 'C:\\runs\\friday\\AP_1.zip', size: 18.4 * 1024 * 1024, modified: Date.UTC(2026, 9, 4, 19, 2) },
  { path: 'runs/friday/server.log', size: 307 * 1024 },
  { path: 'runs/friday/AP_1.apsave', name: 'Save of Friday', icon: 'save' },
];

describe('K1 FileList names and icons', { tags: ['critical'] }, () => {
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
