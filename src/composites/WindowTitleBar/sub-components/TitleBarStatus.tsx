/* @layer renderer-components @kind component */
import { useRepeatTick } from '../../../primitives/dom/useRepeatTick';
import { Emphasis } from '../../../primitives/Emphasis';
import { Pressable } from '../../../primitives/Pressable';
import { Status } from '../../../primitives/Status';
import { actionItem } from '../behavior/action-item';
import { barItemProps } from '../behavior/bar-item-props';
import { STATUS_REPEAT_MS, STATUS_STAGGER_MS } from '../WindowTitleBar.constants';
import type { TitleBarCommandProps } from './TitleBarAction.type';

const TitleBarStatus = (props: TitleBarCommandProps) => {
  const { action, away } = props;
  const tick = useRepeatTick(STATUS_REPEAT_MS);
  const pulse = action.pulse === true;
  const disabled = action.disabled === true;
  const className = disabled ? 'window-title-bar__status window-title-bar__status--disabled' : 'window-title-bar__status';
  return (
    <Pressable
      {...barItemProps(actionItem(action.id), away, className)}
      title={disabled ? action.disabledReason ?? action.label : action.label}
      disabled={disabled}
      onClick={action.onSelect}
    >
      <Status tone={action.tone ?? 'info'} dot={pulse} pulse={pulse}>
        <Emphasis trigger="pulse" anchor="center" stagger={STATUS_STAGGER_MS} pulseKey={`${action.status ?? ''} ${tick}`}>{action.status}</Emphasis>
      </Status>
    </Pressable>
  );
};

export { TitleBarStatus };
