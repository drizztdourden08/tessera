/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { TITLE_ICON_SIZE } from '../Widget.constants';
import type { WidgetIconProps } from './WidgetIcon.type';

const WidgetIcon = ({ name }: WidgetIconProps) =>
  (name === undefined ? null : <Icon name={name} size={TITLE_ICON_SIZE} className="widget__icon" aria-hidden="true" />);

export { WidgetIcon };
