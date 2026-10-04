/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { Widget } from '../../../src/composites';
import type { LayoutEdit, WidgetId } from '../../../src/composites';
import { WIDGET_CONTENT } from './data-widget-panels';
import { WIDGET_DEFINITIONS } from './data-widgets';
import { DOCK_LABELS } from './dock-demo.constants';

type DockDemoPaneProps = {
  ids: WidgetId[];
  active: WidgetId;
  paneKey: string | null;
  peek: boolean;
  onEdit: (edit: LayoutEdit) => void;
  onClose: (id: WidgetId) => void;
};

const contentOf = (id: WidgetId) => (WIDGET_CONTENT as Record<string, ReactNode>)[id];

const DockDemoPane = (props: DockDemoPaneProps) => {
  const { ids, active, paneKey, peek, onEdit, onClose } = props;
  const definition = WIDGET_DEFINITIONS.find((entry) => entry.id === active);
  return (
    <Widget
      id={active}
      tabs={ids.map((id) => ({ id, label: DOCK_LABELS[id] ?? id }))}
      activeId={active}
      paneKey={paneKey}
      opacity={0.92}
      peek={peek}
      padding={definition?.padding}
      fill={definition?.fill}
      onActivateTab={(id) => { if (paneKey) onEdit({ type: 'activate-tab', key: paneKey, id }); }}
      onClose={() => onClose(active)}
    >
      {contentOf(active)}
    </Widget>
  );
};

export { DockDemoPane };
