/* @layer renderer-components @kind component */
import { Portal } from '../../Portal';
import type { AnchoredFallbackProps } from './AnchoredFallback.type';

const AnchoredFallback = (props: AnchoredFallbackProps) => {
  const { nodeRef, layer = 'popover', portal = true, fallback, place, className = '', style, children, ...rest } = props;
  const placed = (
    <div ref={nodeRef} className={`anchored-fallback${className ? ` ${className}` : ''}`} data-anchor-place={place} style={{ ...style, ...fallback }} {...rest}>
      {children}
    </div>
  );
  return portal ? <Portal layer={layer}>{placed}</Portal> : placed;
};

export { AnchoredFallback };
