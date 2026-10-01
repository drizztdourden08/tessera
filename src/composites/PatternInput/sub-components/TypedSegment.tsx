/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { TextInput } from '../../../primitives/TextInput';
import { panelOf } from '../behavior/panel-of';
import { segmentClass } from '../behavior/segment-class';
import { slotLabel } from '../behavior/slot-label';
import { slotPlaceholder } from '../behavior/slot-placeholder';
import { useTypedSegment } from '../behavior/useTypedSegment';
import { DecimalShade } from './DecimalShade';
import { HexSwatch } from './HexSwatch';
import { SlotPopover } from './SlotPopover';
import { TypedPanel } from './TypedPanel';
import type { TypedSegmentProps } from './TypedSegment.type';

const TypedSegment = (props: TypedSegmentProps) => {
  const { field, slot, index, kind } = props;
  const anchorRef = useRef<HTMLElement>(null);
  const typed = useTypedSegment({ field, slot, index, kind });
  const panel = panelOf(slot);
  const open = field.focus.index === index && field.focus.open && panel !== 'none';
  const shaded = slot.type === 'decimal' && typed.draft === null;
  const text = typed.draft ?? kind.show(field.value[slot.name], slot);

  return (
    <Box ref={anchorRef} className={segmentClass(slot, shaded)} data-pattern-slot={index}>
      {slot.type === 'hex' && <HexSwatch field={field} slot={slot} index={index} />}
      <TextInput
        ref={typed.attach}
        id={index === 0 ? field.firstId : undefined}
        className="pattern-input__slot"
        size={field.size}
        value={text}
        placeholder={slotPlaceholder(slot, field)}
        inputMode={kind.inputMode}
        autoComplete="off"
        spellCheck={false}
        aria-label={slotLabel(slot, field)}
        aria-describedby={field.describedBy}
        invalid={field.invalid}
        disabled={field.disabled}
        onFocus={typed.handleFocus}
        onBlur={typed.handleBlur}
        onChange={typed.handleChange}
        onKeyDown={typed.handleKeyDown}
        onMouseDown={typed.handleMouseDown}
        onMouseUp={typed.handleMouseUp}
      />
      {shaded && <DecimalShade text={text} />}
      {open && (
        <SlotPopover field={field} anchorRef={anchorRef} variant={panel === 'color' ? 'color' : 'panel'}>
          <TypedPanel field={field} slot={slot} panel={panel} />
        </SlotPopover>
      )}
    </Box>
  );
};

export { TypedSegment };
