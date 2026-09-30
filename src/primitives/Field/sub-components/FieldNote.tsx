/* @layer renderer-components @kind component */
import { Span } from '../../text-elements';
import type { FieldNoteProps } from './FieldNote.type';

const FieldNote = (props: FieldNoteProps) => {
  const { id, hint, error } = props;
  if (error != null) return <Span id={id} tone="danger" className="field__error" role="alert">{error}</Span>;
  if (hint != null) return <Span id={id} tone="muted" className="field__hint">{hint}</Span>;
  return null;
};

export { FieldNote };
