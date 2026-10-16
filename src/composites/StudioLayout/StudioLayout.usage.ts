/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The frame of a studio screen: a list on the left, an editor in the centre and an inspector on the right, under an optional bar of actions.',
  useWhen: [
    'A screen edits one thing picked from a list, with its properties beside it, such as a sprite, a language or a song studio.',
    'The editor needs tools on its top edge and the screen needs Save and Export actions above it.',
    'The user folds the side panels away now and then to give the editor the room.',
  ],
  avoidWhen: [
    { case: 'A list sits beside the detail of the picked item, with no inspector.', use: 'ListDetailLayout' },
    { case: 'The user moves panels around and docks them.', use: 'DockLayout' },
    { case: 'Only one side panel sits beside the main view.', use: 'SidePanel' },
  ],
  rules: [
    'Pass the editor as children and name it with editorLabel; it sits in a ToolFrame that scrolls.',
    'Pass toolbar as ToolGroups groups, { id, label, content }, for the tools on the top edge of the editor.',
    'Pass start and end as { title, content } with any SidePanel prop, such as storageKey, width, rail or defaultCollapsed.',
    'Pass bar as { title, caption, status, groups, idleHint } for the raised top bar; its HintLine shows the hint of the control under the pointer.',
    'Put status and error lines in bar.notices, under the hint line, and a full width line, such as where an installed item came from, in banner.',
    'Give the buttons in the bar and the toolbar a hint, { label, description }: the layout is one HintScope.',
    'Give the layout a height, such as the window or a flex parent; the panels and the editor scroll inside it.',
    'The columns stack, list, editor, then inspector, only when the open panels, the folded rails and the editor do not fit side by side; the body then scrolls.',
    'Pass editorMinWidth for the narrowest editor the screen can work with, 192 px when left out; fold a panel to keep the columns on a narrow window.',
  ],
  a11y: [
    'The bar is a header with the title as a heading, h1 unless bar.level says otherwise.',
    'Each side panel is an aside named by its title, with a heading; the editor is a section named by editorLabel.',
    'The fold buttons are CollapseToggles: they say Hide or Show and the title, report aria-expanded and keep focus when the panel folds.',
    'Each group in the bar and the toolbar is a group named by its visible label.',
  ],
  tree: {
    path: ['layout', 'a list, an editor and an inspector side by side'],
    rule: 'StudioLayout draws every studio screen the same way: a raised bar, two SidePanels and a ToolFrame for the editor.',
  },
  example: `import { Button, StudioLayout } from '@drizztdourden08/tessera';
import type { ReactNode } from 'react';

const SpriteStudio = ({ name, list, sheet, facts }: { name: string; list: ReactNode; sheet: ReactNode; facts: ReactNode }) => (
  <StudioLayout
    bar={{
      caption: 'Character Studio',
      title: name,
      idleHint: 'Save keeps the sprite in this app.',
      groups: [{ id: 'save', label: 'Save to this app', content: <Button size="sm" hint={{ label: 'Save', description: 'Keeps your changes.' }}>Save</Button> }],
    }}
    start={{ title: 'Sprites', content: list, storageKey: 'studio.sprites' }}
    end={{ title: 'Properties', content: facts, storageKey: 'studio.properties' }}
    editorLabel="Sprite sheet"
  >
    {sheet}
  </StudioLayout>
);
`,
  propsHash: 'ef5713ce58729f70',
} satisfies ComponentUsage;

export { usage };
