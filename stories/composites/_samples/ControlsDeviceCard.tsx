/* @layer stories @kind component */
import type { DragEvent } from 'react';
import { Box, Icon, IconButton, Text } from '../../../src/primitives';
import { CONTROLS_DRAG_TYPE, CONTROLS_TEXT as T } from './controls-page.constants';
import type { ControlsDeviceCardProps } from './controls-page.type';

const ControlsDeviceCard = ({ device, onAssign }: ControlsDeviceCardProps) => {
  const start = (event: DragEvent<HTMLElement>) => {
    event.dataTransfer.setData(CONTROLS_DRAG_TYPE, device.id);
    event.dataTransfer.effectAllowed = 'copy';
  };
  return (
    <Box surface="sunken" className="controls-story__device" draggable onDragStart={start} data-device-id={device.id}>
      <Icon name={device.icon} size={24} className="controls-story__device-icon" />
      <Box className="controls-story__device-text">
        <Text variant="label">{device.name}</Text>
        <Text tone="muted" variant="caption">{device.meta}</Text>
      </Box>
      <IconButton size="sm" variant="ghost" label={T.assign(device.name)} onClick={() => onAssign(device.id)}>
        <Icon name="plus" />
      </IconButton>
    </Box>
  );
};

export { ControlsDeviceCard };
