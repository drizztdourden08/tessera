/* @layer stories @kind component */
import { useMemo, useState } from 'react';
import { WidgetOptions } from '../../../src/composites';
import { Box, Button, Text } from '../../../src/primitives';
import { DemoWidget } from './DemoWidget';
import { frameTabs } from './frame-tabs';
import { useWidgetOptionsDemo } from './useWidgetOptionsDemo';

type WidgetFrameDemoProps = {
  tabbed: boolean;
  mode: 'in' | 'out';
  peek: boolean;
  opacity: number;
  canPopOut: boolean;
  optionsOpen?: boolean;
};

const WidgetFrameDemo = (props: WidgetFrameDemoProps) => {
  const { tabbed, mode, peek, opacity, canPopOut, optionsOpen = false } = props;
  const [active, setActive] = useState('hints');
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [closed, setClosed] = useState(false);
  const { panel, summary } = useWidgetOptionsDemo(mode === 'out' ? 'popped' : 'docked', opacity);
  const anchorRef = useMemo(() => ({ current: anchor }), [anchor]);
  const view = frameTabs(tabbed, active);

  if (closed) {
    return (
      <Box className="story-column">
        <Text className="story-label">{`${view.label} closed.`}</Text>
        <Button size="sm" variant="tertiary" onClick={() => setClosed(false)}>Reopen</Button>
      </Box>
    );
  }

  return (
    <Box className="story-column">
      <DemoWidget
        view={view}
        panel={panel}
        peek={peek}
        canPopOut={canPopOut}
        optionsOpen={optionsOpen || anchor !== null}
        onActivateTab={setActive}
        onOpenOptions={(gear) => setAnchor(anchor ? null : gear)}
        onClose={() => setClosed(true)}
      />
      <Text className="story-label widget-story__summary">{`${view.label}: ${summary}`}</Text>
      {anchor && <WidgetOptions {...panel} title={view.label} canPopOut={canPopOut} anchorRef={anchorRef} onClose={() => setAnchor(null)} />}
    </Box>
  );
};

export { WidgetFrameDemo };
