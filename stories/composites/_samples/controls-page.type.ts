/* @layer stories @kind types */
import type { IconName } from '../../../src/primitives/Icon/Icon.type';

interface ControlsProfile {
  id: string;
  name: string;
  meta: string;
  icon: IconName;
}

interface ControlsDevice {
  id: string;
  name: string;
  meta: string;
  icon: IconName;
  ready: boolean;
}

interface ControlsDeviceIconProps {
  device: ControlsDevice;
}

interface ControlsAction {
  id: string;
  name: string;
}

type ControlsBindings = Readonly<Record<string, string>>;

interface ControlsDeviceCardProps {
  device: ControlsDevice;
  onAssign: (deviceId: string) => void;
}

interface ControlsBindingsProps {
  profile: ControlsProfile;
  bindings: ControlsBindings;
  onBind: (actionId: string, deviceId: string) => void;
}

interface ControlsPageSampleProps {
  folded?: boolean;
}

export type {
  ControlsAction, ControlsBindings, ControlsBindingsProps, ControlsDevice, ControlsDeviceCardProps, ControlsDeviceIconProps, ControlsPageSampleProps,
  ControlsProfile,
};
