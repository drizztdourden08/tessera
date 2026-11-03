/* @layer renderer-components @kind util */
import { gridTemplate } from './grid-template';
import type { ListboxColumn } from './listbox.type';
import type { GridStyle } from './listbox-view.type';

const listStyle = <T>(columns: readonly ListboxColumn<T>[], rowSize: number | undefined): GridStyle => {
  const style: GridStyle = { '--listbox-columns': gridTemplate(columns, true) };
  if (rowSize !== undefined) style['--listbox-row-size'] = `${rowSize}px`;
  return style;
};

export { listStyle };
