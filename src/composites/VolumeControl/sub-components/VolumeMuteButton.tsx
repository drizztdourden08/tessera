/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { VolumeMuteButtonProps } from './VolumeMuteButton.type';

const VolumeMuteButton = (props: VolumeMuteButtonProps) => {
  const { muted, icon, size, disabled, onToggle, onHint } = props;
  const { common } = useTesseraStrings();
  const compact = size === 'sm';
  const label = muted ? common.unmute : common.mute;

  return (
    <IconButton
      size={compact ? 'xs' : 'sm'}
      variant="ghost"
      tone={muted ? 'danger' : undefined}
      active={muted}
      label={label}
      hint={{ label, description: muted ? common.unmuteHint : common.muteHint }}
      onHint={onHint}
      disabled={disabled}
      onClick={onToggle}
    >
      <Icon name={icon} size={compact ? 14 : 16} />
    </IconButton>
  );
};

export { VolumeMuteButton };
