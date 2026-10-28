/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Slider } from '../../../primitives/Slider';
import { Span } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { hexToOklch } from '../behavior/hex-to-oklch';
import { CHROMA_LIMIT } from '../behavior/oklch.constants';
import { oklchInGamut } from '../behavior/oklch-in-gamut';
import { oklchToHex } from '../behavior/oklch-to-hex';
import { useModelEdit } from '../behavior/useModelEdit';
import { AlphaSlider } from './AlphaSlider';
import type { ModePanelProps } from './ModePanel.type';
import { LIGHTNESS_SCALE } from './OklchPanel.constants';

const OklchPanel = (props: ModePanelProps) => {
  const { value, onChange } = props;
  const { colorPicker } = useTesseraStrings();
  const { model, edit } = useModelEdit({ value, onChange, toModel: hexToOklch, toHex: oklchToHex });

  return (
    <Box className="color-picker__sliders">
      <Slider
        label={colorPicker.lightness}
        min={0}
        max={LIGHTNESS_SCALE}
        step={0.1}
        input
        value={Math.round(model.l * LIGHTNESS_SCALE * 10) / 10}
        onChange={(n) => edit({ l: n / LIGHTNESS_SCALE })}
      />
      <Slider
        label={colorPicker.chroma}
        min={0}
        max={CHROMA_LIMIT}
        step={0.001}
        input
        value={Math.round(model.c * 1000) / 1000}
        onChange={(c) => edit({ c })}
      />
      <Slider
        label={colorPicker.hue}
        min={0}
        max={360}
        step={1}
        input
        value={Math.round(model.h)}
        onChange={(h) => edit({ h })}
      />
      <AlphaSlider alpha={props.alpha} onAlphaChange={props.onAlphaChange} disableAlpha={props.disableAlpha} />
      {!oklchInGamut(model) && (
        <Span tone="warning" role="status" className="color-picker__gamut">{colorPicker.outOfGamut}</Span>
      )}
    </Box>
  );
};

export { OklchPanel };
