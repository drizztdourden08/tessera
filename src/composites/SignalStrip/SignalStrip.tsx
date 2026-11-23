/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { TickerText } from '../../primitives/TickerText';
import type { SignalStripProps } from './SignalStrip.type';
import { signalStripClass } from './behavior/signal-strip-class';
import { useSignalFit } from './behavior/useSignalFit';
import { SignalRun } from './sub-components/SignalRun';
import { SignalMore } from './sub-components/SignalMore';
import './SignalStrip.css';

const SignalStrip = (props: SignalStripProps) => {
  const { items: given, max, iconOnly, overflow, className, 'aria-label': label } = props;
  const wrap = props.wrap === true;
  const items = given.map((item) => ({ ...item, iconOnly: item.iconOnly ?? iconOnly === true }));
  const rowRef = useRef<HTMLElement>(null);
  const fit = useSignalFit(rowRef, items, max);
  const scroll = overflow === 'scroll' && !wrap;
  const shown = wrap || scroll ? items.length : fit;
  if (items.length === 0) return null;
  const hidden = items.slice(shown);
  const chips = <SignalRun items={items.slice(0, shown)} />;

  return (
    <Box ref={rowRef} role={label === undefined ? undefined : 'group'} aria-label={label} className={signalStripClass(wrap, scroll, className)}>
      {scroll ? <TickerText>{chips}</TickerText> : chips}
      {hidden.length > 0 && <SignalMore hidden={hidden} />}
    </Box>
  );
};

export { SignalStrip };
