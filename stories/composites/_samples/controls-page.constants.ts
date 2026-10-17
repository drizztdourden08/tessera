/* @layer stories @kind data */
import type { ControlsAction, ControlsDevice, ControlsProfile } from './controls-page.type';

const CONTROLS_DRAG_TYPE = 'application/x-tessera-device';

const CONTROLS_TEXT = {
  profiles: 'Profiles',
  devices: 'Devices',
  newProfile: 'New profile',
  rescan: 'Rescan devices',
  bindings: (profile: string) => `Bindings of ${profile}`,
  hint: 'Drag a device card onto an action, or press Assign on the card to fill the next free action.',
  drop: 'Drop a device here',
  assign: (device: string) => `Assign ${device} to the next free action`,
  pick: (profile: string) => `Pick ${profile}`,
} as const;

const CONTROLS_FIRST_PROFILE: ControlsProfile = { id: 'default', name: 'Default', meta: 'Keyboard and mouse', icon: 'keyboard' };

const CONTROLS_PROFILES: readonly ControlsProfile[] = [
  CONTROLS_FIRST_PROFILE,
  { id: 'couch', name: 'Couch', meta: 'Xbox controller', icon: 'gamepad-2' },
  { id: 'speedrun', name: 'Speedrun', meta: 'Pro controller', icon: 'gamepad-2' },
  { id: 'arcade', name: 'Arcade stick', meta: 'Keyboard', icon: 'keyboard' },
  { id: 'guest', name: 'Guest', meta: 'Any controller', icon: 'gamepad-2' },
];

const CONTROLS_DEVICES: readonly ControlsDevice[] = [
  { id: 'kb', name: 'Keyboard', meta: 'USB · ready', icon: 'keyboard', ready: true },
  { id: 'xbox', name: 'Xbox Series controller', meta: 'Bluetooth · rumble', icon: 'gamepad-2', ready: true },
  { id: 'pro', name: 'Switch Pro controller', meta: 'USB · asleep', icon: 'gamepad-2', ready: false },
  { id: 'ds', name: 'DualSense', meta: 'Bluetooth · rumble and gyro', icon: 'gamepad-2', ready: true },
];

const CONTROLS_ACTIONS: readonly ControlsAction[] = [
  { id: 'move', name: 'Move' },
  { id: 'jump', name: 'Jump' },
  { id: 'attack', name: 'Attack' },
  { id: 'shield', name: 'Shield' },
  { id: 'menu', name: 'Open the menu' },
];

export { CONTROLS_ACTIONS, CONTROLS_DEVICES, CONTROLS_DRAG_TYPE, CONTROLS_FIRST_PROFILE, CONTROLS_PROFILES, CONTROLS_TEXT };
