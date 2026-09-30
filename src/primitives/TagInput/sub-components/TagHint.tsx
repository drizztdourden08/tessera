/* @layer renderer-components @kind component */
import { Span } from '../../text-elements';
import type { TagHintProps } from './TagHint.type';

const TagHint = (props: TagHintProps) => {
  const { advice, createError, blocked } = props;
  const message = advice.message ?? createError;
  if (message == null) return null;
  const danger = blocked || (advice.message == null && createError != null);
  return (
    <Span className="tag-input__hint" data-blocked={danger || undefined}>
      {message}
    </Span>
  );
};

export { TagHint };
