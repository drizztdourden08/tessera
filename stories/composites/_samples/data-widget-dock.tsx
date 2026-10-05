/* @layer stories @kind component */
import { useCallback, useState } from 'react';
import type { ReactNode } from 'react';
import { WidgetManager, isWidgetOpen, useWidgetLayout } from '../../../src/composites';
import type { WidgetContextActive, WidgetDefinition, WidgetDisabledState } from '../../../src/composites';
import { Box, Button, Icon, IconButton, Text } from '../../../src/primitives';
import { WIDGET_CONTENT } from './data-widget-panels';
import { MEMORY_IO, PROFILE_ID, STORAGE_KEY, WIDGET_DEFINITIONS } from './data-widgets';
import type { DemoWidgetDefinition } from './data-widgets.type';
import '../DockLayout.stories.css';

type WidgetDockProps = {
  contextActive: WidgetContextActive<DemoWidgetDefinition>;
  contextTools?: ReactNode;
  disabledWidget: string;
  disabledMessage: string;
  makeRoomHint: string;
};

const contextNote = (active: WidgetContextActive<DemoWidgetDefinition>): string => {
  if (typeof active === 'function') return 'Each widget asks for its own context: Players for a session, Hints for a race.';
  return active ? 'Session running. Context-only widgets are shown.' : 'No session running. Players and Hints step aside.';
};

const WidgetDock = (props: WidgetDockProps) => {
  const { contextActive, contextTools, disabledWidget, disabledMessage, makeRoomHint } = props;
  const { layout, setLayout, toggle } = useWidgetLayout({
    definitions: WIDGET_DEFINITIONS, profileId: PROFILE_ID, io: MEMORY_IO, storageKey: STORAGE_KEY,
  });
  const [notice, setNotice] = useState('');

  const resolveDisabled = useCallback(
    (definition: WidgetDefinition): WidgetDisabledState | null =>
      (definition.id === disabledWidget ? { message: disabledMessage, settingId: 'session.hintSharing' } : null),
    [disabledWidget, disabledMessage],
  );

  const widgetActions = useCallback((id: string) => (id === 'log' ? (
    <IconButton size="xs" className="widget__btn" label="Clear log" title="Clear log" onClick={() => setNotice('Would clear the log')}>
      <Icon name="trash-2" size={12} />
    </IconButton>
  ) : null), []);

  const main = (
    <Box className="dock-story__main">
      <Text>{contextNote(contextActive)}</Text>
      <Text className="story-label">Drag a title bar to dock, tab or float. Hold Alt to peek.</Text>
      {notice && <Text className="story-label">{notice}</Text>}
    </Box>
  );

  return (
    <Box className="story-frame widget-dock-frame">
      <Box className="widget-dock-frame__titlebar">
        <Text className="story-label">Session: Friday async</Text>
        {contextTools}
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
          widgetActions={widgetActions}
          main={main}
        >
          {WIDGET_CONTENT}
        </WidgetManager>
      </Box>
    </Box>
  );
};

export { WidgetDock };
