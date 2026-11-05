/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { SIGNAL_KEY_ATTRIBUTE } from './SignalStrip.constants';
import type { SignalStripProps } from './SignalStrip.type';
import { chipKey } from './behavior/chip-key';
import { useSignalFit } from './behavior/useSignalFit';
import { SignalChip } from './sub-components/SignalChip';
import { SignalMore } from './sub-components/SignalMore';
import './SignalStrip.css';

const SignalStrip = (props: SignalStripProps) => {
  const { items: given, max, iconOnly = false, wrap = false, className, 'aria-label': label } = props;
  const items = given.map((item) => ({ ...item, iconOnly: item.iconOnly ?? iconOnly }));
  const rowRef = useRef<HTMLElement>(null);
  const fit = useSignalFit(rowRef, items, max);
  const shown = wrap ? items.length : fit;
  if (items.length === 0) return null;
  const hidden = items.slice(shown);
  const classes = ['signal-strip', wrap && 'signal-strip--wrap', className].filter(Boolean).join(' ');

  return (
    <Box ref={rowRef} role={label === undefined ? undefined : 'group'} aria-label={label} className={classes}>
      {items.slice(0, shown).map((item) => (
        <Box key={item.id} className="signal-strip__item" {...{ [SIGNAL_KEY_ATTRIBUTE]: chipKey(item) }}>
          <SignalChip item={item} />
        </Box>
      ))}
      {hidden.length > 0 && <SignalMore hidden={hidden} />}
    </Box>
  );
};

export { SignalStrip };
