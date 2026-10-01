/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Span } from '../../../primitives/text-elements';
import { ColorSwatch } from '../../../primitives/ColorSwatch';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { ColorMetaProps } from './ColorMeta.type';

const formatWord = (word: number) => word.toString(16).padStart(4, '0').toUpperCase();

const ColorMeta = ({ value, original, word, snapped }: ColorMetaProps) => {
  const { colorPicker } = useTesseraStrings();
  return (
    <Box className="color-picker__meta">
      {word !== undefined && (
        <Span tone="muted" className="color-picker__word">0x{formatWord(word)}</Span>
      )}
      {snapped && <Span tone="warning" className="color-picker__snap">{colorPicker.snapped}</Span>}
      {original && original !== value && (
        <Box className="color-picker__original">
          <ColorSwatch color={original} aria-label={colorPicker.original(original)} disabled />
          <Span tone="muted" className="color-picker__original-hex">{colorPicker.was(original)}</Span>
        </Box>
      )}
    </Box>
  );
};

export { ColorMeta };
