/* @layer renderer-components @kind component */
import { Emphasis } from '../../../primitives/Emphasis';
import { Pressable } from '../../../primitives/Pressable';
import { Status } from '../../../primitives/Status';
import { actionItem } from '../behavior/action-item';
import { barItemProps } from '../behavior/bar-item-props';
import { useRepeatTick } from '../behavior/useRepeatTick';
import { STATUS_REPEAT_MS, STATUS_STAGGER_MS } from '../WindowTitleBar.constants';
import type { TitleBarActionProps } from './TitleBarAction.type';

const TitleBarStatus = (props: TitleBarActionProps) => {
  const { action, away } = props;
  const tick = useRepeatTick(STATUS_REPEAT_MS);
  return (
    <Pressable {...barItemProps(actionItem(action.id), away, 'window-title-bar__status')} title={action.label} onClick={action.onSelect}>
      <Status tone={action.tone ?? 'info'}>
        <Emphasis trigger="pulse" anchor="center" stagger={STATUS_STAGGER_MS} pulseKey={`${action.status ?? ''} ${tick}`}>{action.status}</Emphasis>
      </Status>
    </Pressable>
  );
};

export { TitleBarStatus };
