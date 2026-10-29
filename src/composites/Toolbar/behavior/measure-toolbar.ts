/* @layer renderer-components @kind util */
import { measureActions } from '../../ActionBar/behavior/measure-actions';
import type { FitShape, ToolbarFit } from './fit-columns.type';
import { measureColumns } from './measure-columns';

const measureToolbar = (bar: HTMLElement, measure: HTMLElement, restCount: number, shape: FitShape): ToolbarFit => {
  const { vertical, columns } = shape;
  const single = measureActions(bar, measure, restCount, vertical ? 'height' : 'width');
  if (!vertical || columns === 1 || (columns === 'auto' && single >= restCount)) return { fit: single, wrapped: false };
  return { fit: measureColumns(bar, measure, restCount), wrapped: true };
};

export { measureToolbar };
