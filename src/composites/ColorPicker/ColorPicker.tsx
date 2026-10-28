/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { ColorSwatch } from '../../primitives/ColorSwatch';
import { FieldControlBoundary } from '../../primitives/FieldControlBoundary';
import { ColorFields } from './sub-components/ColorFields';
import { ColorMeta } from './sub-components/ColorMeta';
import { PickerActions } from './sub-components/PickerActions';
import { PickerBody } from './sub-components/PickerBody';
import { PickerHeader } from './sub-components/PickerHeader';
import { QuickAssign } from './sub-components/QuickAssign';
import { NO_MODES } from './behavior/color-modes.constants';
import { useHexInput } from './behavior/useHexInput';
import './ColorPicker.css';
import type { ColorPickerProps } from './ColorPicker.type';

const ColorPicker = (props: ColorPickerProps) => {
  const { value, onChange, alpha = 1, onAlphaChange, disableAlpha = false, modes = NO_MODES, swatchGroups } = props;
  const { hexInput, commitHex } = useHexInput(value, onChange);
  const panel = { value, onChange, alpha, onAlphaChange, disableAlpha };

  return (
    <FieldControlBoundary>
    <Box className="color-picker">
      <PickerHeader title={props.title} name={props.name} />
      <PickerBody panel={panel} modes={modes} mode={props.mode} onModeChange={props.onModeChange} />

      <Box className="color-picker__hex-row">
        <ColorSwatch color={value} className="color-picker__swatch" disabled />
        <ColorFields
          value={value}
          onChange={onChange}
          hexInput={hexInput}
          onHexInput={commitHex}
          alpha={alpha}
          onAlphaChange={onAlphaChange}
          disableAlpha={disableAlpha}
          hexOnly={modes.length > 0}
        />
      </Box>

      <ColorMeta value={value} original={props.original} word={props.word} snapped={props.snapped ?? false} />
      <QuickAssign value={value} onChange={onChange} swatchGroups={swatchGroups} />
      <PickerActions onReset={props.onReset} onClose={props.onClose} footer={props.footer} />
    </Box>
    </FieldControlBoundary>
  );
};

export { ColorPicker };
