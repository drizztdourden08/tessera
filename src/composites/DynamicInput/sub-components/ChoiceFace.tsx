/* @layer renderer-components @kind component */
import { EmojiIcon } from '../../../primitives/EmojiIcon';
import { Span } from '../../../primitives/text-elements';
import { choiceText } from '../behavior/choice-text';
import { flagGlyph } from '../behavior/flag-glyph';
import { slotPlaceholder } from '../behavior/slot-placeholder';
import type { ChoiceFaceProps } from './ChoiceFace.type';

const ChoiceFace = (props: ChoiceFaceProps) => {
  const { field, slot, choice } = props;
  if (choice === undefined) return <Span className="dynamic-input__placeholder">{slotPlaceholder(slot, field)}</Span>;
  const glyph = flagGlyph(choice.flag);
  const flagOnly = slot.flag === true && glyph !== '';

  return (
    <>
      {glyph !== '' && <EmojiIcon glyph={glyph} size="sm" className="dynamic-input__flag" />}
      {!flagOnly && <Span className="dynamic-input__choice-text">{choiceText(choice)}</Span>}
    </>
  );
};

export { ChoiceFace };
