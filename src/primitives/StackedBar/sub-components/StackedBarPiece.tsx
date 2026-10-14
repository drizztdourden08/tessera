/* @layer renderer-components @kind component */
import { memo } from 'react';
import { Tooltip } from '../../Tooltip';
import { Span } from '../../text-elements';
import type { StackedBarPieceProps } from './StackedBarPiece.type';

const StackedBarPieceView = (props: StackedBarPieceProps) => {
  const { color, tip, description } = props;
  const content = description ? <><Span className="stacked-bar__tip">{tip}</Span><Span className="stacked-bar__about">{description}</Span></> : tip;
  return (
    <Tooltip content={content} className="stacked-bar__segment">
      <Span className="stacked-bar__fill" data-color={color} />
    </Tooltip>
  );
};

const StackedBarPiece = memo(StackedBarPieceView);

export { StackedBarPiece };
