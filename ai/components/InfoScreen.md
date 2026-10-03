# InfoScreen

A screen to read, such as About or credits: wide margins and one centred column that scrolls.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { InfoScreen } from '@drizztdourden08/tessera';
```

The source is `src/composites/InfoScreen/InfoScreen.tsx`. Its gallery page is Composites · Screens/InfoScreen (`#/story/composites-infoscreen--overview`).

## Where the questions lead here

What are you placing? A full screen view. What is the screen for? Reading, such as About or credits.

One centred column to read.

## Use it when

- About the app, credits, a licence or a welcome page.
- The user reads and changes nothing.

## Use something else when

- The screen holds settings or several pages. Use [WorkspaceScreen](WorkspaceScreen.md) instead.
- The screen runs one short task with a status and actions. Use [UtilityScreen](UtilityScreen.md) instead.
- The screen is one big custom surface. Use [StageScreen](StageScreen.md) instead.

## Rules

- Put a logo, a wordmark or a hero in lead, and the sections in the children.
- Keep width="readable" for text; use width="wide" for a grid of cards, as credits need.
- Put legal text in footer, never in the last section.
- An AboutPanel goes in as the children of an About screen.

## Accessibility

- The card is a modal dialog named by the title.
- Give each section a heading, so a screen reader can jump between them.

## Example

```tsx
import { AboutPanel, InfoScreen } from '@drizztdourden08/tessera';

const AboutScreen = ({ onClose }: { onClose: () => void }) => (
  <InfoScreen title="About" onClose={onClose} footer="Names and marks belong to their owners.">
    <AboutPanel title="Relic of the Past" brand="rotp" rows={[{ label: 'Version', value: '0.9.2' }]} />
  </InfoScreen>
);
```

## Props

- `title`: `ReactNode`.
- `onClose`: `() => void`.
- `children`: `ReactNode`.
- `lead` (optional): `ReactNode`.
- `footer` (optional): `ReactNode`.
- `width` (optional): `InfoScreenWidth`, one of `'readable'`, `'wide'`. Default `'readable'`.
- `floating` (optional): `ReactNode`.
- `hidden` (optional): `boolean`.
- `className` (optional): `string`. Default `''`.

## Tokens

It draws on `--border-width-thin`, `--c-hairline`, `--c-text-dim`, `--dialog-w-md`, `--size-1024`, `--space-2xl`, `--space-lg`, `--space-md`, `--space-xl`, `--text-sm`.
