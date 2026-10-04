/* @layer renderer-components @kind component */
import { memo } from 'react';
import { Tooltip } from '../../../primitives/Tooltip';
import { Span } from '../../../primitives/text-elements';
import type { StackedBarPieceProps } from './StackedBarPiece.type';

const StackedBarPieceView = (props: StackedBarPieceProps) => {
  const { color, tip } = props;
  return (
    <Tooltip content={tip} className="stacked-bar__segment">
      <Span className="stacked-bar__fill" data-color={color} />
    </Tooltip>
  );
};

const StackedBarPiece = memo(StackedBarPieceView);

export { StackedBarPiece };
