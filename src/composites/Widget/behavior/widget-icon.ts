/* @layer renderer-components @kind logic */
import type { IconName } from '../../../primitives/Icon';
import type { WidgetProps } from '../Widget.type';

const widgetIcon = ({ tabs, activeId }: Pick<WidgetProps, 'tabs' | 'activeId'>): IconName | undefined =>
  (tabs.find((tab) => tab.id === activeId) ?? tabs[0])?.icon;

export { widgetIcon };
