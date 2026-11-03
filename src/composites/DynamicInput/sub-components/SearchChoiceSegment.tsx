/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { TextInput } from '../../../primitives/TextInput';
import { segmentClass } from '../behavior/segment-class';
import { slotLabel } from '../behavior/slot-label';
import { slotPlaceholder } from '../behavior/slot-placeholder';
import { useSearchChoice } from '../behavior/useSearchChoice';
import { ADORNMENT_ICON_SIZES } from '../../../primitives/field-control/input-adornment.constants';
import { ChoiceListPopover } from './ChoiceListPopover';
import type { SegmentProps } from './TypedSegment.type';

const SearchChoiceSegment = (props: SegmentProps) => {
  const { field, slot, index } = props;
  const anchorRef = useRef<HTMLElement>(null);
  const search = useSearchChoice({ field, slot, index });
  const label = slotLabel(slot, field);
  const { model, open } = search;
  const active = open && model.active.index >= 0 ? model.optionId(model.active.index) : undefined;

  return (
    <Box ref={anchorRef} className={segmentClass(slot, false)} data-pattern-slot={index}>
      <TextInput
        ref={search.attach}
        id={index === 0 ? field.firstId : undefined}
        className="dynamic-input__slot"
        size={field.size}
        value={search.text}
        placeholder={slotPlaceholder(slot, field)}
        autoComplete="off"
        spellCheck={false}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={open ? model.listId : undefined}
        aria-activedescendant={active}
        aria-label={label}
        aria-describedby={field.describedBy}
        invalid={field.invalid}
        disabled={field.disabled}
        onFocus={search.handleFocus}
        onBlur={search.handleBlur}
        onChange={search.handleChange}
        onKeyDown={search.handleKeyDown}
        onPaste={search.handlePaste}
        onMouseDown={search.handleMouseDown}
      />
      <Icon name="chevron-down" size={ADORNMENT_ICON_SIZES[field.size]} className="dynamic-input__caret" />
      {open && <ChoiceListPopover field={field} anchorRef={anchorRef} label={label} view={search.view} />}
    </Box>
  );
};

export { SearchChoiceSegment };
