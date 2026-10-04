/* @layer renderer-components @kind component */
import { useId, useRef } from 'react';
import { Anchored } from '../Anchored';
import { useDescribedBy } from './behavior/useDescribedBy';
import { useFallbackPos } from './behavior/useFallbackPos';
import { useTooltipOpen } from './behavior/useTooltipOpen';
import './Tooltip.css';
import type { TooltipProps } from './Tooltip.type';

const Tooltip = (props: TooltipProps) => {
  const { content, placement = 'top', focusable = false, children, className = '' } = props;
  const anchorRef = useRef<HTMLSpanElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const bubbleId = useId();
  const { open, handlers } = useTooltipOpen(anchorRef, bubbleRef, content != null);
  const pos = useFallbackPos(anchorRef, open, placement);
  const describedBy = open ? bubbleId : undefined;
  useDescribedBy(anchorRef, describedBy, focusable);
  const stop = focusable ? { tabIndex: 0, 'aria-describedby': describedBy } : {};

  return (
    <span
      ref={anchorRef}
      className={`tooltip-anchor${className ? ` ${className}` : ''}`}
      {...stop}
      {...handlers}
    >
      {children}
      {open && (
        <Anchored
          ref={bubbleRef}
          id={bubbleId}
          role="tooltip"
          anchorRef={anchorRef}
          placement={placement === 'top' ? 'top-center' : 'bottom-center'}
          layer="tooltip"
          fallback={pos}
          className="tooltip"
          data-placement={placement}
        >
          {content}
        </Anchored>
      )}
    </span>
  );
};

export { Tooltip };
