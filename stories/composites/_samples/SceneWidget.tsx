/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { Widget } from '../../../src/composites';
import { PlayersPanel } from './data-widget-panels';
import type { PlayersView } from './data-widget-panels';
import type { DemoPanelProps } from './useWidgetOptionsDemo';

type SceneWidgetProps = {
  title: string;
  panel: DemoPanelProps;
  view: PlayersView;
  canPopOut: boolean;
  options: ReactNode;
  onClose: () => void;
};

const SceneWidget = (props: SceneWidgetProps) => {
  const { title, panel, view, canPopOut, options, onClose } = props;
  return (
    <Widget
      id="players"
      tabs={[{ id: 'players', label: title }]}
      activeId="players"
      paneKey={panel.placement === 'docked' ? 'scene' : null}
      opacity={panel.opacity}
      mode={panel.placement === 'popped' ? 'out' : 'in'}
      pin={panel.pin}
      onPinChange={panel.onPinChange}
      canPopOut={canPopOut}
      onPopOut={panel.onPopOut}
      options={options}
      onActivateTab={() => undefined}
      onClose={onClose}
    >
      <PlayersPanel {...view} />
    </Widget>
  );
};

export { SceneWidget };
