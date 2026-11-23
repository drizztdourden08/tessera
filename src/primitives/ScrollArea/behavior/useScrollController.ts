/* @layer renderer-components @kind hook */
import { useEffect, useMemo } from 'react';
import type { RefObject } from 'react';
import type { ScrollAreaProps } from '../ScrollArea.type';
import { createScrollSyncController } from './create-scroll-sync-controller';

const useScrollController = (nodeRef: RefObject<HTMLDivElement | null>, scrollTo: ScrollAreaProps['scrollTo']) => {
  const controller = useMemo(() => createScrollSyncController(() => nodeRef.current), [nodeRef]);

  useEffect(() => {
    controller.applyScrollTo(scrollTo ?? {});
  }, [controller, scrollTo?.top, scrollTo?.left]);

  return controller;
};

export { useScrollController };
