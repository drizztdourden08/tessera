/* @layer stories @kind component */
import { useRef, useState } from 'react';
import { OptionRow, WidgetOptions } from '../../../src/composites';
import type { WidgetPlacement } from '../../../src/composites';
import { Box, Glyph, IconButton, Text, Toggle } from '../../../src/primitives';
import { useWidgetOptionsDemo } from './useWidgetOptionsDemo';

type OptionsDemoProps = {
  title: string;
  placement: WidgetPlacement;
  canPopOut: boolean;
  makeRoomHint: string;
  contextLabel: string;
  ownRows: boolean;
};

const COMPACT_HINT = { label: 'Compact rows', description: 'One line per player, no avatars' };

const OptionsDemo = (props: OptionsDemoProps) => {
  const { title, placement, canPopOut, makeRoomHint, contextLabel, ownRows } = props;
  const anchorRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const { panel, summary } = useWidgetOptionsDemo(placement);

  return (
    <Box className="options-story">
      <Box as="span" ref={anchorRef} className="options-story__anchor">
        <IconButton label="Options" title="Options" active={open} onClick={() => setOpen((v) => !v)}>
          <Glyph name="gear" size={14} />
        </IconButton>
      </Box>
      <Text className="story-label options-story__summary">{`${title}: ${summary}${ownRows ? ` · compact ${compact ? 'on' : 'off'}` : ''}`}</Text>
      {open && (
        <WidgetOptions
          {...panel}
          title={title}
          canPopOut={canPopOut}
          anchorRef={anchorRef}
          onClose={() => setOpen(false)}
          makeRoomHint={makeRoomHint}
          contextLabel={contextLabel}
        >
          {ownRows && (
            <OptionRow label="Rows">
              <Toggle size="sm" checked={compact} onChange={setCompact} hint={COMPACT_HINT} />
            </OptionRow>
          )}
        </WidgetOptions>
      )}
    </Box>
  );
};

export { OptionsDemo };
export type { OptionsDemoProps };
