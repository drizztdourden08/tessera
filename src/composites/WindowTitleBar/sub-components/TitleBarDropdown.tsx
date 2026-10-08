/* @layer renderer-components @kind component */
import { useState } from 'react';
import { Box } from '../../../primitives/Box';
import { DropdownMenu } from '../../DropdownMenu';
import { actionItem } from '../behavior/action-item';
import { barItemProps } from '../behavior/bar-item-props';
import type { TitleBarDropdownProps } from './TitleBarAction.type';
import { TitleBarActionIcon } from './TitleBarActionIcon';
import { TitleBarTip } from './TitleBarTip';
import './TitleBarDropdown.css';

const TitleBarDropdown = (props: TitleBarDropdownProps) => {
  const { action, away, onOpenChange } = props;
  const [open, setOpen] = useState(false);
  const report = (next: boolean): void => {
    setOpen(next);
    onOpenChange(action.id, next);
  };
  return (
    <TitleBarTip label={action.label} shortcut={action.shortcut} away={away} quiet={open}>
      <Box as="span" {...barItemProps(actionItem(action.id), away, 'window-title-bar__dropdown')}>
        <DropdownMenu
          trigger={{ label: action.label, icon: <TitleBarActionIcon action={action} size={14} />, iconOnly: true }}
          variant="ghost"
          align="auto"
          groups={action.groups}
          onOpenChange={report}
        />
      </Box>
    </TitleBarTip>
  );
};

export { TitleBarDropdown };
