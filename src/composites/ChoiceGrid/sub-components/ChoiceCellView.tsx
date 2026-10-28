/* @layer renderer-components @kind component */
import { Pressable } from '../../../primitives/Pressable';
import type { ChoiceCellViewProps } from './ChoiceCellView.type';

const ChoiceCellView = <T extends string>({ cell, state, renderCell }: ChoiceCellViewProps<T>) => {
  if (renderCell) return <>{renderCell(cell, state)}</>;
  return (
    <Pressable className="choice-grid__cell" {...state.props}>
      {cell.content ?? cell.label}
    </Pressable>
  );
};

export { ChoiceCellView };
