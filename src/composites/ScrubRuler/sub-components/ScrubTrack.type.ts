/* @layer renderer-components @kind types */
import type { KeyboardEvent, PointerEvent } from 'react';
import type { CellGeometry } from '../../cell-geometry';
import type { ScrubRulerProps } from '../ScrubRuler.type';

interface ScrubTrackProps extends Pick<ScrubRulerProps, 'tickLabel' | 'tickEvery' | 'valueText' | 'label'> {
  cells: CellGeometry;
  total: number;
  current: number;
  readOnly: boolean;
  onPress: (event: PointerEvent<HTMLElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
}

export type { ScrubTrackProps };
