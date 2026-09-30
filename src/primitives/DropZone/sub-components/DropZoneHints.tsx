/* @layer renderer-components @kind component */
import { Span } from '../../text-elements';
import type { DropZoneHintsProps } from './DropZoneHints.type';

const DropZoneHints = (props: DropZoneHintsProps) => {
  const { hint } = props;
  return (
    <>
      {hint && <Span tone="muted" className="dropzone__hint">{hint}</Span>}
      <Span tone="muted" className="dropzone__hint dropzone__hint--browse">or click to browse files</Span>
    </>
  );
};

export { DropZoneHints };
