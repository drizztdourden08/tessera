/* @layer renderer-components @kind logic */
import { scrollTopForSpan } from './scroll-top-for-span';
import type { ShowInput } from './virtual.type';

const scrollTopToShow = (input: ShowInput): number => {
  const { index, rowHeight, viewport, scrollTop } = input;
  return scrollTopForSpan({ top: index * rowHeight, height: rowHeight, viewport, scrollTop }, 'nearest');
};

export { scrollTopToShow };
