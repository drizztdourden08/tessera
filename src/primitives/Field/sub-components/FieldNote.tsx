/* @layer renderer-components @kind component */
import type { FieldNoteProps } from './FieldNote.type';

const FieldNote = (props: FieldNoteProps) => {
  const { id, hint, error } = props;
  if (error != null) return <span id={id} className="field__error" role="alert">{error}</span>;
  if (hint != null) return <span id={id} className="field__hint">{hint}</span>;
  return null;
};

export { FieldNote };
