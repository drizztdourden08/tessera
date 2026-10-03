# UtilityScreen

A compact screen for one short task: a status with an icon or a spinner, optional progress and details, and a row of actions.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { UtilityScreen } from '@drizztdourden08/tessera';
```

The source is `src/composites/UtilityScreen/UtilityScreen.tsx`. Its gallery page is Composites · Screens/UtilityScreen (`#/story/composites-utilityscreen--overview`).

## Where the questions lead here

What are you placing? A full screen view. What is the screen for? One short task with a status, such as an update check.

A status, details and actions in a compact window.

## Use it when

- The app checks for updates, imports a file or tests a connection, and shows how it went.
- The task has a few states, each with its own title, message and actions.

## Use something else when

- The user answers one question and nothing runs. Use `Dialog` instead.
- The screen holds settings or several pages. Use [WorkspaceScreen](WorkspaceScreen.md) instead.
- The screen is read, such as About or credits. Use [InfoScreen](InfoScreen.md) instead.
- The screen is one big custom surface. Use [StageScreen](StageScreen.md) instead.

## Rules

- Set status.tone to busy while the task runs; it shows a spinner in place of the icon.
- Write the status title as the state, such as You are up to date, and the message as what it means or what to do.
- Put the main action last in actions, with variant primary, and keep one primary action.
- Set progress only when the task can say how far it is.

## Accessibility

- The status is a live region: a screen reader reads each new title and message.
- The card is a modal dialog named by the title.

## Example

```tsx
import { UtilityScreen } from '@drizztdourden08/tessera';

const UpdateCheck = ({ onClose, onInstall }: { onClose: () => void; onInstall: () => void }) => (
  <UtilityScreen
    title="Check for updates"
    onClose={onClose}
    status={{ tone: 'info', title: 'Version 0.10.0 is ready', message: 'You have 0.9.2.' }}
    actions={[
      { label: 'Later', variant: 'ghost', onClick: onClose },
      { label: 'Install', variant: 'primary', onClick: onInstall },
    ]}
  />
);
```

## Props

- `title`: `ReactNode`.
- `onClose`: `() => void`.
- `status`: `UtilityScreenStatus`.
- `progress` (optional): `UtilityScreenProgress`.
- `children` (optional): `ReactNode`.
- `actions` (optional): `readonly UtilityScreenAction[]`. Default `NO_ACTIONS`.
- `hidden` (optional): `boolean`.
- `className` (optional): `string`. Default `''`.

## Tokens

It draws on `--c-danger`, `--c-info`, `--c-primary-bright`, `--c-success`, `--c-text`, `--c-warning`, `--size-48`, `--space-lg`, `--space-md`, `--space-sm`, `--text-lg`, `--weight-semi`.
