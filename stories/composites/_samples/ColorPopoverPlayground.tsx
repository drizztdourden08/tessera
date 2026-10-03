/* @layer stories @kind component */
import { useRef, useState } from 'react';
import { ColorPickerPopover } from '../../../src/composites/ColorPickerPopover';
import { Box, ColorSwatch, Text } from '../../../src/primitives';
import { SWATCH_GROUPS } from './data-colors';

type ColorPopoverPlaygroundProps = {
  title: string;
  start: string;
  disableAlpha: boolean;
  showOriginal: boolean;
  showSwatches: boolean;
  startOpen: boolean;
};

const ColorPopoverPlayground = (props: ColorPopoverPlaygroundProps) => {
  const { title, start, disableAlpha, showOriginal, showSwatches, startOpen } = props;
  const anchorRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(startOpen);
  const [color, setColor] = useState(start);
  const [alpha, setAlpha] = useState(1);
  const reading = disableAlpha ? color : `${color} at ${Math.round(alpha * 100)}%`;

  return (
    <Box className="story-row">
      <Box ref={anchorRef} as="span">
        <ColorSwatch color={color} selected={open} edited={color !== start} aria-label={`Edit ${title}`} onClick={() => setOpen(!open)} />
      </Box>
      <Text className="story-label">{`${title}: ${reading}${open ? '' : ', press the swatch to open the picker'}`}</Text>
      <ColorPickerPopover
        open={open}
        anchorRef={anchorRef}
        onClose={() => setOpen(false)}
        title={title}
        value={color}
        onChange={setColor}
        alpha={alpha}
        onAlphaChange={setAlpha}
        disableAlpha={disableAlpha}
        original={showOriginal ? start : undefined}
        onReset={showOriginal ? () => { setColor(start); setAlpha(1); } : undefined}
        swatchGroups={showSwatches ? SWATCH_GROUPS : undefined}
      />
    </Box>
  );
};

export { ColorPopoverPlayground };
export type { ColorPopoverPlaygroundProps };
