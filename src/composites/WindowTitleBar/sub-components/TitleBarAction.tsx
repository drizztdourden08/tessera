/* @layer renderer-components @kind component */
import { Emphasis } from '../../../primitives/Emphasis';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { Pressable } from '../../../primitives/Pressable';
import { Status } from '../../../primitives/Status';
import { actionBar } from '../behavior/action-bar';
import { actionItem } from '../behavior/action-item';
import { barItemProps } from '../behavior/bar-item-props';
import { STATUS_STAGGER_MS } from '../WindowTitleBar.constants';
import type { TitleBarActionProps } from './TitleBarAction.type';

const TitleBarAction = (props: TitleBarActionProps) => {
  const { action, away } = props;
  const bar = actionBar(action);
  if (bar === null) return null;
  const item = actionItem(action.id);

  if (bar === 'status') {
    return (
      <Pressable {...barItemProps(item, away, 'window-title-bar__status')} title={action.label} onClick={action.onSelect}>
        <Status tone={action.tone ?? 'info'}>
          <Emphasis trigger="pulse" anchor="center" stagger={STATUS_STAGGER_MS} pulseKey={action.status}>{action.status}</Emphasis>
        </Status>
      </Pressable>
    );
  }
  return (
    <IconButton {...barItemProps(item, away)} size="sm" tone={action.tone === 'danger' ? 'danger' : undefined} label={action.label} onClick={action.onSelect}>
      <Icon name={action.icon} size={14} />
    </IconButton>
  );
};

export { TitleBarAction };
