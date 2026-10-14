/* @layer renderer-components @kind component */
import { useId, useRef } from 'react';
import { useDescribedBy } from './behavior/useDescribedBy';
import { usePointerFollow } from './behavior/usePointerFollow';
import { useTooltipOpen } from './behavior/useTooltipOpen';
import { TooltipBubble } from './sub-components/TooltipBubble';
import './Tooltip.css';
import type { TooltipProps } from './Tooltip.type';

const Tooltip = (props: TooltipProps) => {
  const { content, placement = 'top', follow = 'anchor', focusable = false, children, className = '' } = props;
  const anchorRef = useRef<HTMLSpanElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const bubbleId = useId();
  const pointer = usePointerFollow(bubbleRef);
  const onPointer = follow === 'pointer' ? pointer.track : undefined;
  const { open, hover, handlers } = useTooltipOpen(anchorRef, bubbleRef, content != null, onPointer);
  const describedBy = open ? bubbleId : undefined;
  useDescribedBy(anchorRef, describedBy, focusable);
  const stop = focusable ? { tabIndex: 0, 'aria-describedby': describedBy } : {};
  const bubble = { attach: pointer.attach, bubbleRef, anchorRef, id: bubbleId, placement };

  return (
    <span ref={anchorRef} className={['tooltip-anchor', className].filter(Boolean).join(' ')} {...stop} {...handlers}>
      {children}
      {open && <TooltipBubble atPointer={onPointer !== undefined && hover} {...bubble}>{content}</TooltipBubble>}
    </span>
  );
};

export { Tooltip };
