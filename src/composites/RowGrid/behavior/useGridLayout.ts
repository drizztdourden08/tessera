/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { MAX_PROPERTY, TRACKS_PROPERTY } from '../RowGrid.constants';
import type { GridShape, RowGridLayout } from '../RowGrid.type';

const sizeScale = (element: HTMLElement): number =>
  Number.parseFloat(ownerWindowOf(element).getComputedStyle(element).getPropertyValue('--size-1')) || 1;

const layoutFor = (width: number, shape: GridShape, scale: number): RowGridLayout => {
  if (width >= shape.table * scale) return 'table';
  return shape.fold !== null && width >= shape.fold * scale ? 'fold' : 'cards';
};

const useGridLayout = (ref: RefObject<HTMLElement | null>, shape: GridShape): RowGridLayout => {
  const [layout, setLayout] = useState<RowGridLayout>('table');
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const view = ownerWindowOf(element) as Window & typeof globalThis;
    const check = (): void => setLayout(layoutFor(element.getBoundingClientRect().width, shape, sizeScale(element)));
    check();
    const observer = new view.ResizeObserver(check);
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, shape]);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.style.setProperty(TRACKS_PROPERTY, shape.tracks(layout));
    if (shape.max === null || layout === 'cards') element.style.removeProperty(MAX_PROPERTY);
    else element.style.setProperty(MAX_PROPERTY, `calc(${shape.max} * var(--size-1))`);
  }, [ref, shape, layout]);
  return layout;
};

export { useGridLayout };
