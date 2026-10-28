/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Breadcrumbs } from '../src/composites/Breadcrumbs';
import { foldSegments } from '../src/composites/Breadcrumbs/behavior/fold-segments';
import { pathTextOf } from '../src/composites/Breadcrumbs/behavior/path-text-of';
import { segmentDropHandlers } from '../src/composites/Breadcrumbs/behavior/segment-drop-handlers';

const ignore = () => undefined;
const SEGMENTS = ['project', 'art', 'sprites', 'heroes', 'idle'].map((id) => ({ id, label: id }));
const draw = (props = {}) => renderToString(h(Breadcrumbs, { segments: SEGMENTS.slice(0, 3), onNavigate: ignore, ...props }));

describe('Breadcrumbs trail', () => {
  it('is a nav named Breadcrumbs over an ordered list of buttons, the last one current', () => {
    const html = draw();
    expect(html).toMatch(/<nav[^>]*aria-label="Breadcrumbs"/);
    expect(html).toContain('<ol');
    expect(html.match(/breadcrumbs__segment/g)).toHaveLength(3);
    expect(html.match(/aria-current="page"/g)).toHaveLength(1);
    expect(html).toMatch(/aria-current="page"[^>]*><span class="text-el text-el--span breadcrumbs__label">sprites/);
  });

  it('uses the label it is given', () => {
    expect(draw({ label: 'Folder path' })).toMatch(/aria-label="Folder path"/);
  });

  it('draws the icon of a segment', () => {
    const html = draw({ segments: [{ id: 'a', label: 'Assets', icon: 'folder' }] });
    expect(html).toContain('<svg');
  });

  it('draws a separator between segments but not before the first', () => {
    expect(draw().match(/breadcrumbs__separator/g)).toHaveLength(2);
  });

  it('draws a sibling menu button after a segment that has siblings', () => {
    const siblings = [{ id: 'other', label: 'other', onSelect: ignore }];
    const html = draw({ segments: [{ id: 'a', label: 'Assets', siblings }, { id: 'b', label: 'Sprites' }] });
    expect(html.match(/breadcrumbs__siblings/g)).toHaveLength(1);
    expect(html).toContain('aria-label="Places next to Assets"');
  });

  it('draws the trailing slot at the end', () => {
    expect(draw({ trailing: 'TAGS' })).toMatch(/breadcrumbs__trailing">TAGS/);
  });
});

describe('Breadcrumbs middle overflow', () => {
  const ids = (segments) => segments.map((segment) => segment.id);

  it('keeps everything while the trail fits', () => {
    expect(foldSegments(SEGMENTS, undefined).hidden).toHaveLength(0);
    expect(foldSegments(SEGMENTS, 5).hidden).toHaveLength(0);
    expect(foldSegments(SEGMENTS, 9).hidden).toHaveLength(0);
  });

  it('keeps the first segment and the last ones and folds the middle', () => {
    const folded = foldSegments(SEGMENTS, 4);
    expect(ids(folded.head)).toEqual(['project']);
    expect(ids(folded.hidden)).toEqual(['art', 'sprites']);
    expect(ids(folded.tail)).toEqual(['heroes', 'idle']);
  });

  it('never keeps fewer than three places', () => {
    const folded = foldSegments(SEGMENTS, 1);
    expect(ids(folded.head)).toEqual(['project']);
    expect(ids(folded.tail)).toEqual(['idle']);
    expect(ids(folded.hidden)).toEqual(['art', 'sprites', 'heroes']);
  });

  it('draws one ellipsis menu for the folded places', () => {
    const html = draw({ segments: SEGMENTS, maxVisible: 3 });
    expect(html.match(/breadcrumbs__overflow/g)).toHaveLength(1);
    expect(html.match(/breadcrumbs__segment/g)).toHaveLength(2);
    expect(html).toContain('aria-label="Show the hidden levels"');
  });
});

describe('Breadcrumbs path box', () => {
  it('offers the click at the end only with onPathSubmit', () => {
    expect(draw()).not.toContain('breadcrumbs__fill');
    const html = draw({ onPathSubmit: ignore });
    expect(html).toContain('breadcrumbs__fill');
    expect(html).toContain('aria-label="Edit the path"');
  });

  it('shows the labels joined by a slash, or the path it is given', () => {
    expect(pathTextOf(SEGMENTS.slice(0, 3), undefined)).toBe('project/art/sprites');
    expect(pathTextOf(SEGMENTS, 'C:/work/art')).toBe('C:/work/art');
  });
});

describe('Breadcrumbs drop target', () => {
  const event = () => ({ prevented: false, preventDefault() { this.prevented = true; } });

  it('accepts a drag over a segment and reports the drop with its id', () => {
    const over = [];
    const dropped = [];
    const handlers = segmentDropHandlers('art', { onDropOn: (id) => dropped.push(id) }, (update) => over.push(update(null)));
    const dragOver = event();
    handlers.onDragOver(dragOver);
    expect(dragOver.prevented).toBe(true);
    expect(over).toEqual(['art']);
    handlers.onDrop(event());
    expect(dropped).toEqual(['art']);
    expect(over.at(-1)).toBeNull();
  });

  it('clears the mark only when the drag leaves the segment that was marked', () => {
    const marks = [];
    const handlers = segmentDropHandlers('art', { onDropOn: ignore }, (update) => marks.push([update('art'), update('sprites')]));
    handlers.onDragLeave();
    expect(marks).toEqual([[null, 'sprites']]);
  });

  it('turns a drag away when canDrop says no, and does nothing without onDropOn', () => {
    const refused = segmentDropHandlers('art', { onDropOn: ignore, canDrop: () => false }, ignore);
    const dragOver = event();
    refused.onDragOver(dragOver);
    expect(dragOver.prevented).toBe(false);
    const idle = segmentDropHandlers('art', {}, ignore);
    const other = event();
    idle.onDragOver(other);
    idle.onDrop(other);
    expect(other.prevented).toBe(false);
  });

  it('marks nothing as a drop target while no drag is over it', () => {
    expect(draw({ onDropOn: ignore })).not.toContain('data-drop');
  });
});
