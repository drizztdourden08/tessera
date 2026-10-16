# InfoScreen

An informational window to read, such as About or credits: a small dialog sized to its content and centred, with the title bar, the close button and one column.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { InfoScreen } from '@drizztdourden08/tessera';
```

The source is `src/composites/InfoScreen/InfoScreen.tsx`. Its gallery page is Composites · Screens/InfoScreen (`#/story/composites-infoscreen--overview`).

## Where the questions lead here

What are you placing? A full screen view. What is the screen for? An informational window with no tools, such as About or credits.

A small dialog sized to its content, one column to read.

## Use it when

- About the app, credits, a licence or a welcome page.
- The user reads and changes nothing: the window has no tools.

## Use something else when

- The screen holds settings or several pages. Use [WorkspaceScreen](WorkspaceScreen.md) instead.
- The screen runs one short task with a status and actions. Use [UtilityScreen](UtilityScreen.md) instead.
- The screen is one big custom surface. Use [StageScreen](StageScreen.md) instead.

## Rules

- It opens small: the card fits its content, centred, at most 512 px wide, and only the column scrolls, once the window is too short for it.
- Every informational window uses it, so About, credits and the like open at the same small size. A screen with tools is a WorkspaceScreen, a UtilityScreen or a StageScreen.
- It has no page header and nothing adds one: the window title bar names it, and the column sits right under it.
- Put a logo, the app name, a wordmark or a hero in lead, and the sections in the children.
- List credits one entry per line; never widen the window for a grid of cards.
- Put legal text in footer, never in the last section.
- In a window under 560 px wide the card fills it and the column takes its width; lay out lead and sections so they wrap.
- On an About screen, put the logo and the app name in lead and the build facts in a FactsPanel.

## Accessibility

- The card is a modal dialog named by the title.
- Give each section a heading, so a screen reader can jump between them.

## Example

```tsx
import { FactsPanel, H2, InfoScreen, Logo } from '@drizztdourden08/tessera';

const AboutScreen = ({ onClose }: { onClose: () => void }) => (
  <InfoScreen
    title="About"
    onClose={onClose}
    lead={<><Logo brand="rotp" variant="app-icon" size="xl" title="" /><H2>Relic of the Past</H2></>}
    footer="Names and marks belong to their owners."
  >
    <FactsPanel label="This build" groups={[[{ label: 'Version', value: '0.9.2', mono: true }]]} />
  </InfoScreen>
);
```

## Props

- `title`: `ReactNode`.
- `onClose`: `() => void`.
- `children`: `ReactNode`.
- `lead` (optional): `ReactNode`.
- `footer` (optional): `ReactNode`.
- `floating` (optional): `ReactNode`.
- `hidden` (optional): `boolean`.
- `className` (optional): `string`. Default `''`.

## Tokens

It draws on `--border-width-thin`, `--c-hairline`, `--c-text-dim`, `--space-lg`, `--space-md`, `--space-xl`, `--text-sm`.
