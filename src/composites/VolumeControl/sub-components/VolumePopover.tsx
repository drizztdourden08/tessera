/* @layer renderer-components @kind component */
import { useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { Anchored } from '../../../primitives/Anchored';
import { Box } from '../../../primitives/Box';
import { Slider } from '../../../primitives/Slider';
import { useTooltipOpen } from '../../../primitives/Tooltip/behavior/useTooltipOpen';
import { nudgeVolume } from '../behavior/nudge-volume';
import { useFocusBack } from '../behavior/useFocusBack';
import { useVolumeWheel } from '../behavior/useVolumeWheel';
import { VOLUME_KEY_DIRECTIONS } from '../VolumeControl.constants';
import { VolumeMuteButton } from './VolumeMuteButton';
import type { VolumePopoverProps } from './VolumePopover.type';

const VolumePopover = (props: VolumePopoverProps) => {
  const { button, slider, orientation, range } = props;
  const anchorRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const active = !button.disabled;
  const { open, handlers } = useTooltipOpen(anchorRef, panelRef, active);
  const onNudge = (direction: 1 | -1) => slider.onChange(nudgeVolume(slider.value, direction, range));
  useVolumeWheel({ anchorRef, panelRef, onNudge, active, open });
  const focusWatch = useFocusBack(open, buttonRef);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const direction = VOLUME_KEY_DIRECTIONS[event.key];
    if (direction === undefined) return;
    event.preventDefault();
    onNudge(direction);
  };

  return (
    <Box as="span" ref={anchorRef} className="volume-control__popover" {...handlers}>
      <VolumeMuteButton {...button} ref={buttonRef} onKeyDown={onKeyDown} />
      {open && (
        <Anchored
          ref={panelRef}
          anchorRef={anchorRef}
          placement="bottom-center"
          className="volume-control__panel"
          data-orientation={orientation}
          data-app-region="no-drag"
          {...focusWatch}
        >
          <Box className="volume-control__panel-body">
            <Slider {...slider} orientation={orientation} size="sm" showValue />
          </Box>
        </Anchored>
      )}
    </Box>
  );
};

export { VolumePopover };
