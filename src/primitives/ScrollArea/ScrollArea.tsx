/* @layer renderer-components @kind component */
import { useEffect, useMemo, useRef } from 'react';
import { createScrollSyncController } from './behavior/create-scroll-sync-controller';
import { setNodeOnRef } from './behavior/set-node-on-ref';
import { useScrollEdges } from './behavior/useScrollEdges';
import type { ScrollAreaProps } from './ScrollArea.type';
import type { UIEvent } from 'react';
import './ScrollArea.css';

const ScrollArea = (props: ScrollAreaProps) => {
  const { axis = 'y', fade = true, className = '', children, onScroll, scrollTo, ref, ...rest } = props;

  const nodeRef = useRef<HTMLDivElement | null>(null);
  const controller = useMemo(() => createScrollSyncController(() => nodeRef.current), []);
  useScrollEdges(nodeRef, axis, fade);

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
      onScroll={onScroll ? handleScroll : undefined}
      {...rest}
    >
      {children}
    </div>
  );
};

export { ScrollArea };
