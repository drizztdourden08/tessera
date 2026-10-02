/* @layer renderer-components @kind component */
import { Span } from '../../../primitives/text-elements';
import { DOT } from '../behavior/slot-format.constants';
import type { DecimalShadeProps } from './TypedSegment.type';

const DecimalShade = (props: DecimalShadeProps) => {
  const { text } = props;
  const dot = text.indexOf(DOT);
  const whole = dot === -1 ? text : text.slice(0, dot);
  const fraction = dot === -1 ? '' : text.slice(dot);

  return (
    <Span className="dynamic-input__shade" aria-hidden="true">
      {whole}
      {fraction !== '' && <Span tone="muted">{fraction}</Span>}
    </Span>
  );
};

export { DecimalShade };
