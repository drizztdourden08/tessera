/* @layer renderer-components @kind component */
import { useId, useRef, useState } from 'react';
import { Box } from '../Box';
import { Pressable } from '../Pressable';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import type { FoldTextProps } from './fold-text.type';
import { useClamped } from './useClamped';
import './FoldText.css';

const FoldText = (props: FoldTextProps) => {
  const { lines, className, children } = props;
  const { settings } = useTesseraStrings();
  const textRef = useRef<HTMLElement>(null);
  const id = useId();
  const [open, setOpen] = useState(false);
  const folds = lines !== undefined && lines > 0;
  const folded = folds && !open;
  const clamped = useClamped(textRef, folded);

  return (
    <Box className={['fold-text', className].filter(Boolean).join(' ')}>
      <Box ref={textRef} id={id} className="fold-text__text" data-folded={folded || undefined} style={folded ? { WebkitLineClamp: lines } : undefined}>
        {children}
      </Box>
      {folds && (open || clamped) && (
        <Pressable className="fold-text__more" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
          {open ? settings.showLess : settings.showMore}
        </Pressable>
      )}
    </Box>
  );
};

export { FoldText };
