# SectionTimeline

A vertical list of links to the sections of a long page, in titled groups, beside a line that fills as the reader scrolls.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { SectionTimeline } from '@drizztdourden08/tessera';
```

The source is `src/composites/SectionTimeline/SectionTimeline.tsx`. Its gallery page is Composites · Navigation/SectionTimeline (`#/story/composites-sectiontimeline--overview`).

## Where the questions lead here

What are you placing? Navigation. Where does the user go? Between sections of one long page.

SectionTimeline is the side list of a long page: grouped section links beside a line that fills as the page scrolls.

## Use it when

- A long page, such as a website or a manual, has sections in groups and the reader needs to see where they are.
- The list sits in a side column that stays in view while the page scrolls.

## Use something else when

- The sections are shown as pills in the header of a page. Use `HeaderAnchorNav` instead.
- The list switches between the screens of a window. Use [SideNav](SideNav.md) instead.
- The steps of one task are shown with a done state. Use `Stepper` instead.

## Rules

- Pass groups, each with an id, a label and children; a child has an id, a label and the href of its section.
- Pass activeId for the section in view; the host owns it, as with HeaderAnchorNav.
- Pass onJump to follow a link yourself, such as a smooth scroll or a route; the browser then does not jump.
- Pass timeline="scroll" to fill the line from the scroll of the page, or a name such as "--page" for a view timeline you set on the sections.
- Set timeline-scope with that name on a common parent of the page and the timeline, so the line can read it.
- Without scroll-driven animation, or with reduced motion, the line jumps to progress, or to the active section when progress is left out.
- Pass progress from 0 to 1 when you track the scroll yourself; it wins over activeId.
- Pass state="idle" to dim it until the pointer or focus enters, and state="hidden" to remove it, such as on a narrow page.

## Accessibility

- It is a nav named by ariaLabel, holding a list of groups; each group is a list named by its title.
- The active link has aria-current="location"; a hidden timeline is out of the reading order.
- The line and its fill are decorative and hidden from screen readers.
- With reduced motion the fill jumps instead of animating, and it never runs a time-based animation.

## Example

```tsx
import { useState } from 'react';
import { SectionTimeline } from '@drizztdourden08/tessera';

const GROUPS = [
  { id: 'start', label: 'Start', children: [{ id: 'intro', label: 'Intro', href: '#intro' }, { id: 'setup', label: 'Setup', href: '#setup' }] },
  { id: 'play', label: 'Play', children: [{ id: 'rules', label: 'Rules', href: '#rules' }] },
];

const PageTimeline = () => {
  const [active, setActive] = useState('intro');
  return (
    <SectionTimeline
      ariaLabel="On this page"
      groups={GROUPS}
      activeId={active}
      timeline="scroll"
      onJump={(id) => {
        setActive(id);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }}
    />
  );
};
```

## Props

- `groups`: `readonly SectionTimelineGroup[]`.
- `ariaLabel`: `string`.
- `activeId` (optional): `string`.
- `onJump` (optional): `(id: string) => void`.
- `state` (optional): `SectionTimelineState`, one of `'live'`, `'idle'`, `'hidden'`. Default `'live'`.
- `progress` (optional): `number`.
- `timeline` (optional): `SectionTimelineDriver`.
- `className` (optional): `string`. Default `''`.

## Tokens

It draws on `--border-width-thick`, `--c-border`, `--c-primary`, `--c-primary-bright`, `--c-text`, `--c-text-dim`, `--c-text-muted`, `--duration-normal`, `--duration-slow`, `--ease-out`, `--ease-standard`, `--opacity-faint`, `--radius-pill`, `--section-timeline-name`, `--section-timeline-progress`, `--space-2xs`, `--space-lg`, `--space-xs`, `--text-sm`, `--weight-semi`.
