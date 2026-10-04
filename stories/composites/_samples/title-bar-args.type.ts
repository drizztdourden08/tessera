/* @layer stories @kind types */
type TitleBarArgs = {
  title: string;
  withLogo: boolean;
  instanceName: string;
  withMenu: boolean;
  withActions: boolean;
  updateAvailable: boolean;
  pulse: boolean;
  concealed: boolean;
  fullscreenButton: boolean;
  pinButton: boolean;
  minimizeButton: boolean;
  maximizeButton: boolean;
};

export type { TitleBarArgs };
