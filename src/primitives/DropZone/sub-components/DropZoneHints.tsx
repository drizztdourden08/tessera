/* @layer renderer-components @kind component */
import { Span } from '../../text-elements';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import type { DropZoneHintsProps } from './DropZoneHints.type';

const DropZoneHints = (props: DropZoneHintsProps) => {
  const { hint, status } = props;
  const { fields } = useTesseraStrings();
  return (
    <>
      {hint && <Span tone="muted" className="dropzone__hint">{hint}</Span>}
      <Span tone="muted" className="dropzone__hint dropzone__hint--browse">{fields.browseFiles}</Span>
      {status && <Span role="status" className={`dropzone__status dropzone__status--${status.tone}`}>{status.message}</Span>}
    </>
  );
};

export { DropZoneHints };
