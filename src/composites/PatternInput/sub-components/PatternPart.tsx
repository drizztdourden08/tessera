/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Span } from '../../../primitives/text-elements';
import { echoText } from '../behavior/echo-text';
import { SLOT_KINDS } from '../behavior/slot-kinds.constants';
import { ChoiceSegment } from './ChoiceSegment';
import { PatternActionButton } from './PatternActionButton';
import { PatternIcon } from './PatternIcon';
import { TypedSegment } from './TypedSegment';
import type { PatternPartProps } from './PatternAdornment.type';

const PatternPart = (props: PatternPartProps) => {
  const { field, part } = props;
  switch (part.kind) {
    case 'literal':
      return <Span className="pattern-input__literal">{part.text}</Span>;
    case 'echo':
      return <Span className="pattern-input__literal">{echoText(part.name, part.field, field)}</Span>;
    case 'icon':
      return <PatternIcon field={field} name={part.name} />;
    case 'action':
      return <PatternActionButton field={field} name={part.name} />;
    case 'spacer':
      return <Box className="pattern-input__spacer" />;
    case 'slot': {
      const { slot, index } = part;
      if (slot.type === 'choice') return <ChoiceSegment field={field} slot={slot} index={index} />;
      return <TypedSegment field={field} slot={slot} index={index} kind={SLOT_KINDS[slot.type]} />;
    }
  }
};

export { PatternPart };
