/* @layer renderer-components @kind component */
import { shortcutKeys } from '../../../primitives/Shortcut';
import { IconButton } from '../../../primitives/IconButton';
import { ariaKeyShortcuts } from '../../DropdownMenu/behavior/aria-key-shortcuts';
import { actionItem } from '../behavior/action-item';
import { barItemProps } from '../behavior/bar-item-props';
import type { TitleBarCommandProps } from './TitleBarAction.type';
import { TitleBarActionIcon } from './TitleBarActionIcon';
import { TitleBarTip } from './TitleBarTip';

const TitleBarCommand = (props: TitleBarCommandProps) => {
  const { action, away } = props;
  const disabled = action.disabled === true;
  const shortcut = disabled ? undefined : action.shortcut;
  const keys = shortcut === undefined ? undefined : shortcutKeys(shortcut);
  const reason = disabled ? action.disabledReason : undefined;
  return (
    <TitleBarTip label={reason ?? action.label} shortcut={shortcut} away={away}>
      <IconButton
        {...barItemProps(actionItem(action.id), away)}
        size="sm"
        tone={action.tone === 'danger' ? 'danger' : undefined}
        label={action.label}
        aria-keyshortcuts={keys && ariaKeyShortcuts(keys)}
        aria-disabled={disabled || undefined}
        aria-description={reason}
        onClick={disabled ? undefined : action.onSelect}
      >
        <TitleBarActionIcon action={action} size={14} />
      </IconButton>
    </TitleBarTip>
  );
};

export { TitleBarCommand };
