/* @layer renderer-components @kind component */
import { useCallback } from 'react';
import { Box } from '../../../primitives/Box';
import { Text } from '../../../primitives/Text';
import { TextInput } from '../../../primitives/TextInput';
import { ChannelInput } from './ChannelInput';
import { hexToRgb } from '../behavior/color-math';
import { rgbToHex } from '../behavior/rgbToHex';
import type { Channel, ColorFieldsProps } from './ColorFields.type';

const ColorFields = (props: ColorFieldsProps) => {
  const { value, onChange, hexInput, onHexInput, alpha, onAlphaChange, disableAlpha } = props;
  const rgb = hexToRgb(value);

  const commitChannel = useCallback((key: Channel) => (n: number) => {
    onChange(rgbToHex({ ...hexToRgb(value), [key]: n }));
  }, [onChange, value]);

  return (
    <Box className="color-picker__fields">
      <Box className="color-picker__field color-picker__field--hex">
        <Box className="color-picker__hex-box">
          <Text as="span" className="color-picker__hex-sigil" aria-hidden>#</Text>
          <TextInput
            className="color-picker__hex"
            aria-label="Hex"
            value={hexInput}
            maxLength={6}
            spellCheck={false}
            onChange={(e) => onHexInput(e.target.value.replace(/[^0-9a-f]/gi, ''))}
          />
        </Box>
        <Text as="span" className="color-picker__field-label">HEX</Text>
      </Box>

      <ChannelInput label="R" value={rgb.r} max={255} onCommit={commitChannel('r')} />
      <ChannelInput label="G" value={rgb.g} max={255} onCommit={commitChannel('g')} />
      <ChannelInput label="B" value={rgb.b} max={255} onCommit={commitChannel('b')} />
      {!disableAlpha && onAlphaChange && (
        <ChannelInput
          label="A"
          value={Math.round(alpha * 100)}
          max={100}
          onCommit={(n) => onAlphaChange(n / 100)}
        />
      )}
    </Box>
  );
};

export { ColorFields };
