/* @layer stories @kind data */
import bellDuotone from '@iconify-icons/ph/bell-duotone';
import folderDuotone from '@iconify-icons/ph/folder-duotone';
import gearDuotone from '@iconify-icons/ph/gear-duotone';
import heartDuotone from '@iconify-icons/ph/heart-duotone';
import houseDuotone from '@iconify-icons/ph/house-duotone';
import searchDuotone from '@iconify-icons/ph/magnifying-glass-duotone';
import starDuotone from '@iconify-icons/ph/star-duotone';
import trashDuotone from '@iconify-icons/ph/trash-duotone';
import { ICONS } from '../../../src/primitives';
import type { IconName, IconSet } from '../../../src/primitives';

const APP_ICONS: IconSet = {
  ...ICONS,
  'house': houseDuotone,
  'settings': gearDuotone,
  'search': searchDuotone,
  'folder': folderDuotone,
  'trash-2': trashDuotone,
  'star': starDuotone,
  'bell': bellDuotone,
  'heart': heartDuotone,
};

const SHOWN_ICONS: readonly IconName[] = ['house', 'settings', 'search', 'folder', 'trash-2', 'star', 'bell', 'heart'];

export { APP_ICONS, SHOWN_ICONS };
