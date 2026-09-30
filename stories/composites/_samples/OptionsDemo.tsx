/* @layer stories @kind component */
import { useRef, useState } from 'react';
import { OptionRow, WidgetOptions } from '../../../src/composites';
import type { DockEdge, PinMode, WidgetPlacement, WidgetVisibility } from '../../../src/composites';
import { Box, Glyph, IconButton, Text, Toggle } from '../../../src/primitives';

type OptionsDemoProps = {
  title: string;
  placement: WidgetPlacement;
  canPopOut: boolean;
  makeRoomHint: string;
  contextLabel: string;
  ownRows: boolean;
};

const OptionsDemo = (props: OptionsDemoProps) => {
  const { title, placement: startPlacement, canPopOut, makeRoomHint, contextLabel, ownRows } = props;
  const anchorRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<WidgetPlacement>(startPlacement);
  const [edge, setEdge] = useState<DockEdge>('right');
  const [makeRoom, setMakeRoom] = useState(true);
  const [opacity, setOpacity] = useState(0.92);
  const [show, setShow] = useState<WidgetVisibility>('context-only');
  const [pin, setPin] = useState<PinMode>('off');
  const [snap, setSnap] = useState(true);
  const [compact, setCompact] = useState(false);

  return (
    <Box className="options-story">
      <Text className="story-label">{`${title}: ${placement}${placement === 'docked' ? ` on the ${edge}` : ''}`}</Text>
      <Box as="span" ref={anchorRef} className="options-story__anchor">
        <IconButton label="Options" title="Options" active={open} onClick={() => setOpen((v) => !v)}>
          <Glyph name="gear" size={14} />
        </IconButton>
      </Box>
      {open && (
        <WidgetOptions
          title={title}
          placement={placement}
          dockEdge={edge}
          makeRoom={makeRoom}
          opacity={opacity}
          show={show}
          anchorRef={anchorRef}
          onDock={(next) => { setPlacement('docked'); setEdge(next); }}
          onFloat={() => setPlacement('floating')}
          onPopOut={() => setPlacement(placement === 'popped' ? 'docked' : 'popped')}
          canPopOut={canPopOut}
          pin={pin}
          onPinChange={setPin}
          snap={snap}
          onSnapChange={setSnap}
          onMakeRoomChange={setMakeRoom}
          onOpacityChange={setOpacity}
          onShowChange={setShow}
          onReset={() => { setOpacity(0.92); setMakeRoom(true); setShow('context-only'); }}
          onClose={() => setOpen(false)}
          makeRoomHint={makeRoomHint}
          contextLabel={contextLabel}
        >
          {ownRows && (
            <OptionRow label="Compact rows" hint="One line per player">
              <Toggle checked={compact} onChange={setCompact} />
            </OptionRow>
          )}
        </WidgetOptions>
      )}
    </Box>
  );
};

export { OptionsDemo };
export type { OptionsDemoProps };
