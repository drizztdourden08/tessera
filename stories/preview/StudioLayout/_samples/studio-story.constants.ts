/* @layer stories @kind data */
import type { PreviewCardEntry } from '../../_shared/preview-card.type';

const STUDIO_MAPPING: readonly PreviewCardEntry[] = [
  { name: 'RotP StudioFrame', badge: 'Replaced', tone: 'warning', text: 'RotP wrote its own frame for the Character, Language and Music Studios: the top bar, two side panels that fold to a rail, the editor with its toolbar, and a well. Nine files and 193 lines of CSS.' },
  { name: 'ListDetailLayout', badge: 'Two panes', text: 'A list beside one detail pane. Only one side folds at a time, the fold button sits in the gutter, the panes have no heading, and a small window shows one pane with Back in place of a stack.' },
  { name: 'Two ListDetailLayouts, nested', badge: 'Not a fit', text: 'The inner layout sits inside the padded detail pane, a box in a box with two gutters, and its fixed width column holds the editor while the inspector takes the rest.' },
  { name: 'SplitPane and DockLayout', badge: 'Not a fit', text: 'SplitPane splits two panes by a ratio and never stacks. DockLayout docks movable widgets around a main view; a studio has fixed panels.' },
  { name: 'WorkspaceScreen', badge: 'Not a fit', text: 'A side list of pages and the current page. It has no right panel and no editor frame.' },
];

const STUDIO_CHOICES: readonly PreviewCardEntry[] = [
  {
    name: 'A. A third pane on ListDetailLayout',
    badge: 'Considered',
    text: 'ListDetailLayout takes an aside on the right that folds to its own rail, and a heading per pane. The top bar and the editor frame stay recipes: a raised Box with ButtonGroups and a HintLine, a sunken Box with a toolbar. No new part, but ListDetailLayout grows past its job, both folds and the small window change for every list screen, and each studio rebuilds its bar and frame.',
  },
  {
    name: 'B. StudioLayout, a new composite',
    badge: 'Recommended', tone: 'success',
    text: 'One part for a work surface with tools around it: a raised top bar with labelled action groups and a HintLine, a left and a right panel with a heading that fold to a rail, and an editor frame with its toolbar on the top edge, stacked below 768 px. It is drawn on Box surfaces and Divider, and reuses the fold of ListDetailLayout. RotP deletes StudioFrame; Brock and Archipelia editors can use it.',
  },
  {
    name: 'C. No new part',
    badge: 'Considered',
    text: 'RotP keeps StudioFrame, now drawn on Box surfaces. Tessera stays smaller, but the next app with an editor writes its own frame again.',
  },
];

const STUDIO_CODE = `import { StudioLayout } from '@drizztdourden08/tessera';

<StudioLayout
  bar={<StudioLayout.Bar caption="Character Studio" title={sprite.name} groups={fileActions} idleHint={idleHint} />}
  start={{ title: 'Sprites', content: <SpriteList /> }}
  end={{ title: 'Properties', content: <SpriteFacts /> }}
>
  <StudioLayout.Editor label="Sprite sheet" toolbar={sheetTools}>
    <SpriteSheet />
  </StudioLayout.Editor>
</StudioLayout>`;

export { STUDIO_CHOICES, STUDIO_CODE, STUDIO_MAPPING };
