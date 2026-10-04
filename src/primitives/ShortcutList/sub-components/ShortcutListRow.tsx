/* @layer renderer-components @kind component */
import { Shortcut } from '../../Shortcut';
import type { ShortcutListRowProps } from '../ShortcutList.type';
import { ShortcutGestureCap } from './ShortcutGestureCap';

const ShortcutListRow = (props: ShortcutListRowProps) => {
  const { item, size } = props;
  const { keys, mouse, gesture, description } = item;
  const hasKeys = keys !== undefined || mouse !== undefined;
  return (
    <div className="shortcut-list__row">
      <dt className="shortcut-list__keys">
        {keys !== undefined && <Shortcut keys={keys} mouse={mouse} size={size} state="idle" />}
        {keys === undefined && mouse !== undefined && <Shortcut mouse={mouse} size={size} state="idle" />}
        {hasKeys && gesture && <span className="shortcut__joiner">+</span>}
        {gesture && <ShortcutGestureCap gesture={gesture} size={size} />}
      </dt>
      <dd className="shortcut-list__does">{description}</dd>
    </div>
  );
};

export { ShortcutListRow };
