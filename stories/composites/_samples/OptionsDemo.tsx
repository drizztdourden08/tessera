/* @layer stories @kind component */
import { useState } from 'react';
import { useWidgetOptionsMenu } from '../../../src/composites';
import type { WidgetPlacement } from '../../../src/composites';
import { Box, Button, Text, Toggle } from '../../../src/primitives';
import type { PlayersView } from './data-widget-panels';
import { playersMenuGroups } from './players-menu-groups';
import { SceneWidget } from './SceneWidget';
import { useWidgetOptionsDemo } from './useWidgetOptionsDemo';
import type { DemoPanelProps } from './useWidgetOptionsDemo';

type OptionsDemoProps = {
  title: string;
  placement: WidgetPlacement;
  canPopOut: boolean;
  makeRoomHint: string;
  contextLabel: string;
  ownRows: boolean;
};

const START_VIEW: Required<PlayersView> = { sort: 'progress', compact: false, finished: true };

const sceneNotes = (title: string, session: boolean, hidden: 'closed' | 'context' | null): string[] => [
  session ? 'Session view: a multiworld is running' : 'Session view: no session running',
  ...(hidden === 'closed' ? [`${title} is closed.`] : []),
  ...(hidden === 'context' ? [`${title} shows again once a session runs, or with Show set to always.`] : []),
];

const hiddenBy = (closed: boolean, inContext: boolean): 'closed' | 'context' | null => {
  if (closed) return 'closed';
  return inContext ? null : 'context';
};

const sceneAttrs = (panel: DemoPanelProps) => ({
  'data-place': panel.placement === 'docked' ? panel.dockEdge : panel.placement,
  'data-room': panel.makeRoom ? '' : undefined,
});

const OptionsDemo = (props: OptionsDemoProps) => {
  const { title, placement, canPopOut, makeRoomHint, contextLabel, ownRows } = props;
  const [session, setSession] = useState(true);
  const [closed, setClosed] = useState(false);
  const [view, setView] = useState(START_VIEW);
  const { panel, summary } = useWidgetOptionsDemo(placement);
  const inContext = session || panel.show === 'always';
  const shown = !closed && inContext;
  const hidden = hiddenBy(closed, inContext);
  const own = ownRows ? playersMenuGroups(view, (patch) => setView((prev) => ({ ...prev, ...patch }))) : undefined;
  const options = useWidgetOptionsMenu({ ...panel, canPopOut, makeRoomHint, contextLabel, own });

  return (
    <Box className="story-column options-story">
      <Box className="options-scene" {...sceneAttrs(panel)}>
        <Box className="options-scene__main">
          {sceneNotes(title, session, hidden).map((note) => <Text key={note} className="story-label">{note}</Text>)}
        </Box>
        {shown && (
          <Box className="options-scene__widget">
            <SceneWidget
              title={title}
              panel={panel}
              view={ownRows ? view : START_VIEW}
              canPopOut={canPopOut}
              options={options}
              onClose={() => setClosed(true)}
            />
          </Box>
        )}
      </Box>
      <Box className="story-row">
        <Toggle size="sm" checked={session} onChange={setSession} label="Session running" />
        {closed && <Button size="sm" variant="tertiary" onClick={() => setClosed(false)}>Reopen</Button>}
        <Text className="story-label options-story__summary">{`${title}: ${summary}`}</Text>
      </Box>
    </Box>
  );
};

export { OptionsDemo };
export type { OptionsDemoProps };
