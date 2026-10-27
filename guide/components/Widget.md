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
- Give every widget of a kit, such as developer tools, the same group: it then never tabs or splits with a widget outside it.
- A widget in its own window takes disabled, with the reason as a string, so it shows the state WidgetManager draws when docked.
- Give a definition dockWeight to size it on an edge: weight 2 takes twice the room of 1, and none counts as 1.
- Give a definition a sublabel to draw a muted label right after the title in the title bar; it shrinks before the title and a clipped one shows in a Tooltip, and a tab chip never shows it.
- Give a definition an icon to draw it before the title or tab label; it is decorative, as the label names the widget.
- Give a button in titleBarActions or widgetActions size xs, the 20 px of the built-in title bar buttons.
- Give the widgets of a kit chrome compact or none in their definition, and pass the same chrome to a Widget in its own window.
- To tell the options panel and its sub-panels, such as Shortcuts, from other menus, match the WIDGET_OPTIONS_ATTRIBUTE attribute with closest.

## Accessibility

- Each widget is a region named by its title, or by its open tab in a tabbed pane; pop out, options and close are icon buttons named with it.
- Each widget carries data-widget-id and each pane data-pane-id, for tests.
- A hidden context only widget leaves the tree, so focus never lands in a panel that is not shown.
- A disabled widget keeps its frame working; its body is inert and marked aria-disabled, with the reason over it.
- With chrome none the buttons stay in the tab order and the tree; focus inside the widget shows them, and the title still names it.

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
- `disabled` (optional): `boolean | string`.
- `onOpenSettings` (optional): `() => void`.
- `chrome` (optional): `WidgetChrome`, one of `'full'`, `'compact'`, `'none'`.
- `padding` (optional): `WidgetPadding`, one of `'none'`, `'sm'`, `'md'`.
- `fill` (optional): `boolean`.

## Tokens

It draws on `--blur`, `--border-width-thin`, `--c-glass`, `--c-hairline`, `--c-hover`, `--c-layer`, `--c-primary`, `--c-primary-bright`, `--c-primary-dim`, `--c-primary-soft`, `--c-primary-text`, `--c-text`, `--c-text-dim`, `--control-h-xs`, `--duration-fast`, `--duration-normal`, `--ease-standard`, `--font-mono`, `--hit-area-min`, `--radius-lg`, `--radius-md`, `--radius-sm`, `--scrollbar-slim-gutter`, `--shadow-overlay`, `--size-1`, `--size-20`, `--size-320`, `--size-4`, `--space-2xs`, `--space-md`, `--space-sm`, `--space-xs`, `--text-sm`, `--text-xs`, `--tracking-wide`, `--weight-semi`, `--widget-frame-opacity`, `--widget-options-slider-w`, `--widget-options-w`, `--widget-title-compact-font`, `--widget-titlebar-h`, `--z-base`, `--z-panel`.

## Also exported from this folder

`DEFAULT_LAYOUT_STORAGE_KEY`, `WIDGET_OPTIONS_ATTRIBUTE`, `WidgetManager`, `WidgetOptions`, `applyEdit`, `createDefaultLayout`, `dockOnEdge`, `dockWidget`, `dropFrame`, `edgeOf`, `floatInMain`, `floatWidget`, `frameOf`, `getDevOnlyWidgetIds`, `getWidgetDefinition`, `isWidgetOpen`, `loadLayoutForProfile`, `loadLayoutLocal`, `migrateLayout`, `moveMain`, `openStartupWidgets`, `openWidget`, `placementOf`, `popOutWidget`, `removeEverywhere`, `resolveSplit`, `saveLayoutForProfile`, `saveLayoutLocal`, `setFrame`, `setMakeRoom`, `setPopped`, `useWidgetLayout`, `visibleLayoutOf`.
