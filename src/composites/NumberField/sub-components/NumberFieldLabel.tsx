/* @layer renderer-components @kind component */
import { Span } from '../../../primitives/text-elements';
import type { NumberFieldLabelProps } from '../NumberField.type';

const NumberFieldLabel = ({ text, scrub, rootRef }: NumberFieldLabelProps) => {
  if (text === undefined) return null;
  return (
    <Span
      className="number-field__label"
      data-scrub={scrub === undefined ? undefined : true}
      aria-hidden="true"
      {...scrub}
      onClick={() => rootRef.current?.querySelector('input')?.focus()}
    >
      {text}
    </Span>
  );
};

export { NumberFieldLabel };
