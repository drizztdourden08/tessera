/* @layer renderer-components @kind component */
import { IconButton } from '../../../primitives/IconButton';
import { ariaKeyShortcuts } from '../../DropdownMenu/behavior/aria-key-shortcuts';
import { menuShortcutKeys } from '../../DropdownMenu/behavior/menu-shortcut-keys';
import { actionBar } from '../behavior/action-bar';
import { actionItem } from '../behavior/action-item';
import { barItemProps } from '../behavior/bar-item-props';
import type { TitleBarActionProps } from './TitleBarAction.type';
import { TitleBarActionIcon } from './TitleBarActionIcon';
import { TitleBarDropdown } from './TitleBarDropdown';
import { TitleBarStatus } from './TitleBarStatus';
import { TitleBarTip } from './TitleBarTip';

const TitleBarAction = (props: TitleBarActionProps) => {
  const { action, away, onMenuOpenChange } = props;
  const bar = actionBar(action);
  if (bar === null) return null;
  if (action.bar === 'dropdown') return <TitleBarDropdown action={action} away={away} onOpenChange={onMenuOpenChange} />;
  if (bar === 'status') return <TitleBarStatus action={action} away={away} />;
  const item = actionItem(action.id);
  const keys = action.shortcut === undefined ? undefined : menuShortcutKeys(action.shortcut);
  return (
    <TitleBarTip label={action.label} shortcut={action.shortcut} away={away}>
      <IconButton
        {...barItemProps(item, away)}
        size="sm"
        tone={action.tone === 'danger' ? 'danger' : undefined}
        label={action.label}
        aria-keyshortcuts={keys && ariaKeyShortcuts(keys)}
        onClick={action.onSelect}
      >
        <TitleBarActionIcon action={action} size={14} />
      </IconButton>
    </TitleBarTip>
  );
};

export { TitleBarAction };
