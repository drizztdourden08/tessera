/* @layer stories @kind data */
import { createDefaultLayout, dockOnEdge, dockWidget, paneOf } from '../../../src/composites';
import type { WidgetLayout } from '../../../src/composites';
import type { DockDemoStart } from './dock-demo.type';

const tabbedWith = (layout: WidgetLayout, host: string, id: string): WidgetLayout => {
  const pane = paneOf(layout.dock, host);
  return pane ? dockWidget(layout, id, { at: 'tab', key: pane.key }, true) : layout;
};

const dockDemoLayout = (withFloating: boolean, start?: DockDemoStart): WidgetLayout => {
  const left = dockOnEdge(createDefaultLayout(), 'players', 'left');
  if (start === 'snap') {
    const consoleBox = { id: 'console', x: 0.06, y: 0.08, width: 280, height: 170 };
    return { ...left, floating: [consoleBox, { id: 'hints', x: 0.58, y: 0.4, width: 260, height: 190 }] };
  }
  const tiled = dockOnEdge(tabbedWith(left, 'players', 'hints'), 'log', 'bottom');
  if (start === 'kit') return tabbedWith(dockOnEdge(tiled, 'elements', 'right'), 'elements', 'network');
  return withFloating ? { ...tiled, floating: [{ id: 'console', x: 0.5, y: 0.08, width: 280, height: 170 }] } : tiled;
};

export { dockDemoLayout };
