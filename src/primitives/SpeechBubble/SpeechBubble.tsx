/* @layer renderer-components @kind component */
import { forwardRef } from 'react';
import { Box } from '../Box';
import type { SpeechBubbleProps } from './SpeechBubble.type';
import { speechBubbleClass } from './behavior/speech-bubble-class';
import { speechBubbleStyle } from './behavior/speech-bubble-style';
import './SpeechBubble.css';

const SpeechBubble = forwardRef<HTMLElement, SpeechBubbleProps>((props, ref) => {
  const { tone, pointer = 'none', pointerOffset, maxWidth, className, style, children, ...rest } = props;
  return (
    <Box
      ref={ref}
      {...rest}
      className={speechBubbleClass(tone, pointer, className)}
      style={speechBubbleStyle(style, pointerOffset, maxWidth)}
    >
      {children}
    </Box>
  );
});

export { SpeechBubble };
