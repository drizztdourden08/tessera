/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { ListboxList } from '../../../primitives/listbox/ListboxList';
import { Pressable } from '../../../primitives/Pressable';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { segmentClass } from '../behavior/segment-class';
import { slotLabel } from '../behavior/slot-label';
import { useChoiceSegment } from '../behavior/useChoiceSegment';
import { ADORNMENT_ICON_SIZES } from '../../../primitives/field-control/input-adornment.constants';
import { ChoiceFace } from './ChoiceFace';
import { SlotPopover } from './SlotPopover';
import type { SegmentProps } from './TypedSegment.type';
import '../../../theme/listbox.css';
import '../../../theme/listbox-drop.css';

const ChoiceSegment = (props: SegmentProps) => {
  const { field, slot, index } = props;
  const anchorRef = useRef<HTMLElement>(null);
  const choice = useChoiceSegment({ field, slot, index });
  const { fields } = useTesseraStrings();
  const label = slotLabel(slot, field);
  const { model, open } = choice;
  const active = open && model.active.index >= 0 ? model.optionId(model.active.index) : undefined;

  return (
    <Box ref={anchorRef} className={segmentClass(slot, false)} data-pattern-slot={index}>
      <Pressable
        ref={choice.attach}
        id={index === 0 ? field.firstId : undefined}
        className="dynamic-input__choice"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? model.listId : undefined}
        aria-activedescendant={active}
        aria-label={label}
        aria-describedby={field.describedBy}
        aria-invalid={field.invalid || undefined}
        disabled={field.disabled}
        onKeyDown={choice.handleKeyDown}
        onMouseDown={choice.handleMouseDown}
        onClick={choice.handleClick}
      >
        <ChoiceFace field={field} slot={slot} choice={choice.selected} />
        <Icon name="chevron-down" size={ADORNMENT_ICON_SIZES[field.size]} className="dynamic-input__caret" />
      </Pressable>
      {open && (
        <SlotPopover field={field} anchorRef={anchorRef} variant="list">
          <ListboxList view={choice.view} loading={false} emptyText={fields.noOptions} label={label} />
        </SlotPopover>
      )}
    </Box>
  );
};

export { ChoiceSegment };
