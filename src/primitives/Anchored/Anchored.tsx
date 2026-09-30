/* @layer renderer-components @kind component */
import { useId, useRef } from 'react';
import { setNodeOnRef } from '../ScrollArea/behavior/set-node-on-ref';
import { anchorIdent } from './behavior/anchor-ident';
import { useAnchorName } from './behavior/useAnchorName';
import { useAnchorSupport } from './behavior/useAnchorSupport';
import { useShownPopover } from './behavior/useShownPopover';
import { AnchoredFallback } from './sub-components/AnchoredFallback';
import type { AnchoredProps, AnchoredStyle } from './Anchored.type';
import './Anchored.css';

const Anchored = (props: AnchoredProps) => {
  const { anchorRef, placement = 'bottom-start', flip = true, layer, portal, fallback, className, style, ref, children, ...rest } = props;
  const name = anchorIdent(useId());
  const native = useAnchorSupport(anchorRef);
  const popupRef = useRef<HTMLDivElement | null>(null);
  useAnchorName(native, anchorRef, name);
  useShownPopover(native, popupRef);

  const attach = (node: HTMLDivElement | null) => {
    popupRef.current = node;
    setNodeOnRef(ref, node);
  };

  if (!native) {
    return (
      <AnchoredFallback nodeRef={attach} layer={layer} portal={portal} fallback={fallback} className={className} style={style} {...rest}>
        {children}
      </AnchoredFallback>
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
