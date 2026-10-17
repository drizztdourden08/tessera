/* @layer renderer-components @kind component */
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { VolumeIcon } from '../../../primitives/VolumeIcon';
import type { VolumeMuteButtonProps } from './VolumeMuteButton.type';

const VolumeMuteButton = (props: VolumeMuteButtonProps) => {
  const { muted, level, size, disabled, onToggle, onHint, onKeyDown, ref } = props;
  const { common } = useTesseraStrings();
  const compact = size === 'sm';
  const label = muted ? common.unmute : common.mute;

  return (
    <IconButton
      ref={ref}
      size={compact ? 'xs' : 'sm'}
      variant="ghost"
      label={label}
      hint={{ label, description: muted ? common.unmuteHint : common.muteHint }}
      onHint={onHint}
      disabled={disabled}
      onClick={onToggle}
      onKeyDown={onKeyDown}
    >
      <VolumeIcon level={level} muted={muted} size={compact ? 12 : 14} />
    </IconButton>
  );
};

export { VolumeMuteButton };
