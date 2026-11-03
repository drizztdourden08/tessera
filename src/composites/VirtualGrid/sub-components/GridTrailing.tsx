/* @layer renderer-components @kind component */
import { GridCell } from './GridCell';
import type { GridTrailingProps } from './GridTrailing.type';

const GridTrailing = (props: GridTrailingProps) => {
  const { trailing, bind } = props;
  return typeof trailing === 'function' ? trailing(bind) : <GridCell bind={bind}>{trailing}</GridCell>;
};

export { GridTrailing };
