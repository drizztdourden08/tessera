/* @layer renderer-components @kind logic */
import type { ScreenWindowProps } from '../ScreenWindow.type';

const windowClasses = (props: ScreenWindowProps, bare: boolean): string =>
  ['screen-window', props.header && 'screen-window--header', bare && 'screen-window--bare', props.className].filter(Boolean).join(' ');

export { windowClasses };
