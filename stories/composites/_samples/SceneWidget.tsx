/* @layer stories @kind component */
import { Widget } from '../../../src/composites';
import { PlayersPanel } from './data-widget-panels';
import type { PlayersView } from './data-widget-panels';
import type { DemoPanelProps } from './useWidgetOptionsDemo';

type SceneWidgetProps = {
  title: string;
  panel: DemoPanelProps;
  view: PlayersView;
  canPopOut: boolean;
  optionsOpen: boolean;
  onOpenOptions: (gear: HTMLElement) => void;
  onClose: () => void;
};

const SceneWidget = (props: SceneWidgetProps) => {
  const { title, panel, view, canPopOut, optionsOpen, onOpenOptions, onClose } = props;
  return (
    <Widget
      id="players"
      tabs={[{ id: 'players', label: title }]}
      activeId="players"
      paneKey={panel.placement === 'docked' ? 'scene' : null}
      opacity={panel.opacity}
      mode={panel.placement === 'popped' ? 'out' : 'in'}
      pin={panel.pin}
      onTop={panel.pin !== 'off'}
      onPinChange={panel.onPinChange}
      canPopOut={canPopOut}
      onPopOut={panel.onPopOut}
      optionsOpen={optionsOpen}
      onActivateTab={() => undefined}
      onOpenOptions={onOpenOptions}
      onClose={onClose}
    >
      <PlayersPanel {...view} />
    </Widget>
  );
};

export { SceneWidget };
