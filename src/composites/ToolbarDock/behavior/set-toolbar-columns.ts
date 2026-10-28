/* @layer renderer-components @kind logic */
import type { ToolbarColumns } from '../../Toolbar/Toolbar.type';
import type { ToolbarLayout } from '../ToolbarDock.type';

const setToolbarColumns = (layout: ToolbarLayout, id: string, columns: ToolbarColumns | undefined): ToolbarLayout => {
  if (layout.columns?.[id] === columns) return layout;
  const next = Object.fromEntries(Object.entries(layout.columns ?? {}).filter(([key]) => key !== id));
  if (columns !== undefined) next[id] = columns;
  const { columns: _previous, ...others } = layout;
  return Object.keys(next).length > 0 ? { ...others, columns: next } : others;
};

export { setToolbarColumns };
