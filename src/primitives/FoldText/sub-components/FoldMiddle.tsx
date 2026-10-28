/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../Box';
import { Tooltip } from '../../Tooltip';
import { useMiddleCut } from '../behavior/useMiddleCut';
import type { FoldMiddleProps } from '../FoldText.type';
import '../../../theme/visually-hidden.css';

const FoldMiddle = (props: FoldMiddleProps) => {
  const { text, hint, hug = false } = props;
  const textRef = useRef<HTMLElement>(null);
  const shown = useMiddleCut(textRef, text);
  return (
    <>
      <Box as="span" className="visually-hidden">{text}</Box>
      <Tooltip content={shown === text ? null : (hint ?? text)} className="fold-text__tip">
        <Box ref={textRef} as="span" className={`fold-text__text fold-text__text--middle${hug ? ' fold-text__text--hug' : ''}`} aria-hidden>
          {hug && <Box as="span" className="fold-text__sizer">{text}</Box>}
          {hug ? <Box as="span" className="fold-text__shown">{shown}</Box> : shown}
        </Box>
      </Tooltip>
    </>
  );
};

export { FoldMiddle };
