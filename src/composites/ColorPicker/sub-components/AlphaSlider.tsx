/* @layer renderer-components @kind component */
import { Slider } from '../../../primitives/Slider';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { ModePanelProps } from './ModePanel.type';

const AlphaSlider = ({ alpha, onAlphaChange, disableAlpha }: Pick<ModePanelProps, 'alpha' | 'onAlphaChange' | 'disableAlpha'>) => {
  const { colorPicker } = useTesseraStrings();
  if (disableAlpha || !onAlphaChange) return null;
  return (
    <Slider
      label={colorPicker.alpha}
      min={0}
      max={100}
      step={1}
      input
      value={Math.round(alpha * 100)}
      onChange={(n) => onAlphaChange(n / 100)}
    />
  );
};

export { AlphaSlider };
