/* @layer renderer-components @kind hook */
import { useRef } from 'react';
import type { RefObject } from 'react';
import { joinStyle } from './join-style';
import type { JoinedPanel } from './useJoinedPanel.type';
import { useSafeArea } from './useSafeArea';
import { useSubMenuJoin } from './useSubMenuJoin';

const useJoinedPanel = (rowRef: RefObject<HTMLElement | null>): JoinedPanel => {
  const panelRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLElement>(null);
  const { join, native } = useSubMenuJoin(rowRef, panelRef);
  useSafeArea({ rowRef, panelRef, areaRef, bodyRef, join });
  return {
    panelRef,
    pieces: { join, areaRef, bodyRef },
    place: {
      fallback: join && !native ? { top: join.top, left: join.left } : null,
      'data-join-side': join?.side,
      'data-join-align': join?.align,
      style: join ? joinStyle(join, native) : undefined,
    },
  };
};

export { useJoinedPanel };
