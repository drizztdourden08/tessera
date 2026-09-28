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
import option from '@iconify-icons/ph/option';

const KEY_SYMBOLS = {
  command: { icon: command },
  option: { icon: option },
  control: { icon: caretUp },
  shift: { icon: arrowFatUp },
  capslock: { icon: arrowFatLineUp },
  tab: { icon: arrowLineRight },
  enter: { icon: arrowElbowDownLeft },
  backspace: { icon: backspace },
  delete: { icon: backspace, flip: 'horizontal' },
  home: { icon: arrowUpLeft },
  end: { icon: arrowDownRight },
  up: { icon: arrowUp },
  down: { icon: arrowDown },
  left: { icon: arrowLeft },
  right: { icon: arrowRight },
} as const;

export { KEY_SYMBOLS };
