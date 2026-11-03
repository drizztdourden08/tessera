/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { Pressable } from '../../../primitives/Pressable';
import { segmentClass } from '../behavior/segment-class';
import { slotLabel } from '../behavior/slot-label';
import { useChoiceSegment } from '../behavior/useChoiceSegment';
import { ADORNMENT_ICON_SIZES } from '../../../primitives/field-control/input-adornment.constants';
import { ChoiceFace } from './ChoiceFace';
import { ChoiceListPopover } from './ChoiceListPopover';
import type { SegmentProps } from './TypedSegment.type';

const ChoiceSegment = (props: SegmentProps) => {
  const { field, slot, index } = props;
  const choice = useChoiceSegment({ field, slot, index });
  const label = slotLabel(slot, field);
  const { model, open } = choice;
  const active = open && model.active.index >= 0 ? model.optionId(model.active.index) : undefined;

  return (
    <Box className={segmentClass(slot, false)} data-pattern-slot={index}>
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
        onPaste={choice.handlePaste}
        onMouseDown={choice.handleMouseDown}
        onClick={choice.handleClick}
      >
        <ChoiceFace field={field} slot={slot} choice={choice.selected} />
        <Icon name="chevron-down" size={ADORNMENT_ICON_SIZES[field.size]} className="dynamic-input__caret" />
      </Pressable>
      {open && <ChoiceListPopover field={field} anchorRef={choice.anchorRef} label={label} view={choice.view} />}
    </Box>
  );
};

export { ChoiceSegment };
