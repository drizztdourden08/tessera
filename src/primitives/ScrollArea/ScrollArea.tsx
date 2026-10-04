/* @layer renderer-components @kind component */
import { useEffect, useMemo, useRef } from 'react';
import { createScrollSyncController } from './behavior/create-scroll-sync-controller';
import { setNodeOnRef } from './behavior/set-node-on-ref';
import { useScrollEdges } from './behavior/useScrollEdges';
import { useSlimThumbDrag } from './behavior/useSlimThumbDrag';
import type { ScrollAreaProps } from './ScrollArea.type';
import type { UIEvent } from 'react';
import './ScrollArea.css';

const ScrollArea = (props: ScrollAreaProps) => {
  const { axis = 'y', fade = true, scrollbar = 'native', className = '', children, onScroll, scrollTo, ref, ...rest } = props;

  const nodeRef = useRef<HTMLDivElement | null>(null);
  const controller = useMemo(() => createScrollSyncController(() => nodeRef.current), []);
  const slim = scrollbar === 'slim';
  useScrollEdges(nodeRef, axis, fade, slim);
  useSlimThumbDrag(nodeRef, axis, slim);

  useEffect(() => {
    controller.applyScrollTo(scrollTo ?? {});
  }, [controller, scrollTo?.top, scrollTo?.left]);

  const handleScroll = (event: UIEvent<HTMLDivElement>): void => {
    const current = { top: event.currentTarget.scrollTop, left: event.currentTarget.scrollLeft };
    controller.handleScroll(current, onScroll);
  };

  return (
    <div
      ref={(node) => {
        nodeRef.current = node;
        setNodeOnRef(ref, node);
      }}
      className={`scroll-area${className ? ` ${className}` : ''}`}
      data-axis={axis}
      data-scrollbar={slim ? 'slim' : undefined}
      onScroll={onScroll ? handleScroll : undefined}
      {...rest}
    >
      {children}
    </div>
  );
};

export { ScrollArea };
