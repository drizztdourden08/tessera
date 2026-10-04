/* @layer renderer-components @kind logic */
import { SLIM_THUMB_HIT_PX } from '../ScrollArea.constants';
import type { ScrollAxis } from '../ScrollArea.type';
import { slimThumbInsets } from './slim-thumb-insets';
import { slimThumbs } from './slim-thumbs';
import type { ThumbHit, ThumbInsets, ThumbPlace, ThumbSpan } from './slim-thumb.type';

const place = (span: ThumbSpan, origin: number, viewport: number, insets: ThumbInsets): ThumbPlace => {
  const track = Math.max(0, viewport - 2 * insets.ends);
  const length = Math.min(track, Math.max(insets.min, span.fraction * track));
  const start = origin + insets.ends + span.progress * (track - length);
  return { start, end: start + length, ratio: span.range / Math.max(1, track - length) };
};

const within = (value: number, start: number, end: number): boolean => value >= start && value <= end;

const strip = (end: number, edge: number): [number, number] => [end - edge - SLIM_THUMB_HIT_PX, end];

const ratioAt = (place: ThumbPlace | null, along: number, cross: number, band: [number, number]): number | null => {
  if (!place || !within(cross, band[0], band[1]) || !within(along, place.start, place.end)) return null;
  return place.ratio;
};

const slimThumbHit = (node: HTMLElement, axis: ScrollAxis, x: number, y: number): ThumbHit | null => {
  const { y: spanY, x: spanX } = slimThumbs(node, axis);
  if (!spanY && !spanX) return null;
  const rect = node.getBoundingClientRect();
  const top = rect.top + node.clientTop;
  const left = rect.left + node.clientLeft;
  const insets = slimThumbInsets(node);
  const onY = spanY ? place(spanY, top, node.clientHeight, insets) : null;
  const ratioY = ratioAt(onY, y, x, strip(left + node.clientWidth, insets.edge));
  if (ratioY !== null) return { along: 'y', ratio: ratioY };
  const onX = spanX ? place(spanX, left, node.clientWidth, insets) : null;
  const ratioX = ratioAt(onX, x, y, strip(top + node.clientHeight, insets.edge));
  return ratioX === null ? null : { along: 'x', ratio: ratioX };
};

export { slimThumbHit };
