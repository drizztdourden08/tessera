/* @layer stories @kind component */
import { Box, Icon, IconButton, Text } from '../../../src/primitives';
import { ControlsDeviceIcon } from './ControlsDeviceIcon';
import { CONTROLS_TEXT as T } from './controls-page.constants';
import { controlsDeviceDrag } from './controls-device-drag';
import type { ControlsDeviceCardProps } from './controls-page.type';

const ControlsDeviceCard = ({ device, onAssign }: ControlsDeviceCardProps) => (
  <Box surface="raised" className="controls-story__device" draggable onDragStart={controlsDeviceDrag(device.id)} data-device-id={device.id}>
    <ControlsDeviceIcon device={device} />
    <Box className="controls-story__device-text">
      <Text variant="label">{device.name}</Text>
      <Text tone="muted" variant="caption">{device.meta}</Text>
    </Box>
    <IconButton size="sm" variant="ghost" label={T.assign(device.name)} onClick={() => onAssign(device.id)}>
      <Icon name="plus" />
    </IconButton>
  </Box>
);

export { ControlsDeviceCard };
