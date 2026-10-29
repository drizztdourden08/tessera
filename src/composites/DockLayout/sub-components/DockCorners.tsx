/* @layer renderer-components @kind component */
import { Span } from '../../../primitives/text-elements';
import { DockCornerHandle } from './DockCornerHandle';
import type { DockCornersProps } from './DockCorners.type';
import '../../../theme/visually-hidden.css';

const DockCorners = (props: DockCornersProps) => {
  const { corners, hidden } = props;
  const { handles, message, hint, labelFor, turn } = corners;
  return (
    <>
      {!hidden && handles.map((handle) => (
        <DockCornerHandle
          key={`${handle.key}-${handle.along}-${handle.end}`}
          handle={handle}
          label={labelFor(handle)}
          hint={hint}
          onTurn={turn}
        />
      ))}
      <Span className="visually-hidden" role="status" aria-live="polite">{message}</Span>
    </>
  );
};

export { DockCorners };
