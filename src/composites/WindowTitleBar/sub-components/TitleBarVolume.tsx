/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { VolumeControl } from '../../VolumeControl';
import { actionItem } from '../behavior/action-item';
import { barItemProps } from '../behavior/bar-item-props';
import type { TitleBarVolumeProps } from './TitleBarAction.type';

const TitleBarVolume = (props: TitleBarVolumeProps) => {
  const { action, away } = props;
  const { value, muted, onChange, onMutedChange, min, max, step } = action;
  return (
    <Box as="span" {...barItemProps(actionItem(action.id), away, 'window-title-bar__volume')}>
      <VolumeControl slider="popover" value={value} muted={muted} onChange={onChange} onMutedChange={onMutedChange} min={min} max={max} step={step} />
    </Box>
  );
};

export { TitleBarVolume };
