/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { LogPanel, Widget } from '../../../src/composites';
import type { WidgetBodyLook } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { LOG_ROWS } from './data-log';
import { PlayersPanel } from './data-widget-panels';

type BodySample = { id: string; label: string; caption: string; look: WidgetBodyLook; content: ReactNode };

const SAMPLES: readonly BodySample[] = [
  { id: 'none', label: 'Players', caption: "padding 'none'", look: { padding: 'none' }, content: <PlayersPanel compact /> },
  { id: 'sm', label: 'Players', caption: "padding 'sm', the default", look: {}, content: <PlayersPanel compact /> },
  { id: 'md', label: 'Players', caption: "padding 'md'", look: { padding: 'md' }, content: <PlayersPanel compact /> },
  {
    id: 'fill',
    label: 'Server log',
    caption: "fill, padding 'none'",
    look: { padding: 'none', fill: true },
    content: <LogPanel rows={LOG_ROWS} className="server-log" countLabel="lines" height="fill" />,
  },
];

const noop = () => undefined;

const WidgetBodyDemo = () => (
  <Box className="widget-story__bodies">
    {SAMPLES.map((sample) => (
      <Box key={sample.id} className="widget-story__body-cell">
        <Box className="widget-story__body-frame" data-sample={sample.id}>
          <Widget
            id={sample.id}
            tabs={[{ id: sample.id, label: sample.label }]}
            activeId={sample.id}
            paneKey="body-demo"
            opacity={1}
            canPopOut={false}
            onActivateTab={noop}
            onClose={noop}
            {...sample.look}
          >
            {sample.content}
          </Widget>
        </Box>
        <Text className="story-label">{sample.caption}</Text>
      </Box>
    ))}
  </Box>
);

export { WidgetBodyDemo };
