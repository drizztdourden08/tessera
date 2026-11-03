/* @layer renderer-components @kind component */
import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { Anchored } from '../../primitives/Anchored';
import { Text } from '../../primitives/Text';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { barAriaModal } from './behavior/bar-aria-modal';
import { barClassName } from './behavior/bar-class-name';
import { barEscapeHandler } from './behavior/bar-escape-handler';
import { barSpotAttrs } from './behavior/bar-spot-attrs';
import { resolveBarProps } from './behavior/resolve-bar-props';
import { useBarFocus } from './behavior/useBarFocus';
import { useBarPlacement } from './behavior/useBarPlacement';
import type { AnchoredBarProps } from './AnchoredBar.type';
import './AnchoredBar.css';

const AnchoredBar = (props: AnchoredBarProps) => {
  const { anchorRect, boundary, subscribe, inline, placement, margin, gap, dock, follow, role, label, initialFocus, onEscape, error, dockedText, className, children } = resolveBarProps(props);
  const { anchoredBar } = useTesseraStrings();
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const spot = useBarPlacement({ nodeRef, anchorRect, boundary, subscribe, inline, placement, dock, follow });
  const attrs = barSpotAttrs(spot);
  useBarFocus(nodeRef, initialFocus, attrs.ready);
  const tokens = { '--bar-margin': `var(--space-${margin})`, '--bar-gap': `var(--space-${gap})` } as CSSProperties;

  return (
    <Anchored
      ref={nodeRef}
      anchorRect={anchorRect}
      fallback={attrs.fallback}
      flip={false}
      portal={!inline}
      role={role}
      aria-label={label}
      aria-modal={barAriaModal(role)}
      className={barClassName(inline, className)}
      style={tokens}
      data-measuring={attrs.measuring}
      data-docked={attrs.docked}
      data-error={error || undefined}
      onKeyDown={barEscapeHandler(onEscape)}
    >
      {attrs.docked && <Text as="span" variant="caption" className="anchored-bar__docked">{dockedText ?? anchoredBar.docked}</Text>}
      {children}
    </Anchored>
  );
};

export { AnchoredBar };
