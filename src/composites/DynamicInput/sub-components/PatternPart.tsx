/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Span } from '../../../primitives/text-elements';
import { echoText } from '../behavior/echo-text';
import { PatternActionButton } from './PatternActionButton';
import { PatternIcon } from './PatternIcon';
import { PatternSlot } from './PatternSlot';
import type { PatternPartProps } from './PatternAdornment.type';

const PatternPart = (props: PatternPartProps) => {
  const { field, part } = props;
  switch (part.kind) {
    case 'literal':
      return <Span className="dynamic-input__literal">{part.text}</Span>;
    case 'echo':
      return <Span className="dynamic-input__literal">{echoText(part.name, part.field, field)}</Span>;
    case 'icon':
      return <PatternIcon field={field} name={part.name} />;
    case 'action':
      return <PatternActionButton field={field} name={part.name} />;
    case 'spacer':
      return <Box className="dynamic-input__spacer" />;
    case 'slot':
      return <PatternSlot field={field} slot={part.slot} index={part.index} />;
  }
};

export { PatternPart };
