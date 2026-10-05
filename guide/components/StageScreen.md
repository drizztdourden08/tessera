# StageScreen

One big open stage for custom work with no navigation of its own, under the page header, which holds an optional toolbar and a Done button.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { StageScreen } from '@drizztdourden08/tessera';
```

The source is `src/composites/StageScreen/StageScreen.tsx`. Its gallery page is Composites · Screens/StageScreen (`#/story/composites-stagescreen--overview`).

## Where the questions lead here

What are you placing? A full screen view. What is the screen for? One big custom surface, such as calibration.

One open stage with an optional toolbar.

## Use it when

- Controller calibration, HUD layout, a map or an editor the app draws itself.
- The content is one surface, not pages or sections.

## Use something else when

- The screen has pages the user moves between. Use [WorkspaceScreen](WorkspaceScreen.md) instead.
- The screen is read, such as About or credits. Use [InfoScreen](InfoScreen.md) instead.
- The app runs one short task and reports a status. Use [UtilityScreen](UtilityScreen.md) instead.

## Rules

- Give it an icon and a heading for the page header, which StageScreen always shows and nothing turns off.
- Keep the toolbar to a status and a few tools; it sits in the header after the heading and is not a place for navigation.
- Set done when the work ends with a clear finish; the close button still closes without it.
- Put each calibration step on the stage in its own Card, with a SectionHeader that says what to do.
- The stage scrolls when its content is larger; a canvas that pans itself sets its own size to fill the stage.

## Accessibility

- The card is a modal dialog named by the title.
- Custom content on the stage brings its own roles and keyboard support.

## Example

```tsx
import { Icon, StageScreen, Status } from '@drizztdourden08/tessera';

const Calibration = ({ onClose }: { onClose: () => void }) => (
  <StageScreen
    title="Input calibration"
    icon={<Icon name="gamepad-2" />}
    heading="Xbox controller"
    onClose={onClose}
    toolbar={<Status tone="success" variant="pill">Controller connected</Status>}
    done={{ onSelect: onClose }}
  >
    Calibration steps
  </StageScreen>
);
```

## Props

- `title`: `ReactNode`.
- `icon`: `ReactNode`.
- `heading`: `ReactNode`.
- `onClose`: `() => void`.
- `children`: `ReactNode`.
- `subtitle` (optional): `ReactNode`.
- `toolbar` (optional): `ReactNode`.
- `done` (optional): `StageScreenDone`.
- `backdrop` (optional): `ReactNode`.
- `floating` (optional): `ReactNode`.
- `hidden` (optional): `boolean`.
- `className` (optional): `string`. Default `''`.

## Tokens

It draws on `--border-width-thin`, `--c-border-strong`, `--space-lg`, `--space-sm`.
