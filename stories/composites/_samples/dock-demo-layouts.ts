/* @layer stories @kind data */
import { createDefaultLayout, dockOnEdge, dockWidget, paneOf } from '../../../src/composites';
import type { WidgetLayout } from '../../../src/composites';

const tabbedWith = (layout: WidgetLayout, host: string, id: string): WidgetLayout => {
  const pane = paneOf(layout.dock, host);
  return pane ? dockWidget(layout, id, { at: 'tab', key: pane.key }, true) : layout;
};

const dockDemoLayout = (withFloating: boolean): WidgetLayout => {
  const left = dockOnEdge(createDefaultLayout(), 'players', 'left');
  const tiled = dockOnEdge(tabbedWith(left, 'players', 'hints'), 'log', 'bottom');
  return withFloating ? { ...tiled, floating: [{ id: 'console', x: 0.5, y: 0.08, width: 280, height: 170 }] } : tiled;
};

export { dockDemoLayout };
