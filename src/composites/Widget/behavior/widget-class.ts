/* @layer renderer-components @kind logic */
import type { WidgetProps } from '../Widget.type';

const widgetClass = (props: Pick<WidgetProps, 'paneKey' | 'peek' | 'square'>): string => [
  'widget',
  props.peek === true && 'widget--peek',
  props.paneKey === null && 'widget--floating',
  props.square === true && 'widget--square',
].filter(Boolean).join(' ');

export { widgetClass };
