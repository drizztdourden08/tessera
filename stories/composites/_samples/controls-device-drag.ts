/* @layer stories @kind logic */
import type { DragEvent } from 'react';
import { CONTROLS_DRAG_TYPE } from './controls-page.constants';

const controlsDeviceDrag = (deviceId: string) => (event: DragEvent<HTMLElement>): void => {
  event.dataTransfer.setData(CONTROLS_DRAG_TYPE, deviceId);
  event.dataTransfer.effectAllowed = 'copy';
};

export { controlsDeviceDrag };
