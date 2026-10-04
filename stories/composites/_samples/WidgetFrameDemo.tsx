/* @layer stories @kind component */
import { useState } from 'react';
import { WidgetOptions } from '../../../src/composites';
import { Box, Button, Text } from '../../../src/primitives';
import { DemoWidget } from './DemoWidget';
import { frameTabs } from './frame-tabs';
import { useSpoilerAction } from './useSpoilerAction';
import { useWidgetOptionsDemo } from './useWidgetOptionsDemo';

type WidgetFrameDemoProps = {
  tabbed: boolean;
  mode: 'in' | 'out';
  peek: boolean;
  opacity: number;
  canPopOut: boolean;
  square?: boolean;
  titleBarActions?: boolean;
  optionsOpen?: boolean;
};

const WidgetFrameDemo = (props: WidgetFrameDemoProps) => {
  const { tabbed, mode, peek, opacity, canPopOut, square = false, titleBarActions = false, optionsOpen = false } = props;
  const [active, setActive] = useState('hints');
  const [closed, setClosed] = useState(false);
  const spoilers = useSpoilerAction(titleBarActions);
  const { panel, summary } = useWidgetOptionsDemo(mode === 'out' ? 'popped' : 'docked', opacity);
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
        square={square}
        canPopOut={canPopOut}
        options={<WidgetOptions {...panel} title={view.label} canPopOut={canPopOut} defaultOpen={optionsOpen} />}
        onActivateTab={setActive}
        onClose={() => setClosed(true)}
        titleBarActions={spoilers.action}
      />
      <Text className="story-label widget-story__summary">{`${view.label}: ${summary}${spoilers.note}`}</Text>
    </Box>
  );
};

export { WidgetFrameDemo };
