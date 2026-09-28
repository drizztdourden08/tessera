/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Text } from '../../../primitives/Text';
import { ColorSwatch } from '../../../primitives/ColorSwatch';
import type { ColorMetaProps } from './ColorMeta.type';

const formatWord = (word: number) => word.toString(16).padStart(4, '0').toUpperCase();

const ColorMeta = ({ value, original, word, snapped }: ColorMetaProps) => (
  <Box className="color-picker__meta">
    {word !== undefined && (
      <Text className="color-picker__word">0x{formatWord(word)}</Text>
    )}
    {snapped && <Text className="color-picker__snap">snapped</Text>}
    {original && original !== value && (
      <Box className="color-picker__original">
        <ColorSwatch color={original} aria-label={`Original ${original}`} disabled />
        <Text className="color-picker__original-hex">was {original}</Text>
      </Box>
    )}
  </Box>
);

export { ColorMeta };
