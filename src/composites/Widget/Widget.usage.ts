/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The frame of a tool panel, such as a player list or a log, that the user docks, floats or pops out; WidgetManager places a whole dock.',
  useWhen: [
    'An app shows several tool panels around its main view and lets the user arrange them, as a dashboard of a session.',
    'Some panels only make sense in a context, such as a running session or a race, and step aside outside it.',
  ],
  avoidWhen: [
    { case: 'Two fixed panes share the space and the user only moves the line between them.', use: 'SplitPane' },
    { case: 'One panel slides in from the edge for a moment.', use: 'Drawer' },
  ],
  rules: [
    'Draw a dock with WidgetManager and keep the layout in the app: it hands every change to onLayoutChange.',
    'Answer contextActive with one flag, or with a function that reads each definition, such as its own context field.',
    'Keep that function stable with useCallback; Tessera calls it only for the widgets shown in context only.',
    'Give a log or a chart fill in its definition, and leave the other widgets on the default padding.',
  ],
  a11y: [
    'The title bar names the widget; pop out, options and close are icon buttons named with it.',
    'Each widget carries data-widget-id and each pane data-pane-id, for tests.',
    'A hidden context only widget leaves the tree, so focus never lands in a panel that is not shown.',
  ],
  tree: {
    path: ['layout', 'panels the user docks and moves'],
    rule: 'Widget and WidgetManager give every tool panel the same frame, dock and options, with the app holding the layout.',
  },
  example: `import { useCallback } from 'react';
import type { ReactNode } from 'react';
import { WidgetManager, useWidgetLayout } from '@drizztdourden08/tessera';
import type { WidgetDefinition, WidgetPersistenceIO } from '@drizztdourden08/tessera';

interface AppWidget extends WidgetDefinition {
  context?: 'session' | 'race';
}

interface DashboardProps {
  definitions: readonly AppWidget[];
  running: Record<'session' | 'race', boolean>;
  io: WidgetPersistenceIO;
  panels: Record<string, ReactNode>;
}

const Dashboard = ({ definitions, running, io, panels }: DashboardProps) => {
  const { layout, setLayout } = useWidgetLayout({ definitions, profileId: 'main', io, storageKey: 'dashboard' });
  const contextActive = useCallback((widget: AppWidget) => widget.context === undefined || running[widget.context], [running]);
  return (
    <WidgetManager definitions={definitions} layout={layout} onLayoutChange={setLayout} contextActive={contextActive}>
      {panels}
    </WidgetManager>
  );
};
`,
  propsHash: '77dab66a0099de6b',
} satisfies ComponentUsage;

export { usage };
