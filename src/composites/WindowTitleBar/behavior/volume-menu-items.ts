/* @layer renderer-components @kind logic */
import { createElement } from 'react';
import { VolumeIcon } from '../../../primitives/VolumeIcon';
import type { MenuItem } from '../../DropdownMenu';
import { applyVolumeLevel } from '../../VolumeControl/behavior/apply-volume-level';
import { percentOfRange } from '../../VolumeControl/behavior/percent-of-range';
import { VOLUME_LEVEL_SUFFIX, VOLUME_MUTE_SUFFIX } from '../WindowTitleBar.constants';
import type { WindowTitleBarVolumeAction } from '../WindowTitleBar.type';
import type { TitleBarMenuStrings } from './title-bar-menu.type';

const volumeMenuItems = (action: WindowTitleBarVolumeAction, strings: TitleBarMenuStrings): MenuItem[] => {
  const { id, label, value, muted, onMutedChange, min = 0, max = 100, step = 1, shortcut } = action;
  const level = max > min ? (value - min) / (max - min) : 0;
  return [
    {
      id: `${id}${VOLUME_MUTE_SUFFIX}`,
      icon: createElement(VolumeIcon, { level, muted }),
      label: muted ? strings.unmute : strings.mute,
      shortcut,
      onSelect: () => onMutedChange(!muted),
    },
    {
      id: `${id}${VOLUME_LEVEL_SUFFIX}`,
      kind: 'slider',
      label,
      value: muted ? min : value,
      min,
      max,
      step,
      formatValue: percentOfRange(min, max),
      onChange: (next) => applyVolumeLevel(action, next),
    },
  ];
};

export { volumeMenuItems };
