/* @layer renderer-components @kind component */
import { useCallback, useId, useRef } from 'react';
import { setNodeOnRef } from '../ScrollArea/behavior/set-node-on-ref';
import { anchorIdent } from './behavior/anchor-ident';
import { useAnchoredDismiss } from './behavior/useAnchoredDismiss';
import { useAnchorName } from './behavior/useAnchorName';
import { useAnchorSupport } from './behavior/useAnchorSupport';
import { useShownPopover } from './behavior/useShownPopover';
import { AnchoredPlaced } from './sub-components/AnchoredPlaced';
import type { AnchoredProps, AnchoredStyle } from './Anchored.type';
import './Anchored.css';

const Anchored = (props: AnchoredProps) => {
  const { anchorRef, anchorRect, boundary, placement = 'bottom-start', flip = true, layer, portal, fallback, className, style, ref, children, ...popup } = props;
  const { onDismiss, dismissOnEscape, dismissOnOutsidePress, ...rest } = popup;
  const name = anchorIdent(useId());
  const noAnchor = useRef<HTMLElement | null>(null);
  const anchor = anchorRef ?? noAnchor;
  const native = useAnchorSupport(anchor) && anchorRect === undefined && boundary === undefined;
  const popupRef = useRef<HTMLDivElement | null>(null);
  useAnchorName(native, anchor, name);
  useShownPopover(native, popupRef);
  useAnchoredDismiss({ onDismiss, dismissOnEscape, dismissOnOutsidePress, popupRef, anchor });

  const attach = useCallback((node: HTMLDivElement | null) => {
    popupRef.current = node;
    setNodeOnRef(ref, node);
  }, [ref]);

  if (!native) {
    const spot = { anchor, anchorRect, boundary, placement, flip, popupRef };
    return (
      <AnchoredPlaced {...spot} nodeRef={attach} layer={layer} portal={portal} fallback={fallback} className={className} style={style} {...rest}>
        {children}
      </AnchoredPlaced>
    );
  }

  const anchoredStyle: AnchoredStyle = { ...style, '--anchored-name': name };
  return (
    <div
      ref={attach}
      popover="manual"
      className={['anchored', className].filter(Boolean).join(' ')}
      data-anchored=""
      data-anchor-place={placement}
      data-flip={flip || undefined}
      style={anchoredStyle}
      {...rest}
    >
      {children}
    </div>
  );
};

export { Anchored };
