/* @layer stories @kind component */
import { useDockKeys, Widget, WindowGuideOverlay } from '../../../src/composites';
import type { WindowGuideHint, WindowGuideMode } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { PlayersPanel } from './data-widget-panels';

type WindowGuideDemoProps = {
  open: boolean;
  mode: WindowGuideMode;
  snapping: boolean;
  groupHints: boolean;
  defaultHints: boolean;
};

const GROUP_HINTS: readonly WindowGuideHint[] = [
  { keys: ['shift'], label: 'Move the whole group together' },
  { keys: ['alt'], label: 'Leave the group for this move' },
];

const noop = () => undefined;

const WindowGuideDemo = (props: WindowGuideDemoProps) => {
  const { open, mode, snapping, groupHints, defaultHints } = props;
  const { modifiers } = useDockKeys();

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
        hints={groupHints ? GROUP_HINTS : undefined}
        defaultHints={defaultHints}
      />
    </Box>
  );
};

export { WindowGuideDemo };
export type { WindowGuideDemoProps };
