/* @layer renderer-components @kind component */
import { SLOT_KINDS } from '../behavior/slot-kinds.constants';
import { ChoiceSegment } from './ChoiceSegment';
import { SearchChoiceSegment } from './SearchChoiceSegment';
import { TypedSegment } from './TypedSegment';
import type { SegmentProps } from './TypedSegment.type';

const PatternSlot = (props: SegmentProps) => {
  const { field, slot, index } = props;
  if (slot.type !== 'choice') return <TypedSegment field={field} slot={slot} index={index} kind={SLOT_KINDS[slot.type]} />;
  if (slot.search === true) return <SearchChoiceSegment field={field} slot={slot} index={index} />;
  return <ChoiceSegment field={field} slot={slot} index={index} />;
};

export { PatternSlot };
