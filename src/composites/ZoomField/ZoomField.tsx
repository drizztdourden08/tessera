/* @layer renderer-components @kind component */
import { Flex } from '../../primitives/Flex';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { NumberField } from '../NumberField';
import { zoomLadder } from './behavior/zoom-ladder';
import { zoomPresets } from './behavior/zoom-presets';
import { ZoomPresets } from './sub-components/ZoomPresets';
import { ZoomSlider } from './sub-components/ZoomSlider';
import { ZOOM_SUFFIX } from './ZoomField.constants';
import type { ZoomFieldProps } from './ZoomField.type';
import './ZoomField.css';

const ZoomField = (props: ZoomFieldProps) => {
  const { value, onChange, min, max, label, presets, slider, actions, disabled, className } = props;
  const { zoomField } = useTesseraStrings();
  const chips = zoomPresets(presets, min, max);
  const ladder = zoomLadder(presets, min, max);

  return (
    <Flex gap="xs" align="center" wrap className={className}>
      <NumberField
        label={label ?? zoomField.label}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        ladder={ladder}
        suffix={ZOOM_SUFFIX}
        buttons="sides"
        stepLabels={[zoomField.zoomOut, zoomField.zoomIn]}
        disabled={disabled}
      />
      {chips.length > 0 && <ZoomPresets presets={chips} value={value} label={zoomField.presets} disabled={disabled} onPick={onChange} />}
      {slider && min > 0 && (
        <ZoomSlider value={value} min={min} max={max} ladder={ladder} label={zoomField.slider} placement={slider} disabled={disabled} onChange={onChange} />
      )}
      {actions}
    </Flex>
  );
};

export { ZoomField };
