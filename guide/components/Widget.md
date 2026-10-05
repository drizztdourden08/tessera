# Widget

The frame of a tool panel, such as a player list or a log, that the user docks, floats or pops out; WidgetManager places a whole dock.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { Widget } from '@drizztdourden08/tessera';
```

The source is `src/composites/Widget/Widget.tsx`. Its gallery page is Composites · Widgets/Widget (`#/story/composites-widget--overview`).

## Where the questions lead here

What are you placing? Layout. What are you arranging? Panels the user docks and moves.

Widget and WidgetManager give every tool panel the same frame, dock and options, with the app holding the layout.

## Use it when

- An app shows several tool panels around its main view and lets the user arrange them, as a dashboard of a session.
- Some panels only make sense in a context, such as a running session or a race, and step aside outside it.

## Use something else when

- Two fixed panes share the space and the user only moves the line between them. Use `SplitPane` instead.
- One panel slides in from the edge for a moment. Use `Drawer` instead.

## Rules

- Draw a dock with WidgetManager and keep the layout in the app: it hands every change to onLayoutChange.
- Answer contextActive with one flag, or with a function that reads each definition, such as its own context field.
- Keep that function stable with useCallback; Tessera calls it only for the widgets shown in context only.
- Give a log or a chart fill in its definition, and leave the other widgets on the default padding.
- Give a button in titleBarActions or widgetActions size xs, the 20 px of the built-in title bar buttons.

## Accessibility

- The title bar names the widget; pop out, options and close are icon buttons named with it.
- Each widget carries data-widget-id and each pane data-pane-id, for tests.
- A hidden context only widget leaves the tree, so focus never lands in a panel that is not shown.

## Example

```tsx
import { useCallback } from 'react';
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
```

## Props

- `id`: `WidgetId`.
- `tabs`: `WidgetTab[]`.
- `activeId`: `WidgetId`.
- `paneKey`: `string | null`.
- `opacity`: `number`.
- `onActivateTab`: `(id: WidgetId) => void`.
- `onClose`: `() => void`.
- `children`: `ReactNode`.
- `options` (optional): `ReactNode`.
- `peek` (optional): `boolean`. Default `false`.
- `onPopOut` (optional): `() => void`.
- `canPopOut` (optional): `boolean`.
- `mode` (optional): `'in' | 'out'`.
- `pin` (optional): `PinMode`, one of `'off'`, `'top'`.
- `onPinChange` (optional): `(mode: PinMode) => void`.
- `titleBarActions` (optional): `ReactNode`.
- `square` (optional): `boolean`.
- `dragRegion` (optional): `boolean`.
- `padding` (optional): `WidgetPadding`, one of `'none'`, `'sm'`, `'md'`. Default `'sm'`.
- `fill` (optional): `boolean`. Default `false`.

## Tokens

It draws on `--border-width-thin`, `--c-hover`, `--c-layer`, `--c-primary`, `--c-primary-bright`, `--c-primary-dim`, `--c-primary-soft`, `--c-text`, `--c-text-dim`, `--control-h-xs`, `--duration-normal`, `--font-mono`, `--radius-lg`, `--radius-sm`, `--scroll-thumb-edge`, `--scrollbar-slim-active`, `--size-20`, `--size-320`, `--size-4`, `--space-2xs`, `--space-md`, `--space-sm`, `--space-xs`, `--text-sm`, `--text-xs`, `--tracking-wide`, `--weight-semi`, `--widget-frame-opacity`, `--widget-options-slider-w`, `--widget-options-w`, `--widget-titlebar-h`, `--z-panel`.

## Also exported from this folder

`DEFAULT_LAYOUT_STORAGE_KEY`, `WidgetManager`, `WidgetOptions`, `applyEdit`, `createDefaultLayout`, `dockOnEdge`, `dockWidget`, `dropFrame`, `edgeOf`, `floatInMain`, `floatWidget`, `frameOf`, `getDevOnlyWidgetIds`, `getWidgetDefinition`, `isWidgetOpen`, `loadLayoutForProfile`, `loadLayoutLocal`, `migrateLayout`, `moveMain`, `openStartupWidgets`, `openWidget`, `placementOf`, `popOutWidget`, `removeEverywhere`, `resolveSplit`, `saveLayoutForProfile`, `saveLayoutLocal`, `setFrame`, `setMakeRoom`, `setPopped`, `useWidgetLayout`, `visibleLayoutOf`.
