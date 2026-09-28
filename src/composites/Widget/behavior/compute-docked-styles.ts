/* @layer renderer-components @kind logic */
import type { CSSProperties } from 'react';
import type { WidgetBounds, WidgetState, SnapSide } from '../Widget.type';
import { TITLEBAR_HEIGHT } from '../Widget.constants';
import type { DockedLayoutResult, DockedSides, DockFrame, ExclusiveInsets, StyleEntry } from './compute-docked-styles.type';

const groupBySide = (widgets: WidgetState[]): DockedSides => {
  const sides: DockedSides = { left: [], right: [], top: [], bottom: [] };
  for (const w of widgets) {
    if (w.mode === 'docked') {
      sides[w.side].push(w);
    }
  }
  for (const side of Object.keys(sides) as SnapSide[]) {
    sides[side].sort((a, b) => a.order - b.order);
  }
  return sides;
};

const maxDockedSize = (group: WidgetState[]): number =>
  group.length > 0 ? Math.max(...group.map((w) => w.dockedSize)) : 0;

const insetOf = (group: WidgetState[], size: number): number => (group.some((w) => w.exclusive) ? size : 0);

const verticalStyles = (group: WidgetState[], side: 'left' | 'right', frame: DockFrame): StyleEntry[] => {
  const { position, fullHeight, topOffset, sizes } = frame;
  const uniformWidth = maxDockedSize(group);
  const availableHeight = `calc(${fullHeight} - ${topOffset}px - ${sizes.top}px - ${sizes.bottom}px)`;
  const offsetExpr = `${topOffset + sizes.top}px`;
  const heightExpr = `calc(${availableHeight} / ${group.length})`;
  return group.map((w, i) => [w.id, {
    position,
    [side]: 0,
    top: i === 0 ? offsetExpr : `calc(${offsetExpr} + ${i} * ${availableHeight} / ${group.length})`,
    width: uniformWidth,
    height: heightExpr,
  }]);
};

const horizontalStyles = (group: WidgetState[], side: 'top' | 'bottom', frame: DockFrame): StyleEntry[] => {
  const { position, fullWidth, topOffset, sizes } = frame;
  const uniformHeight = maxDockedSize(group);
  const availableWidth = `calc(${fullWidth} - ${sizes.left}px - ${sizes.right}px)`;
  const leftOffset = `${sizes.left}px`;
  const widthExpr = `calc(${availableWidth} / ${group.length})`;
  return group.map((w, i) => [w.id, {
    position,
    left: i === 0 ? leftOffset : `calc(${leftOffset} + ${i} * ${availableWidth} / ${group.length})`,
    [side]: side === 'top' ? topOffset : 0,
    width: widthExpr,
    height: uniformHeight,
  }]);
};

const computeDockedStyles = (
  widgets: WidgetState[],
  topOffset = TITLEBAR_HEIGHT,
  bounds: WidgetBounds = 'viewport',
): DockedLayoutResult => {
  const contained = bounds === 'container';
  const sides = groupBySide(widgets);
  const sizes: ExclusiveInsets = {
    left: maxDockedSize(sides.left),
    right: maxDockedSize(sides.right),
    top: maxDockedSize(sides.top),
    bottom: maxDockedSize(sides.bottom),
  };
  const frame: DockFrame = {
    position: contained ? 'absolute' : 'fixed',
    fullHeight: contained ? '100%' : '100vh',
    fullWidth: contained ? '100%' : '100vw',
    topOffset,
    sizes,
  };

  const exclusiveInsets: ExclusiveInsets = {
    left: insetOf(sides.left, sizes.left),
    right: insetOf(sides.right, sizes.right),
    top: insetOf(sides.top, sizes.top),
    bottom: insetOf(sides.bottom, sizes.bottom),
  };

  const styles = new Map<string, CSSProperties>([
    ...verticalStyles(sides.left, 'left', frame),
    ...verticalStyles(sides.right, 'right', frame),
    ...horizontalStyles(sides.top, 'top', frame),
    ...horizontalStyles(sides.bottom, 'bottom', frame),
  ]);

  return { styles, exclusiveInsets };
};

export { computeDockedStyles };
