/* @layer renderer-components @kind types */
import type { WindowControl, WindowControlsConfig } from '../WindowTitleBar.type';

interface WindowControlsProps {
  controls: WindowControlsConfig;
  maximized?: boolean;
  fullscreen: boolean;
  onControl: (control: WindowControl) => void;
}

export type { WindowControlsProps };
