/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { hexToHsv } from '../behavior/hex-to-hsv';
import { hsvToHex } from '../behavior/hsv-to-hex';
import { useModelEdit } from '../behavior/useModelEdit';
import { ChannelInput } from './ChannelInput';
import type { ModePanelProps } from './ModePanel.type';
import { WheelBlock } from './WheelBlock';

const HsvPanel = (props: ModePanelProps) => {
  const { value, onChange, alpha, onAlphaChange, disableAlpha } = props;
  const { colorPicker } = useTesseraStrings();
  const { model, edit } = useModelEdit({ value, onChange, toModel: hexToHsv, toHex: hsvToHex });

  return (
    <>
      <WheelBlock value={value} onChange={onChange} alpha={alpha} onAlphaChange={onAlphaChange} disableAlpha={disableAlpha} />
      <Box className="color-picker__fields">
        <ChannelInput label="H" title={colorPicker.hue} value={model.h} max={360} onCommit={(h) => edit({ h })} />
        <ChannelInput label="S" title={colorPicker.saturation} value={model.s} max={100} onCommit={(s) => edit({ s })} />
        <ChannelInput label="V" title={colorPicker.value} value={model.v} max={100} onCommit={(v) => edit({ v })} />
      </Box>
    </>
  );
};

export { HsvPanel };
