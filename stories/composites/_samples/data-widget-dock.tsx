/* @layer stories @kind component */
import { useCallback, useState } from 'react';
import { WidgetManager, isWidgetOpen, useWidgetLayout } from '../../../src/composites';
import type { WidgetDefinition, WidgetDisabledState } from '../../../src/composites';
import { Box, Button, Text } from '../../../src/primitives';
import { WIDGET_CONTENT } from './data-widget-panels';
import { MEMORY_IO, PROFILE_ID, STORAGE_KEY, WIDGET_DEFINITIONS } from './data-widgets';
import '../DockLayout.stories.css';

type WidgetDockProps = {
  contextActive: boolean;
  disabledWidget: string;
  disabledMessage: string;
  makeRoomHint: string;
};

const WidgetDock = (props: WidgetDockProps) => {
  const { contextActive, disabledWidget, disabledMessage, makeRoomHint } = props;
  const { layout, setLayout, toggle } = useWidgetLayout({
    definitions: WIDGET_DEFINITIONS, profileId: PROFILE_ID, io: MEMORY_IO, storageKey: STORAGE_KEY,
  });
  const [notice, setNotice] = useState('');

  const resolveDisabled = useCallback(
    (definition: WidgetDefinition): WidgetDisabledState | null =>
      (definition.id === disabledWidget ? { message: disabledMessage, settingId: 'session.hintSharing' } : null),
    [disabledWidget, disabledMessage],
  );

  const main = (
    <Box className="dock-story__main">
      <Text>{contextActive ? 'Session running. Context-only widgets are shown.' : 'No session running. Players and Hints step aside.'}</Text>
      <Text className="story-label">Drag a title bar to dock, tab or float. Hold Alt to peek.</Text>
      {notice && <Text className="story-label">{notice}</Text>}
    </Box>
  );

  return (
    <Box className="story-frame widget-dock-frame">
      <Box className="widget-dock-frame__titlebar">
        <Text className="story-label">Session: Friday async</Text>
        {WIDGET_DEFINITIONS.map((definition) => (
          <Button
            key={definition.id}
            size="sm"
            variant="tertiary"
            active={isWidgetOpen(layout, definition.id)}
            onClick={() => toggle(definition.id)}
          >
            {definition.label}
          </Button>
        ))}
      </Box>
      <Box className="widget-dock-frame__stage">
        <WidgetManager
          definitions={WIDGET_DEFINITIONS}
          layout={layout}
          onLayoutChange={setLayout}
          contextActive={contextActive}
          resolveDisabled={resolveDisabled}
          onOpenSettings={(settingId) => setNotice(`Would open the setting ${settingId}`)}
          makeRoomHint={makeRoomHint}
          main={main}
        >
          {WIDGET_CONTENT}
        </WidgetManager>
      </Box>
    </Box>
  );
};

export { WidgetDock };
