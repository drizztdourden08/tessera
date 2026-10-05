/* @layer stories @kind component */
import { useCallback, useState } from 'react';
import { Toggle } from '../../../src/primitives';
import { WidgetDock } from './data-widget-dock';
import type { DemoContext, DemoWidgetDefinition } from './data-widgets.type';

interface ContextDockProps {
  disabledWidget: string;
  disabledMessage: string;
  makeRoomHint: string;
}

const CONTEXTS: readonly [DemoContext, string][] = [['session', 'Session running'], ['race', 'Race running']];

const ContextDock = (props: ContextDockProps) => {
  const [running, setRunning] = useState<Record<DemoContext, boolean>>({ session: true, race: false });
  const contextActive = useCallback(
    (definition: DemoWidgetDefinition) => definition.context === undefined || running[definition.context],
    [running],
  );
  const tools = CONTEXTS.map(([context, label]) => (
    <Toggle
      key={context}
      size="sm"
      label={label}
      checked={running[context]}
      onChange={(on) => setRunning((now) => ({ ...now, [context]: on }))}
    />
  ));
  return <WidgetDock {...props} contextActive={contextActive} contextTools={tools} />;
};

export { ContextDock };
