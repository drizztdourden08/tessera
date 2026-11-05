/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../Box';
import { useLeavingLayer } from './behavior/useLeavingLayer';
import type { ContentSwapProps } from './ContentSwap.type';
import './ContentSwap.css';
import './ContentSwapReflow.css';

const ContentSwap = (props: ContentSwapProps) => {
  const { swapKey, children, effect = 'fade', direction = 'forward', className } = props;
  const root = useRef<HTMLElement>(null);
  const [leaving, finish] = useLeavingLayer(swapKey, children, root);

  return (
    <Box ref={root} className={className ? `content-swap ${className}` : 'content-swap'} data-effect={effect} data-direction={direction}>
      {leaving && (
        <Box key={`out-${leaving.key}`} className="content-swap__layer" data-phase="out" aria-hidden="true" onAnimationEnd={(event) => event.target === event.currentTarget && finish()}>
          {leaving.node}
        </Box>
      )}
      <Box key={swapKey} className="content-swap__layer" data-phase={leaving ? 'in' : 'rest'}>
        {children}
      </Box>
    </Box>
  );
};

export { ContentSwap };
