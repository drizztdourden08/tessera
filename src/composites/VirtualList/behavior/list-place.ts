/* @layer renderer-components @kind logic */
import { INDEX_PROPERTY, SIZE_PROPERTY, START_PROPERTY } from '../VirtualList.constants';
import type { CSSProperties } from 'react';
import type { ItemLayout } from './item-layout.type';

const listPlace = (layout: ItemLayout, index: number, variable: boolean): CSSProperties =>
  (variable
    ? { [START_PROPERTY]: `${layout.startOf(index)}px`, [SIZE_PROPERTY]: `${layout.sizeOf(index)}px` }
    : { [INDEX_PROPERTY]: index }) as CSSProperties;

export { listPlace };
