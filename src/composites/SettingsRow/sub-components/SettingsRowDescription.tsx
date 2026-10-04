/* @layer renderer-components @kind component */
import { useId, useRef, useState } from 'react';
import { Box } from '../../../primitives/Box';
import { Pressable } from '../../../primitives/Pressable';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Small } from '../../../primitives/text-elements';
import { useClamped } from '../behavior/useClamped';
import type { SettingsRowDescriptionProps } from './SettingsRowDescription.type';

const SettingsRowDescription = (props: SettingsRowDescriptionProps) => {
  const { text, lines } = props;
  const { settings } = useTesseraStrings();
  const textRef = useRef<HTMLElement>(null);
  const id = useId();
  const [open, setOpen] = useState(false);
  const folds = lines !== undefined && lines > 0;
  const clamped = useClamped(textRef, folds && !open);
  const style = folds && !open ? { WebkitLineClamp: lines } : undefined;

  return (
    <Box className="settings-row__about-text">
      <Small ref={textRef} id={id} tone="dim" className="settings-row__description" data-folded={style ? true : undefined} style={style}>
        {text}
      </Small>
      {folds && (open || clamped) && (
        <Pressable className="settings-row__more" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
          {open ? settings.showLess : settings.showMore}
        </Pressable>
      )}
    </Box>
  );
};

export { SettingsRowDescription };
