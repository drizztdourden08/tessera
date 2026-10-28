/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Slider } from '../../../primitives/Slider';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { hexToRgb } from '../behavior/color-math';
import type { Rgb } from '../behavior/color-math.type';
import { rgbToHex } from '../behavior/rgb-to-hex';
import { AlphaSlider } from './AlphaSlider';
import type { ModePanelProps } from './ModePanel.type';

const RgbPanel = (props: ModePanelProps) => {
  const { value, onChange } = props;
  const { colorPicker } = useTesseraStrings();
  const rgb = hexToRgb(value);
  const channels: readonly [keyof Rgb, string][] = [['r', colorPicker.red], ['g', colorPicker.green], ['b', colorPicker.blue]];

  return (
    <Box className="color-picker__sliders">
      {channels.map(([key, label]) => (
        <Slider
          key={key}
          label={label}
          min={0}
          max={255}
          step={1}
          input
          value={rgb[key]}
          onChange={(n) => onChange(rgbToHex({ ...rgb, [key]: n }))}
        />
      ))}
      <AlphaSlider alpha={props.alpha} onAlphaChange={props.onAlphaChange} disableAlpha={props.disableAlpha} />
    </Box>
  );
};

export { RgbPanel };
