/* @layer renderer-components @kind component */
import { useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { Anchored } from '../../../primitives/Anchored';
import { useAnchorTracking } from '../../../primitives/Portal';
import { Span } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { findOperator } from '../../../data/filter/operators';
import { resolveFieldKit } from '../../field-kits';
import type { ValuePopoverProps } from './ValuePopover.type';

const ValuePopover = (props: ValuePopoverProps) => {
  const { field, clause, anchorRef, onChange, onClose } = props;
  const { filterOperators } = useTesseraStrings();
  const Control = resolveFieldKit(field.kind)?.FilterControl;
  const icon = findOperator(field.kind, clause.op)?.icon;
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.querySelector<HTMLElement>('input, button, [tabindex]')?.focus();
  }, []);

  const { position } = useAnchorTracking({
    active: true,
    anchorRef,
    compute: (rect) => ({ top: rect.bottom, left: rect.left }),
    onOutOfView: onClose,
  });

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key !== 'Enter' && event.key !== 'Escape') return;
    event.preventDefault();
    onClose();
    anchorRef.current?.focus();
  };

  return (
    <Anchored
      ref={panelRef}
      anchorRef={anchorRef}
      layer="overlay"
      fallback={position}
      className="filter-chip__editor"
      role="dialog"
      aria-label={field.label}
      onKeyDown={handleKeyDown}
    >
      <Span tone="muted" className="filter-chip__editor-title">
        {icon ? `${field.label} ${filterOperators[icon]}` : field.label}
      </Span>
      {Control && <Control field={field} op={clause.op} value={clause.value} onChange={onChange} />}
    </Anchored>
  );
};

export { ValuePopover };
