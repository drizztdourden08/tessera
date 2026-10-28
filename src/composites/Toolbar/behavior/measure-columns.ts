/* @layer renderer-components @kind util */
import { cssZoomOf } from '../../../primitives/dom/css-zoom-of';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { FIT_SLACK } from '../../ActionBar/ActionBar.constants';
import { SEPARATOR_CLASS, WRAPPED_COLUMNS } from '../Toolbar.constants';
import { fitColumns } from './fit-columns';

const measureColumns = (bar: HTMLElement, measure: HTMLElement, restCount: number): number => {
  const zoom = cssZoomOf(measure);
  const cells = [...measure.children].map((child) => ({
    size: child.getBoundingClientRect().height / zoom,
    span: child.classList.contains(SEPARATOR_CLASS),
  }));
  const gap = Number.parseFloat(ownerWindowOf(measure).getComputedStyle(measure).columnGap) || 0;
  const primary = cells.slice(restCount + 1).reduce((sum, cell) => sum + cell.size + gap, 0);
  const room = bar.getBoundingClientRect().height / zoom + FIT_SLACK;
  return fitColumns(cells.slice(0, restCount), cells[restCount]?.size ?? 0, { gap, room: room - primary, columns: WRAPPED_COLUMNS });
};

export { measureColumns };
