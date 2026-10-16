/* @layer stories @kind component */
import { useState } from 'react';
import type { DragEvent } from 'react';
import { Box, Paragraph, Text } from '../../../src/primitives';
import { CONTROLS_ACTIONS, CONTROLS_DEVICES, CONTROLS_DRAG_TYPE, CONTROLS_TEXT as T } from './controls-page.constants';
import type { ControlsBindingsProps } from './controls-page.type';

const deviceName = (id: string | undefined): string | undefined => CONTROLS_DEVICES.find((device) => device.id === id)?.name;

const ControlsBindings = ({ profile, bindings, onBind }: ControlsBindingsProps) => {
  const [over, setOver] = useState<string | null>(null);
  const allow = (actionId: string) => (event: DragEvent<HTMLElement>) => {
    if (!event.dataTransfer.types.includes(CONTROLS_DRAG_TYPE)) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    setOver(actionId);
  };
  const drop = (actionId: string) => (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setOver(null);
    const deviceId = event.dataTransfer.getData(CONTROLS_DRAG_TYPE);
    if (deviceId) onBind(actionId, deviceId);
  };
  return (
    <Box as="section" surface="sunken" aria-label={T.bindings(profile.name)} className="controls-story__main">
      <Text as="h3" variant="title">{T.bindings(profile.name)}</Text>
      <Paragraph tone="dim">{T.hint}</Paragraph>
      {CONTROLS_ACTIONS.map((action) => {
        const bound = deviceName(bindings[`${profile.id}:${action.id}`]);
        return (
          <Box
            key={action.id}
            className={`controls-story__slot${over === action.id ? ' controls-story__slot--over' : ''}`}
            data-action-id={action.id}
            onDragOver={allow(action.id)}
            onDragLeave={() => setOver(null)}
            onDrop={drop(action.id)}
          >
            <Text variant="label">{action.name}</Text>
            <Text tone={bound ? undefined : 'muted'}>{bound ?? T.drop}</Text>
          </Box>
        );
      })}
    </Box>
  );
};

export { ControlsBindings };
