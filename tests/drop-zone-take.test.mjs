/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { DropZone } from '../src/primitives/DropZone';
import { filterFiles } from '../src/primitives/DropZone/behavior/filter-files';

const file = (name, type) => ({ name, type });

describe('what a DropZone takes', () => {
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

describe('the status line of a DropZone', () => {
  const draw = (props) => renderToStaticMarkup(h(DropZone, { onDrop: () => undefined, ...props }));

  it('says what the zone holds as a status, green on success with a green edge', () => {
    const html = draw({ status: { tone: 'success', message: 'Chrono Trigger is ready' } });
    expect(html).toContain('dropzone--success');
    expect(html).toMatch(/dropzone__status dropzone__status--success" role="status">Chrono Trigger is ready/);
  });

  it('draws an error line with no green edge, and nothing without a status', () => {
    const html = draw({ status: { tone: 'error', message: 'Not a ROM' } });
    expect(html).toContain('dropzone__status--error');
    expect(html).not.toContain('dropzone--success');
    expect(draw({})).not.toContain('role="status"');
  });
});
