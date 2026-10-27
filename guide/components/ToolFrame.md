# ToolFrame

A sunken frame for the thing being worked on, with its toolbar on the top edge, such as an editor, a canvas or a log.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { ToolFrame } from '@drizztdourden08/tessera';
```

The source is `src/primitives/ToolFrame/ToolFrame.tsx`. Its gallery page is Primitives · Layout/ToolFrame (`#/story/primitives-toolframe--overview`).

## Where the questions lead here

What are you placing? Layout. What are you arranging? A frame with a toolbar on its top edge.

ToolFrame is the one frame with tools on its top edge: StudioLayout holds its editor in it and LogPanel its lines.

## Use it when

- An editor or a canvas has tools that belong to it, such as View, Zoom or a filter, on its top edge.
- A block of content scrolls inside a fixed frame under its own tools.

## Use something else when

- A well with no tools of its own. Use [Box](Box.md) instead.
- A raised item with a heading and actions. Use `Card` instead.
- A stream of log lines with a filter and Copy. Use [LogPanel](LogPanel.md) instead.

## Rules

- Pass the tools in toolbar, such as ToolGroups or a FilterBar; it sits on the surface colour over a line.
- Give a SearchInput, Select or Combobox in the toolbar grow={false}, so it keeps a set width and sits on one line with the other tools.
- The content scrolls under the toolbar; give the frame a height or a flex parent.
- Pass padded for space around the content; leave it off when the content has its own, such as a list.
- Pass as and aria-label to name it, such as as="section" aria-label="Sprite sheet".

## Accessibility

- It adds no role; name it with as and aria-label when it holds the main work of the screen.
- The toolbar comes first in reading order, before the content.

## Example

```tsx
import { Button, ToolFrame, ToolGroups } from '@drizztdourden08/tessera';
import type { ReactNode } from 'react';

const ScriptEditor = ({ script, onRun }: { script: ReactNode; onRun: () => void }) => (
  <ToolFrame
    as="section"
    aria-label="Intro script"
    padded
    toolbar={<ToolGroups groups={[{ id: 'file', label: 'File', content: <Button size="sm" onClick={onRun}>Run</Button> }]} />}
  >
    {script}
  </ToolFrame>
);
```

## Props

- `as` (optional): `ElementType`.
- `toolbar` (optional): `ReactNode`.
- `padded` (optional): `boolean`. Default `false`.
- `children` (optional): `ReactNode`.

It also takes the 279 attributes it inherits through `HTMLAttributes<HTMLElement>`.

## Tokens

It draws on `--border-width-thin`, `--c-chrome`, `--c-chrome-border`, `--space-md`, `--space-sm`.
