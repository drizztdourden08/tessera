/* @layer renderer-components @kind component */
import { Icon } from '../../Icon';
import type { ShortcutGestureCapProps } from '../ShortcutList.type';

const ShortcutGestureCap = (props: ShortcutGestureCapProps) => {
  const { gesture, size } = props;
  return (
    <kbd className={`shortcut shortcut--${size} shortcut--idle`}>
      <kbd className="shortcut__cap shortcut-list__gesture">
        <Icon name={gesture.icon} size={size === 'xs' ? 10 : 12} />
        <span>{gesture.label}</span>
      </kbd>
    </kbd>
  );
};

export { ShortcutGestureCap };
