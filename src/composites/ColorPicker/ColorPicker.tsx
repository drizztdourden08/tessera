/* @layer renderer-components @kind component */
import { useCallback } from 'react';
import { Box } from '../../primitives/Box';
import { Text } from '../../primitives/Text';
import { Button } from '../../primitives/Button';
import { ColorSwatch } from '../../primitives/ColorSwatch';
import { FieldControlBoundary } from '../../primitives/FieldControlBoundary';
import { PickerWheel } from './sub-components/PickerWheel';
import { ColorFields } from './sub-components/ColorFields';
import { ColorMeta } from './sub-components/ColorMeta';
import { QuickAssign } from './sub-components/QuickAssign';
import { useWheelColor } from './behavior/useWheelColor';
import { useHexInput } from './behavior/useHexInput';
import './ColorPicker.css';
import type { ColorResult } from 'react-color';
import type { ColorPickerProps } from './ColorPicker.type';

const ColorPicker = (props: ColorPickerProps) => {
  const {
    value, onChange, alpha = 1, onAlphaChange, disableAlpha = false,
    title, original, word, snapped = false, onReset, onClose, swatchGroups,
  } = props;

  const { seed, beginDrag, followWheel } = useWheelColor(value, alpha, disableAlpha);
  const { hexInput, commitHex } = useHexInput(value, onChange);

  const handleWheelChange = useCallback((c: ColorResult) => {
    followWheel(c.hsl);
    onChange(c.hex);
    if (!disableAlpha && onAlphaChange && c.rgb.a !== undefined) onAlphaChange(c.rgb.a);
  }, [followWheel, onChange, onAlphaChange, disableAlpha]);

  return (
    <FieldControlBoundary>
    <Box className="color-picker">
      {title && <Text className="color-picker__title">{title}</Text>}

      <Box className="color-picker__wheel" onMouseDownCapture={beginDrag}>
        <PickerWheel color={seed} onChange={handleWheelChange} disableAlpha={disableAlpha} />
      </Box>

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
        />
      </Box>

      <ColorMeta value={value} original={original} word={word} snapped={snapped} />
      <QuickAssign value={value} onChange={onChange} swatchGroups={swatchGroups} />

      <Box className="color-picker__actions">
        {onReset && <Button variant="secondary" size="sm" onClick={onReset}>Reset</Button>}
        {onClose && <Button variant="primary" size="sm" onClick={onClose}>Done</Button>}
      </Box>
    </Box>
    </FieldControlBoundary>
  );
};

export { ColorPicker };
