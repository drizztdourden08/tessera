/* @layer renderer-components @kind component */
import CustomPicker from 'react-color/es/components/common/ColorWrap';
import Saturation from 'react-color/es/components/common/Saturation';
import Hue from 'react-color/es/components/common/Hue';
import Alpha from 'react-color/es/components/common/Alpha';
import type { ColorChangeHandler } from 'react-color';
import { Box } from '../../../primitives/Box';
import { IGNORE_CHANGE, RIM } from './PickerWheel.constants';
import './PickerWheel.css';
import type { AlphaProps, HueProps, SaturationProps, WheelProps } from './PickerWheel.type';

const Wheel = (injected: WheelProps) => {
  const { hsl, hsv, rgb, onChange, disableAlpha } = injected;
  const handleChange: ColorChangeHandler = onChange ?? IGNORE_CHANGE;
  const saturationProps: SaturationProps = { hsl, hsv, onChange: handleChange, ...RIM };
  const hueProps: HueProps = { hsl, onChange: handleChange, ...RIM };
  const alphaProps: AlphaProps = { rgb, hsl, onChange: handleChange, ...RIM };

  return (
    <Box className="picker-wheel">
      <Box className="picker-wheel__saturation">
        <Saturation {...saturationProps} />
      </Box>
      <Box className="picker-wheel__hue">
        <Hue {...hueProps} />
      </Box>
      {!disableAlpha && (
        <Box className="picker-wheel__alpha">
          <Alpha {...alphaProps} />
        </Box>
      )}
    </Box>
  );
};

const PickerWheel = CustomPicker<{ disableAlpha?: boolean }>(Wheel);

export { PickerWheel };
