/* @layer renderer-components @kind logic */
import type { WidgetProps } from '../Widget.type';
import { widgetChrome } from './widget-chrome';

const widgetClass = (props: Pick<WidgetProps, 'paneKey' | 'peek' | 'square' | 'chrome'>): string => {
  const chrome = widgetChrome(props);
  return [
    'widget',
    props.peek === true && 'widget--peek',
    props.paneKey === null && 'widget--floating',
    props.square === true && 'widget--square',
    chrome !== 'full' && `widget--chrome-${chrome}`,
  ].filter(Boolean).join(' ');
};

export { widgetClass };
