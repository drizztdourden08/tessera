/* @layer stories @kind logic */
import type { DemonstratorLayout, DemonstratorNeed } from './Demonstrator.type';

const fromGrid = (width: number, room: number, need: DemonstratorNeed): DemonstratorLayout => {
  if (width <= room) return 'grid';
  need.grid = width;
  return need.stacked > room ? 'scroll' : 'stacked';
};

const fromStacked = (width: number, room: number, need: DemonstratorNeed): DemonstratorLayout => {
  if (width > room) {
    need.stacked = width;
    return 'scroll';
  }
  return room >= need.grid ? 'grid' : 'stacked';
};

const fromScroll = (room: number, need: DemonstratorNeed): DemonstratorLayout => {
  if (room >= need.grid) return 'grid';
  return room >= need.stacked ? 'stacked' : 'scroll';
};

const nextLayout = (layout: DemonstratorLayout, width: number, room: number, need: DemonstratorNeed): DemonstratorLayout => {
  if (layout === 'grid') return fromGrid(width, room, need);
  if (layout === 'stacked') return fromStacked(width, room, need);
  return fromScroll(room, need);
};

export { nextLayout };
