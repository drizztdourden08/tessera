/* @layer renderer-components @kind component */
import { actionBar } from '../behavior/action-bar';
import type { TitleBarActionProps } from './TitleBarAction.type';
import { TitleBarCommand } from './TitleBarCommand';
import { TitleBarDropdown } from './TitleBarDropdown';
import { TitleBarStatus } from './TitleBarStatus';
import { TitleBarVolume } from './TitleBarVolume';

const TitleBarAction = (props: TitleBarActionProps) => {
  const { action, away, onMenuOpenChange } = props;
  const bar = actionBar(action);
  if (bar === null) return null;
  if (action.bar === 'dropdown') return <TitleBarDropdown action={action} away={away} onOpenChange={onMenuOpenChange} />;
  if (action.bar === 'volume') return <TitleBarVolume action={action} away={away} />;
  if (bar === 'status') return <TitleBarStatus action={action} away={away} />;
  return <TitleBarCommand action={action} away={away} />;
};

export { TitleBarAction };
