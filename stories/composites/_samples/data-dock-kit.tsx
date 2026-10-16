/* @layer stories @kind data */
import type { ReactNode } from 'react';
import { keepsGroups } from '../../../src/composites';
import type { DockDrop, WidgetId } from '../../../src/composites';
import { DockKitPanel } from './DockKitPanel';

const KIT_GROUPS: Readonly<Record<string, string>> = { elements: 'developer-tools', network: 'developer-tools' };

const KIT_CONTENT: Readonly<Record<string, ReactNode>> = {
  elements: <DockKitPanel rows={['<main class="race">', '  <header>', '  <section id="standings">', '</main>']} />,
  network: <DockKitPanel rows={['GET /session 200 12 ms', 'GET /standings 200 31 ms', 'POST /chat 201 8 ms']} />,
};

const kitDrop = (id: WidgetId, drop: DockDrop): boolean => keepsGroups((other) => KIT_GROUPS[other], id, drop);

export { KIT_CONTENT, kitDrop };
