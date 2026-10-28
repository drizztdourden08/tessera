/* @layer renderer-components @kind component */
import { useCallback } from 'react';
import type { ColorResult } from 'react-color';
import { Box } from '../../../primitives/Box';
import { useWheelColor } from '../behavior/useWheelColor';
import { PickerWheel } from './PickerWheel';
import type { WheelBlockProps } from './WheelBlock.type';

const WheelBlock = (props: WheelBlockProps) => {
  const { value, onChange, alpha, onAlphaChange, disableAlpha } = props;
  const { seed, beginDrag, followWheel } = useWheelColor(value, alpha, disableAlpha);

  const handleWheelChange = useCallback((c: ColorResult) => {
    followWheel(c.hsl);
    onChange(c.hex);
    if (!disableAlpha && onAlphaChange && c.rgb.a !== undefined) onAlphaChange(c.rgb.a);
  }, [followWheel, onChange, onAlphaChange, disableAlpha]);

  return (
    <Box className="color-picker__wheel" onMouseDownCapture={beginDrag}>
      <PickerWheel color={seed} onChange={handleWheelChange} disableAlpha={disableAlpha} />
    </Box>
  );
};

export { WheelBlock };
