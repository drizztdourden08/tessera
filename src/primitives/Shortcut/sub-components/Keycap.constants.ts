/* @layer renderer-components @kind constants */
import arrowDown from '@iconify-icons/ph/arrow-down';
import arrowDownRight from '@iconify-icons/ph/arrow-down-right';
import arrowElbowDownLeft from '@iconify-icons/ph/arrow-elbow-down-left';
import arrowFatLineUp from '@iconify-icons/ph/arrow-fat-line-up';
import arrowFatUp from '@iconify-icons/ph/arrow-fat-up';
import arrowLeft from '@iconify-icons/ph/arrow-left';
import arrowLineRight from '@iconify-icons/ph/arrow-line-right';
import arrowRight from '@iconify-icons/ph/arrow-right';
import arrowUp from '@iconify-icons/ph/arrow-up';
import arrowUpLeft from '@iconify-icons/ph/arrow-up-left';
import backspace from '@iconify-icons/ph/backspace';
import caretUp from '@iconify-icons/ph/caret-up';
import command from '@iconify-icons/ph/command';
import globeSimple from '@iconify-icons/ph/globe-simple';
import option from '@iconify-icons/ph/option';
import { layeredIcon } from '../behavior/layered-icon';

const TAB_BACK = 'M224 76a8 8 0 0 1-8 8H91.31l26.35 26.34a8 8 0 0 1-11.32 11.32l-40-40a8 8 0 0 1 0-11.32l40-40a8 8 0 0 1 11.32 11.32L91.31 68H216a8 8 0 0 1 8 8M40 30.34a8 8 0 0 0-8 8v75.32a8 8 0 0 0 16 0V38.34a8 8 0 0 0-8-8';
const TAB_FORWARD = 'M32 180a8 8 0 0 1 8-8h124.69l-26.35-26.34a8 8 0 0 1 11.32-11.32l40 40a8 8 0 0 1 0 11.32l-40 40a8 8 0 0 1-11.32-11.32L164.69 188H40a8 8 0 0 1-8-8m184 45.66a8 8 0 0 0 8-8v-75.32a8 8 0 0 0-16 0v75.32a8 8 0 0 0 8 8';
const LONG_BACK = 'M360 128a8 8 0 0 1-8 8H59.31l58.35 58.34a8 8 0 0 1-11.32 11.32l-72-72a8 8 0 0 1 0-11.32l72-72a8 8 0 0 1 11.32 11.32L59.31 120H352a8 8 0 0 1 8 8';

const KEY_SYMBOLS = {
  command: { icon: command },
  option: { icon: option },
  control: { icon: caretUp },
  shift: { icon: arrowFatUp },
  capslock: { icon: arrowFatLineUp },
  globe: { icon: globeSimple },
  tab: { icon: layeredIcon({ base: [TAB_BACK, TAB_FORWARD] }) },
  tabForward: { icon: arrowLineRight },
  enter: { icon: arrowElbowDownLeft },
  backspace: { icon: backspace },
  longBack: { icon: layeredIcon({ base: [LONG_BACK], width: 384 }), long: true },
  delete: { icon: backspace, flip: 'horizontal' },
  home: { icon: arrowUpLeft },
  end: { icon: arrowDownRight },
  up: { icon: arrowUp },
  down: { icon: arrowDown },
  left: { icon: arrowLeft },
  right: { icon: arrowRight },
} as const;

export { KEY_SYMBOLS };
