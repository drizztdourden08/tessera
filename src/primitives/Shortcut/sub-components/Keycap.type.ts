/* @layer renderer-components @kind types */
import type { IconifyIcon } from '@iconify/types';
import type { IconFlip } from '../../Icon';
import type { KeyFace } from '../Shortcut.type';

interface KeycapProps {
  face: KeyFace;
}

interface KeySymbolSpec {
  icon: IconifyIcon;
  flip?: IconFlip;
}

export type { KeycapProps, KeySymbolSpec };
