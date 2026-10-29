/* @layer renderer-components @kind component */
import { useId, useRef, useState } from 'react';
import { Box } from '../../Box';
import { HelpTip } from '../../field-control/HelpTip';
import { Pressable } from '../../Pressable';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import { measures } from '../behavior/fold-measures';
import { foldState } from '../behavior/fold-state';
import { useClamped } from '../behavior/useClamped';
import type { FoldLinesProps } from '../FoldText.type';

const FoldLines = (props: FoldLinesProps) => {
  const { lines, overflow = 'more', hint, children } = props;
  const { settings } = useTesseraStrings();
  const textRef = useRef<HTMLElement>(null);
  const id = useId();
  const [open, setOpen] = useState(false);
  const clamped = useClamped(textRef, measures(lines, overflow, open));
  const { clamp, more, hint: hinted } = foldState(lines, overflow, open, clamped);

  return (
    <>
      <Box className="fold-text__body">
        <Box ref={textRef} id={id} className="fold-text__text" data-folded={clamp !== undefined || undefined} style={clamp !== undefined ? { WebkitLineClamp: clamp } : undefined}>
          {children}
        </Box>
        {hinted && <HelpTip help={hint ?? children} />}
      </Box>
      {more && (
        <Pressable className="fold-text__more" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
          {open ? settings.showLess : settings.showMore}
        </Pressable>
      )}
    </>
  );
};

export { FoldLines };
