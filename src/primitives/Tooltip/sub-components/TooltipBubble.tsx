/* @layer renderer-components @kind component */
import { Anchored } from '../../Anchored';
import { Portal } from '../../Portal';
import type { TooltipBubbleProps } from './TooltipBubble.type';

const TooltipBubble = (props: TooltipBubbleProps) => {
  const { atPointer, attach, bubbleRef, anchorRef, id, placement, children } = props;
  if (atPointer) {
    return (
      <Portal layer="tooltip">
        <div ref={attach} id={id} role="tooltip" className="tooltip" data-follow="pointer">
          {children}
        </div>
      </Portal>
    );
  }
  return (
    <Anchored
      ref={bubbleRef}
      id={id}
      role="tooltip"
      anchorRef={anchorRef}
      placement={placement === 'top' ? 'top-center' : 'bottom-center'}
      layer="tooltip"
      className="tooltip"
      data-placement={placement}
    >
      {children}
    </Anchored>
  );
};

export { TooltipBubble };
