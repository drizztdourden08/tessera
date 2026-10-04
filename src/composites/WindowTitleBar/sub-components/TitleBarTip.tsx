/* @layer renderer-components @kind component */
import { Shortcut } from '../../../primitives/Shortcut';
import { Span } from '../../../primitives/text-elements';
import { Tooltip } from '../../../primitives/Tooltip';
import { menuShortcutKeys } from '../../DropdownMenu/behavior/menu-shortcut-keys';
import type { TitleBarTipProps } from './TitleBarTip.type';

const TitleBarTip = (props: TitleBarTipProps) => {
  const { label, shortcut, away = false, quiet = false, children } = props;
  const keys = shortcut === undefined ? undefined : menuShortcutKeys(shortcut);
  const content = (
    <Span className="window-title-bar__tip-text">
      {label}
      {keys && keys.length > 0 && <Shortcut keys={keys} size="xs" />}
    </Span>
  );
  return (
    <Tooltip content={away || quiet ? null : content} placement="bottom" className={`window-title-bar__tip${away ? ' window-title-bar__tip--away' : ''}`}>
      {children}
    </Tooltip>
  );
};

export { TitleBarTip };
