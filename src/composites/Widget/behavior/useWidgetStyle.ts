/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import type { WidgetState } from '../Widget.type';

const useWidgetStyle = (state: WidgetState, frameOpacity: number, dockedStyle?: CSSProperties): CSSProperties =>
  useMemo(() => {
    const s: CSSProperties = {
      '--widget-frame-opacity': frameOpacity,
    } as CSSProperties;

    if (state.mode === 'floating') {
      s.left = state.x;
      s.top = state.y;
      s.width = state.width;
      s.height = state.height;
    } else if (dockedStyle) {
      Object.assign(s, dockedStyle);
    }

    return s;
  }, [state.mode, state.x, state.y, state.width, state.height, frameOpacity, dockedStyle]);

export { useWidgetStyle };
