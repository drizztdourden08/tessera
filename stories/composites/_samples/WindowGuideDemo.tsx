/* @layer stories @kind component */
import { useEffect, useState } from 'react';
import { useDockKeys, Widget, WindowGuideOverlay } from '../../../src/composites';
import type { WindowGuideHint, WindowGuideMode, WindowGuidePointer } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { PlayersPanel } from './data-widget-panels';

type WindowGuideDemoProps = {
  open: boolean;
  mode: WindowGuideMode;
  snapping: boolean;
  hostHints: boolean;
  defaultHints: boolean;
  followPointer: boolean;
};

const HOST_HINTS: readonly WindowGuideHint[] = [
  { keys: ['shift'], label: 'Keep the size while moving' },
  { keys: ['alt'], label: 'Show the snap lines' },
];

const START_POINTER: WindowGuidePointer = { x: 240, y: 160 };

const noop = () => undefined;

const usePointer = (on: boolean): WindowGuidePointer | null => {
  const [pointer, setPointer] = useState(START_POINTER);
  useEffect(() => {
    if (!on) return undefined;
    const move = (event: PointerEvent) => setPointer({ x: event.clientX, y: event.clientY });
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [on]);
  return on ? pointer : null;
};

const WindowGuideDemo = (props: WindowGuideDemoProps) => {
  const { open, mode, snapping, hostHints, defaultHints, followPointer } = props;
  const { modifiers } = useDockKeys();
  const pointer = usePointer(followPointer);

  return (
    <Box className="window-guide-story">
      <Box className="window-guide-story__window" data-mode={mode}>
        <Widget
          id="players"
          tabs={[{ id: 'players', label: 'Players' }]}
          activeId="players"
          paneKey={null}
          mode="out"
          opacity={1}
          onActivateTab={noop}
          onOpenOptions={noop}
          onClose={noop}
        >
          <PlayersPanel />
        </Widget>
      </Box>
      <WindowGuideOverlay
        open={open}
        mode={mode}
        snapping={snapping && !modifiers.overlay}
        hints={hostHints ? HOST_HINTS : undefined}
        defaultHints={defaultHints}
        pointer={pointer}
      />
    </Box>
  );
};

export { WindowGuideDemo };
export type { WindowGuideDemoProps };
