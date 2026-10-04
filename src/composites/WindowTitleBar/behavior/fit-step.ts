/* @layer renderer-components @kind logic */
import { BRAND_CLEARANCE_PX, MARK_CLEARANCE_PX } from '../WindowTitleBar.constants';
import type { BrandFit } from '../WindowTitleBar.type';
import type { BarSizes, BarSide } from './fit-step.type';

const sideWidth = (sizes: BarSizes, side: BarSide, hidden: ReadonlySet<number>): number => {
  const gap = side === 'start' ? sizes.startGap : sizes.endGap;
  return sizes.items.reduce((total, item, index) => {
    const shown = !hidden.has(index);
    if (item.side !== side || shown === item.shown || item.width === 0) return total;
    return total + (shown ? 1 : -1) * (item.width + gap);
  }, side === 'start' ? sizes.startEnd : sizes.endWidth);
};

const indexesOf = (sizes: BarSizes, side?: BarSide): number[] =>
  sizes.items.flatMap((item, index) => (side === undefined || item.side === side ? [index] : []));

const hideFor = (sizes: BarSizes, side: BarSide, room: number): number[] | null => {
  const order = indexesOf(sizes, side);
  for (let count = 0; count <= order.length; count += 1) {
    if (sideWidth(sizes, side, new Set(order.slice(0, count))) <= room) return order.slice(0, count);
  }
  return null;
};

const hideForEnds = (sizes: BarSizes): number[] => {
  const order = indexesOf(sizes);
  for (let count = 0; count < order.length; count += 1) {
    const hidden = new Set(order.slice(0, count));
    if (sideWidth(sizes, 'start', hidden) + sideWidth(sizes, 'end', hidden) + BRAND_CLEARANCE_PX <= sizes.width) return order.slice(0, count);
  }
  return order;
};

const roomFor = (sizes: BarSizes, brand: number, clearance = BRAND_CLEARANCE_PX): number => sizes.width / 2 - brand / 2 - clearance;

const fitStep = (sizes: BarSizes): { hidden: number[]; brand: BrandFit } => {
  if (sizes.brand === 0) return { hidden: hideForEnds(sizes), brand: 'full' };
  const room = roomFor(sizes, sizes.brand);
  const start = hideFor(sizes, 'start', room);
  const end = hideFor(sizes, 'end', room);
  if (start && end) return { hidden: [...start, ...end].sort((a, b) => a - b), brand: 'full' };
  const all = indexesOf(sizes);
  const hidden = new Set(all);
  const widest = Math.max(sideWidth(sizes, 'start', hidden), sideWidth(sizes, 'end', hidden));
  const fits = (width: number) => width > 0 && widest <= roomFor(sizes, width, MARK_CLEARANCE_PX);
  if (fits(sizes.logo)) return { hidden: all, brand: 'logo' };
  return { hidden: all, brand: fits(sizes.small) ? 'small' : 'none' };
};

export { fitStep };
