/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../Box';
import { tickerClass } from './behavior/ticker-class';
import { useTickerOverflow } from './behavior/useTickerOverflow';
import type { TickerTextProps } from './TickerText.type';
import './TickerText.css';

const TickerText = ({ title, className, children }: TickerTextProps) => {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLElement>(null);
  const overflowing = useTickerOverflow(rootRef, trackRef);
  const full = title ?? (typeof children === 'string' ? children : undefined);

  return (
    <Box ref={rootRef} className={tickerClass(overflowing, className)} title={overflowing ? full : undefined}>
      <Box ref={trackRef} className="ticker-text__track">{children}</Box>
    </Box>
  );
};

export { TickerText };
