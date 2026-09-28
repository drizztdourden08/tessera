/* @layer stories @kind story */
import { useCallback, useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Widget, createDefaultLayout } from '../../src/composites';
import type { WidgetState } from '../../src/composites';
import { Box } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { WidgetDock } from './_samples/data-widget-dock';
import { WIDGET_CONTENT } from './_samples/data-widget-panels';
import { WIDGET_DEFINITIONS } from './_samples/data-widgets';
import './Widget.stories.css';

type WidgetArgs = {
  contextActive: boolean;
  disabledWidget: string;
  disabledMessage: string;
  exclusiveLabel: string;
};

const HINTS_DEFAULT = createDefaultLayout(WIDGET_DEFINITIONS).widgets.find((w) => w.id === 'hints');

const SingleWidget = ({ exclusiveLabel }: WidgetArgs) => {
  const [state, setState] = useState<WidgetState | undefined>(
    HINTS_DEFAULT && { ...HINTS_DEFAULT, visible: true, mode: 'floating', x: 60, y: 40 },
  );
  const onChange = useCallback((patch: Partial<WidgetState>) => setState((prev) => prev && { ...prev, ...patch }), []);
  if (!state) return null;
  return (
    <Box className="story-frame widget-dock-frame">
      {state.visible && (
        <Widget
          state={state}
          label="Hints"
          onChange={onChange}
          onClose={() => onChange({ visible: false })}
          exclusiveLabel={exclusiveLabel}
        >
          {WIDGET_CONTENT.hints}
        </Widget>
      )}
    </Box>
  );
};

const ARGS: Partial<WidgetArgs> = {
    contextActive: true,
    disabledWidget: 'hints',
    disabledMessage: 'Hint sharing is off for this session.',
    exclusiveLabel: 'Push the session view aside',
  };

const ARG_TYPES: StoryLiteArgTypes<WidgetArgs> = {
    contextActive: { control: 'boolean', description: 'A session is running. Players and Hints are context-only.' },
    disabledWidget: { control: 'select', options: ['none', 'players', 'log', 'hints', 'console'], description: 'Covered through resolveDisabled' },
    disabledMessage: { control: 'text' },
    exclusiveLabel: { control: 'text', description: 'Label of the exclusive checkbox in each widget\'s settings' },
  };

const meta = {
  title: 'Composites · Widgets/Widget',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<WidgetArgs>;

const Dock = {
  name: 'Session dashboard dock',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WidgetDock {...args} />,
} satisfies StoryLiteStoryDefinition<WidgetArgs>;

const Floating = {
  name: 'Single floating widget',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <SingleWidget {...args} />,
} satisfies StoryLiteStoryDefinition<WidgetArgs>;

const CODE = `import { useState } from 'react';
import { Widget, createDefaultWidgetState } from '@drizztdourden08/tessera';
import type { WidgetDefinition, WidgetState } from '@drizztdourden08/tessera';

const HintsWidget = ({ definition }: { definition: WidgetDefinition }) => {
  const [state, setState] = useState<WidgetState>(() => createDefaultWidgetState(definition));
  const onChange = (patch: Partial<WidgetState>) => setState((prev) => ({ ...prev, ...patch }));
  return (
    <Widget state={state} label="Hints" onChange={onChange} onClose={() => onChange({ visible: false })}>
      <HintList />
    </Widget>
  );
};

// A dashboard of docked widgets goes through useWidgetLayout and WidgetManager,
// which hand each docked widget its position and size.`;

const Overview = overviewStory({
  component: 'Widget',
  description: 'A movable panel for a tool that sits over the main view: a player list, a log, hints. It draws a title bar with a settings gear and a close button, and reports every move, resize and setting through onChange. Floating, it drags by its title bar and resizes from any edge; docked to a side, it resizes from its inner edge only. The frame takes the opacity setting and turns solid on hover, while the content always stays opaque.',
  variants: [Floating, Dock],
  code: CODE,
});

export default meta;
export { Dock, Floating, Overview };
