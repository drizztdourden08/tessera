/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../Box';
import { useLeavingLayer } from './behavior/useLeavingLayer';
import type { ContentSwapProps } from './ContentSwap.type';
import './ContentSwap.css';
import '../../theme/content-swap-reflow.css';
import '../../theme/content-swap-out-in.css';

const ContentSwap = (props: ContentSwapProps) => {
  const { swapKey, children, effect = 'fade', direction = 'forward', sequence = 'overlap', className } = props;
  const root = useRef<HTMLElement>(null);
  const { leaving, entering, finish } = useLeavingLayer(swapKey, children, root, sequence);
  const holdsEntering = leaving !== null && sequence === 'out-in';
  const settled = leaving || entering ? 'in' : 'rest';

  return (
    <Box ref={root} className={className ? `content-swap ${className}` : 'content-swap'} data-effect={effect} data-direction={direction} data-sequence={sequence}>
      {leaving && (
        <Box key={`out-${leaving.key}`} className="content-swap__layer" data-phase="out" aria-hidden="true" onAnimationEnd={(event) => event.target === event.currentTarget && finish()}>
          {leaving.node}
        </Box>
      )}
      {!holdsEntering && (
        <Box key={swapKey} className="content-swap__layer" data-phase={settled}>
          {children}
        </Box>
      )}
    </Box>
  );
};

export { ContentSwap };
