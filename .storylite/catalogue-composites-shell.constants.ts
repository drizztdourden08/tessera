/* @layer root-config @kind data */
import type { CatalogueGroup } from './catalogue.type';

const SHELL_GROUPS: readonly CatalogueGroup[] = [
  {
    group: 'Input devices',
    entries: [
      { name: 'PressedGrid', summary: 'A grid of buttons that light up while held.' },
      { name: 'StickPlot', summary: 'Where an analog stick points, with dead zones and calibration marks.' },
      { name: 'ControllerLayout', summary: 'A plain controller outline with every input lit in its place.' },
      { name: 'ControllerSilhouette', summary: 'An empty, shaded controller body with anchors, for the app to draw its own marks on.' },
      { name: 'KeyboardLayout', summary: 'A full keyboard drawn from data, with keys lit or pressed.' },
      { name: 'ShortcutTour', summary: 'A camera that walks a keyboard through a shortcut, key by key.' },
    ],
  },
  {
    group: 'Widgets',
    entries: [
      { name: 'DockLayout', summary: 'Tiles widget panes around a main view, with drag, drop and resize.' },
      { name: 'Widget', summary: 'The frame of a tool panel: title bar, tabs, pop out, options, close.' },
      { name: 'WidgetOptions', summary: 'The gear options of one widget, in a ControlMenu: placement, make room, opacity, show.' },
      { name: 'WindowGuideOverlay', summary: 'A dimmed guide over the window that lists the keys while one is moved or resized.' },
    ],
  },
  {
    group: 'Windows',
    entries: [
      { name: 'WindowTitleBar', summary: 'An app window title bar with brand, slots and window buttons.' },
      { name: 'WindowHeader', summary: 'A panel title bar with extras and close.' },
    ],
  },
  {
    group: 'Screens',
    entries: [
      { name: 'WorkspaceScreen', summary: 'A screen to work in: a side list of pages and the current page with its header pills.' },
      { name: 'InfoScreen', summary: 'An informational window to read, such as About or credits: a small dialog sized to its content.' },
      { name: 'UtilityScreen', summary: 'A compact screen for one short task: a status, details, progress and actions.' },
      { name: 'StageScreen', summary: 'One big open stage for custom work, such as calibration, with an optional toolbar.' },
      { name: 'ScreenWindow', summary: 'Building block: the plain screen window with a title, a close button and an empty container.' },
      { name: 'ScreenPage', summary: 'Building block: the page header container every screen kind shows, with its icon, title and fading backdrop.' },
      { name: 'ScreenLayer', summary: 'Building block: the overlay and the card with its gap, to build a new kind of screen.' },
    ],
  },
];

export { SHELL_GROUPS };
