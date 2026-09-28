/* @layer stories @kind component */
import { useCallback, useState } from 'react';
import { WidgetManager, useWidgetLayout } from '../../../src/composites';
import type { WidgetDefinition, WidgetDisabledState } from '../../../src/composites';
import type { ExclusiveInsets } from '../../../src/composites/Widget';
import { Box, Button, Text } from '../../../src/primitives';
import { WIDGET_CONTENT } from './data-widget-panels';
import { MEMORY_IO, PROFILE_ID, STORAGE_KEY, WIDGET_DEFINITIONS } from './data-widgets';

type WidgetDockProps = {
  contextActive: boolean;
  disabledWidget: string;
  disabledMessage: string;
  exclusiveLabel: string;
};

const TOP_OFFSET = 38;

const NO_FORCED_WIDGETS: string[] = [];
const NO_INSETS: ExclusiveInsets = { left: 0, right: 0, top: 0, bottom: 0 };

const WidgetDock = (props: WidgetDockProps) => {
  const { contextActive, disabledWidget, disabledMessage, exclusiveLabel } = props;
  const { layout, update, close, toggle } = useWidgetLayout({
    definitions: WIDGET_DEFINITIONS, profileId: PROFILE_ID, io: MEMORY_IO, storageKey: STORAGE_KEY,
  });
  const [notice, setNotice] = useState('');
  const [insets, setInsets] = useState<ExclusiveInsets>(NO_INSETS);

  const resolveDisabled = useCallback(
    (definition: WidgetDefinition): WidgetDisabledState | null =>
      (definition.id === disabledWidget ? { message: disabledMessage, settingId: 'session.hintSharing' } : null),
    [disabledWidget, disabledMessage],
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
            active={layout.widgets.find((w) => w.id === definition.id)?.visible ?? false}
            onClick={() => toggle(definition.id)}
          >
            {definition.label}
          </Button>
        ))}
      </Box>
      <Box
        className="widget-dock-frame__main"
        style={{ paddingLeft: insets.left, paddingRight: insets.right, paddingBottom: insets.bottom }}
      >
        <Text>{contextActive ? 'Session running. Context-only widgets are shown.' : 'No session running. Players and Hints step aside.'}</Text>
        {notice && <Text className="story-label">{notice}</Text>}
      </Box>
      <WidgetManager
        definitions={WIDGET_DEFINITIONS}
        layout={layout}
        contextActive={contextActive}
        onUpdate={update}
        onClose={close}
        onInsetsChange={setInsets}
        startupForcedWidgetIds={NO_FORCED_WIDGETS}
        resolveDisabled={resolveDisabled}
        onOpenSettings={(settingId) => setNotice(`Would open the setting ${settingId}`)}
        topOffset={TOP_OFFSET}
        exclusiveLabel={exclusiveLabel}
      >
        {WIDGET_CONTENT}
      </WidgetManager>
    </Box>
  );
};

export { WidgetDock };
