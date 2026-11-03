/* @layer renderer-components @kind logic */
import { clampNumber } from '../../../primitives/value-rule/clamp-number';
import type { AnchoredRect } from '../../../primitives/Anchored';
import type { BarPositionInput, BarSpot } from './bar-position.type';

const overlaps = (a: AnchoredRect, b: AnchoredRect): boolean =>
  a.left < b.left + b.width && a.left + a.width > b.left && a.top < b.top + b.height && a.top + a.height > b.top;

const clampedSpot = (input: BarPositionInput, left: number, top: number): { left: number; top: number } => {
  const { bounds, size, margin } = input;
  const minLeft = bounds.left + margin;
  const minTop = bounds.top + margin;
  return {
    left: clampNumber(left, minLeft, Math.max(minLeft, bounds.left + bounds.width - margin - size.width)),
    top: clampNumber(top, minTop, Math.max(minTop, bounds.top + bounds.height - margin - size.height)),
  };
};

const dockedSpot = (input: BarPositionInput): BarSpot => {
  const { bounds, size, margin, dock } = input;
  const left = bounds.left + (bounds.width - size.width) / 2;
  const top = dock === 'top-center' ? bounds.top + margin : bounds.top + bounds.height - margin - size.height;
  return { ...clampedSpot(input, left, top), docked: true, parked: false };
};

const barPosition = (input: BarPositionInput): BarSpot => {
  const { anchor, bounds, size, gap, placement, dock } = input;
  const away = anchor === null || !overlaps(anchor, bounds);
  if (away && dock !== 'none') return dockedSpot(input);
  if (anchor === null) return { left: bounds.left, top: bounds.top, docked: false, parked: true };
  const left = anchor.left + (anchor.width - size.width) / 2;
  const top = placement === 'bottom-center' ? anchor.top + anchor.height + gap : anchor.top - gap - size.height;
  return { ...clampedSpot(input, left, top), docked: false, parked: false };
};

export { barPosition };
