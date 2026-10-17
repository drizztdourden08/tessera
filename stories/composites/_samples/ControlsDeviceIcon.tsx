/* @layer stories @kind component */
import { Box, Icon } from '../../../src/primitives';
import type { ControlsDeviceIconProps } from './controls-page.type';

const ControlsDeviceIcon = ({ device }: ControlsDeviceIconProps) => (
  <Box as="span" className={device.ready ? 'controls-story__device-icon controls-story__device-icon--ready' : 'controls-story__device-icon'}>
    <Icon name={device.icon} size={24} />
  </Box>
);

export { ControlsDeviceIcon };
