/* @layer renderer-components @kind component */
import { useRef } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import { Anchored } from '../../primitives/Anchored';
import { Text } from '../../primitives/Text';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { useBarFocus } from './behavior/useBarFocus';
import { useBarPlacement } from './behavior/useBarPlacement';
import { BAR_ESCAPE_KEY } from './AnchoredBar.constants';
import type { AnchoredBarProps } from './AnchoredBar.type';
import './AnchoredBar.css';

const AnchoredBar = (props: AnchoredBarProps) => {
  const {
    anchorRect, boundary, subscribe, inline = false, placement = 'bottom-center', margin = 'md', gap = 'sm', dock = 'none', follow = true,
    role = 'dialog', label, initialFocus, onEscape, error = false, dockedText, className, children,
  } = props;
  const { anchoredBar } = useTesseraStrings();
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const spot = useBarPlacement({ nodeRef, anchorRect, boundary, subscribe, inline, placement, dock, follow });
  useBarFocus(nodeRef, initialFocus, spot !== null && !spot.parked);
  const tokens = { '--bar-margin': `var(--space-${margin})`, '--bar-gap': `var(--space-${gap})` } as CSSProperties;

  const onKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
    if (event.key !== BAR_ESCAPE_KEY || !onEscape) return;
    event.stopPropagation();
    onEscape();
  };

  return (
    <Anchored
      ref={nodeRef}
      anchorRect={anchorRect}
      fallback={spot ? { left: spot.left, top: spot.top } : null}
      flip={false}
      portal={!inline}
      role={role}
      aria-label={label}
      aria-modal={role === 'dialog' || role === 'alertdialog' ? false : undefined}
      className={['anchored-bar', inline ? 'anchored-bar--inline' : '', className].filter(Boolean).join(' ')}
      style={tokens}
      data-measuring={spot === null || spot.parked || undefined}
      data-docked={spot?.docked || undefined}
      data-error={error || undefined}
      onKeyDown={onKeyDown}
    >
      {spot?.docked && <Text as="span" variant="caption" className="anchored-bar__docked">{dockedText ?? anchoredBar.docked}</Text>}
      {children}
    </Anchored>
  );
};

export { AnchoredBar };
