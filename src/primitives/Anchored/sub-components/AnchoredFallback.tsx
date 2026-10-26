/* @layer renderer-components @kind component */
import { useCallback, useRef } from 'react';
import { Portal } from '../../Portal';
import { useViewFit } from '../behavior/useViewFit';
import type { AnchoredFallbackProps } from './AnchoredFallback.type';

const AnchoredFallback = (props: AnchoredFallbackProps) => {
  const { nodeRef, anchorRef, fit = false, layer = 'popover', portal = true, fallback, place, className = '', style, children, ...rest } = props;
  const ownRef = useRef<HTMLDivElement | null>(null);
  const attach = useCallback((node: HTMLDivElement | null) => {
    ownRef.current = node;
    nodeRef(node);
  }, [nodeRef]);
  useViewFit(fit && fallback !== null, ownRef, anchorRef);
  const placed = (
    <div ref={attach} className={`anchored-fallback${className ? ` ${className}` : ''}`} data-anchor-place={place} style={{ ...style, ...fallback }} {...rest}>
      {children}
    </div>
  );
  return portal ? <Portal layer={layer}>{placed}</Portal> : placed;
};

export { AnchoredFallback };
