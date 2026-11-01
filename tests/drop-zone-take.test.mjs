/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { filterFiles } from '../src/primitives/DropZone/behavior/filter-files';

const file = (name, type) => ({ name, type });

describe('K1 what a DropZone takes', { tags: ['critical'] }, () => {
  const files = [file('Chrono Trigger.sfc', ''), file('shot.PNG', 'image/png'), file('cover.jpg', 'image/jpeg'), file('notes.txt', 'text/plain')];

  it('matches an extension at the end of the name, whatever the case', () => {
    expect(filterFiles(files, ['.sfc', '.png']).map((f) => f.name)).toEqual(['Chrono Trigger.sfc', 'shot.PNG']);
  });

  it('matches a media type exactly and a family such as image/* by its start', () => {
    expect(filterFiles(files, ['image/png']).map((f) => f.name)).toEqual(['shot.PNG']);
    expect(filterFiles(files, ['IMAGE/*']).map((f) => f.name)).toEqual(['shot.PNG', 'cover.jpg']);
    expect(filterFiles(files, ['image/*', '.txt']).map((f) => f.name)).toEqual(['shot.PNG', 'cover.jpg', 'notes.txt']);
  });

  it('takes everything without accept', () => {
    expect(filterFiles(files, undefined)).toHaveLength(4);
  });
});
