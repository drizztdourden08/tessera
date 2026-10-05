# GuidedTour

A tour of a screen, step by step: one part stays lit with a glow while the rest dims and blurs, a bubble explains it and the mascot presents it.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { GuidedTour } from '@drizztdourden08/tessera';
```

The source is `src/composites/GuidedTour/GuidedTour.tsx`. Its gallery page is Composites · Overlays/GuidedTour (`#/story/composites-guidedtour--overview`).

## Where the questions lead here

What are you placing? Something over the page. What sits over the page? A guided tour of the screen, one part at a time.

GuidedTour lights one target per step, runs the step onEnter first, and lets the mascot walk beside the bubble, facing the target.

## Use it when

- A first run shows a new user around a screen, one part at a time.
- A new feature needs a short walk through the parts it touches, such as a panel that opens.

## Use something else when

- One shortcut is taught on a drawn keyboard. Use `ShortcutTour` instead.
- A hint explains one control on hover or focus. Use `Tooltip` instead.
- A task is done in steps, with values the user enters. Use `Wizard` instead.

## Rules

- Write the steps as data and keep them in a memo, since onEnter runs each time its step shows.
- Mark a target with data-tour and point at it with { tour }, or pass a ref; a step without a target sits in the middle.
- Change the state of the app in onEnter, such as opening a panel or a tab, and make it safe to run twice.
- Use advance: 'click' only when the click itself does what the step teaches, such as opening the settings.
- Keep a tour short, five or six steps, with a title of a few words and a body of one or two lines.
- Pass step and open with onStepChange and onOpenChange when the app must keep where the tour is.

## Accessibility

- The bubble is a dialog named by its title; focus moves to it on each step and goes back where it was on close.
- A status line reads each step as Step 2 of 6 and the title.
- The rest of the page is inert; on a click step the lit part stays reachable by Tab, Enter and a click.
- Right or Enter goes on, Left goes back and Escape closes; tour.shortcuts lists them for a ShortcutList.
- With reduced motion the highlight and the mascot move at once and nothing fades.

## Example

```tsx
import { useMemo } from 'react';
import { Button, GuidedTour, useGuidedTour } from '@drizztdourden08/tessera';
import type { TourStep } from '@drizztdourden08/tessera';

const HomeTour = ({ openSettings }: { openSettings: () => void }) => {
  const steps = useMemo<TourStep[]>(() => [
    { id: 'welcome', title: 'Welcome', body: 'A short walk through the screen.', mascot: 'wave' },
    { id: 'pages', target: { tour: 'pages' }, placement: 'right-start', title: 'Pages', body: 'Every page lives here.' },
    { id: 'gear', target: { tour: 'gear' }, advance: 'click', title: 'Settings', body: 'Click the gear to open the settings.' },
    { id: 'panel', target: { tour: 'settings' }, title: 'Settings', body: 'Changes apply at once.', onEnter: openSettings },
  ], [openSettings]);
  const tour = useGuidedTour({ steps });
  return (
    <>
      <Button onClick={() => tour.start()}>Take the tour</Button>
      <GuidedTour tour={tour} mascot="auto" />
    </>
  );
};
```

## Props

- `tour`: `GuidedTourApi`.
- `mascot` (optional): `AnimatedMascotChoice | false`, one of `'archipelia'`, `'auto'`, `'brock'`, `'rotp'`, `false`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--border-width-thin`, `--c-border`, `--c-primary`, `--c-primary-bright`, `--c-surface`, `--c-text`, `--c-text-dim`, `--duration-drawer`, `--duration-normal`, `--duration-slow`, `--ease-emphasized`, `--ease-standard`, `--leading-normal`, `--radius-lg`, `--radius-xl`, `--shadow-lg`, `--size-1`, `--size-24`, `--size-320`, `--space-2xs`, `--space-lg`, `--space-md`, `--space-sm`, `--space-xl`, `--space-xs`, `--text-base`, `--text-sm`, `--text-xs`, `--weight-medium`, `--z-floating`, `--z-popover`.

## Also exported from this folder

`useGuidedTour`.
