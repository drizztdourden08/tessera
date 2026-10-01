/* @layer renderer-components @kind component */
import { Span } from '../../../primitives/text-elements';
import { asText } from '../behavior/as-text';
import type { PatternCounterProps } from './PatternAdornment.type';

const PatternCounter = (props: PatternCounterProps) => {
  const { field, name } = props;
  const slot = field.parsed.slots.find((known) => known.name === name && known.type === 'text');
  const max = slot?.length ?? slot?.maxLength;
  if (max === undefined) return null;
  const count = [...asText(field.value[name])].length;

  return (
    <Span
      tone={count >= max ? 'warning' : 'muted'}
      className="pattern-input__counter"
      aria-label={field.strings.counterLabel(count, max)}
    >
      {field.strings.counter(count, max)}
    </Span>
  );
};

export { PatternCounter };
