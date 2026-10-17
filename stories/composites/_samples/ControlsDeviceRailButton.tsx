/* @layer stories @kind component */
import { IconButton } from '../../../src/primitives';
import { ControlsDeviceIcon } from './ControlsDeviceIcon';
import { CONTROLS_TEXT as T } from './controls-page.constants';
import { controlsDeviceDrag } from './controls-device-drag';
import type { ControlsDeviceCardProps } from './controls-page.type';

const ControlsDeviceRailButton = ({ device, onAssign }: ControlsDeviceCardProps) => (
  <IconButton size="md" variant="ghost" label={T.assign(device.name)} draggable onDragStart={controlsDeviceDrag(device.id)} onClick={() => onAssign(device.id)}>
    <ControlsDeviceIcon device={device} />
  </IconButton>
);

export { ControlsDeviceRailButton };
