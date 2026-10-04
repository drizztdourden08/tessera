/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { actionBar } from '../behavior/action-bar';
import { actionItem } from '../behavior/action-item';
import { barItemProps } from '../behavior/bar-item-props';
import type { TitleBarActionProps } from './TitleBarAction.type';
import { TitleBarStatus } from './TitleBarStatus';

const TitleBarAction = (props: TitleBarActionProps) => {
  const { action, away } = props;
  const bar = actionBar(action);
  if (bar === null) return null;
  if (bar === 'status') return <TitleBarStatus action={action} away={away} />;
  const item = actionItem(action.id);
  return (
    <IconButton {...barItemProps(item, away)} size="sm" tone={action.tone === 'danger' ? 'danger' : undefined} label={action.label} onClick={action.onSelect}>
      <Icon name={action.icon} size={14} />
    </IconButton>
  );
};

export { TitleBarAction };
