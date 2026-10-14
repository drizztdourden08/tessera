/* @layer stories @kind data */
import type { PlaygroundArgTypes } from '../../_template/controls/playground.type';
import type { TitleBarArgs } from './title-bar-args.type';

const ARGS: Partial<TitleBarArgs> = {
  title: 'Brock Demo',
  withLogo: true,
  instanceName: '',
  withMenu: true,
  withActions: true,
  updateAvailable: true,
  pulse: false,
  concealed: false,
  fullscreenButton: true,
  pinButton: true,
  minimizeButton: true,
  maximizeButton: true,
  closeButton: true,
};

const ARG_TYPES: PlaygroundArgTypes<TitleBarArgs> = {
  title: { group: 'Content', control: 'text' },
  withLogo: { group: 'Content', control: 'boolean' },
  instanceName: { group: 'Content', control: 'text', description: 'Names a second copy of the app, such as a dev build, in a Status pill.' },
  withMenu: { group: 'Content', control: 'boolean', description: 'Pass menu groups; the bar draws the hamburger and its menu.' },
  withActions: { group: 'Content', control: 'boolean', description: 'Pass actions: Report a bug as a button and Check for updates as green status text.' },
  fullscreenButton: { group: 'Content', control: 'boolean', description: 'controls.fullscreen' },
  pinButton: { group: 'Content', control: 'boolean', description: 'controls.pin' },
  minimizeButton: { group: 'Content', control: 'boolean', description: 'controls.minimize' },
  maximizeButton: { group: 'Content', control: 'boolean', description: 'controls.maximize' },
  closeButton: { group: 'Content', control: 'boolean', description: 'controls.close' },
  updateAvailable: { group: 'State', control: 'boolean', description: 'Sets the status of Check for updates, which shows the green text in the bar and the menu subtitle.' },
  pulse: { group: 'State', control: 'boolean', description: 'Sets pulse on Check for updates: a beating dot before its status text.' },
  concealed: { group: 'State', control: 'boolean' },
};

export { ARG_TYPES, ARGS };
