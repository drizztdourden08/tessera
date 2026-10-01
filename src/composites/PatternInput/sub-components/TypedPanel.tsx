/* @layer renderer-components @kind component */
import { ColorPanel } from './ColorPanel';
import { NumberPanel } from './NumberPanel';
import { TimePanel } from './TimePanel';
import type { TypedPanelProps } from './SlotPanel.type';

const TypedPanel = (props: TypedPanelProps) => {
  const { field, slot, panel } = props;
  switch (panel) {
    case 'time':
      return <TimePanel field={field} slot={slot} />;
    case 'color':
      return <ColorPanel field={field} slot={slot} />;
    case 'slider':
    case 'stepper':
    case 'spin':
      return <NumberPanel field={field} slot={slot} panel={panel} />;
    case 'list':
    case 'none':
      return null;
  }
};

export { TypedPanel };
