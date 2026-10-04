/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { FloatingPlacement } from '../../../primitives/Floating';
import type { SubMenuJoinPiecesProps } from '../sub-components/SubMenuJoinPieces.type';
import type { JoinPanelStyle } from './join-style.type';

interface JoinedPanel {
  panelRef: RefObject<HTMLDivElement | null>;
  pieces: SubMenuJoinPiecesProps;
  place: {
    fallback: FloatingPlacement | null;
    'data-join-side': string | undefined;
    'data-join-align': string | undefined;
    style: JoinPanelStyle | undefined;
  };
}

export type { JoinedPanel };
