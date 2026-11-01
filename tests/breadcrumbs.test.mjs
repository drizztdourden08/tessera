/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { foldSegments } from '../src/composites/Breadcrumbs/behavior/fold-segments';
import { pathTextOf } from '../src/composites/Breadcrumbs/behavior/path-text-of';
import { segmentDropHandlers } from '../src/composites/Breadcrumbs/behavior/segment-drop-handlers';

const ignore = () => undefined;
const SEGMENTS = ['project', 'art', 'sprites', 'heroes', 'idle'].map((id) => ({ id, label: id }));

describe('K1 Breadcrumbs middle overflow', { tags: ['critical'] }, () => {
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
});

describe('K1 Breadcrumbs path box', { tags: ['critical'] }, () => {
  it('shows the labels joined by a slash, or the path it is given', () => {
    expect(pathTextOf(SEGMENTS.slice(0, 3), undefined)).toBe('project/art/sprites');
    expect(pathTextOf(SEGMENTS, 'C:/work/art')).toBe('C:/work/art');
  });
});

describe('K1 Breadcrumbs drop target', { tags: ['critical'] }, () => {
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
});
