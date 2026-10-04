# UtilityScreen

A compact screen for one short task: the page header shows the status with a spinner or a tone icon, then a centred message, settings, details, a framed notes box, progress, and a footer with a report button and the actions.

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

- The status is the page header, which every screen kind shows and nothing turns off: status.title is its title and the tone picks its icon.
- Set status.tone to busy while the task runs; it shows a spinner in place of the icon. Use status.icon for a closer icon, such as a download arrow.
- Write the status title as the state, such as Update available, and the message as one short line, such as the version.
- Put choices that shape the task, such as a pre-release toggle or a version picker, in settings, not in the children.
- Put long text, such as release notes, in notes: a framed box with its own scroll.
- Set progress only when the task can say how far it is.
- Pass report to offer a way to report a problem; it is one red bug icon button, never a bar of text.
- Put the main action last in actions, with variant primary, and keep one primary action.

## Accessibility

- The status title and the message are live regions: a screen reader reads each new one.
- The report button is named Report an issue from the strings, and shows the same words in a tooltip.
- The card is a modal dialog named by the title.

## Example

```tsx
import { Icon, Strong, UtilityScreen } from '@drizztdourden08/tessera';

interface UpdateCheckProps {
  notes: string;
  onClose: () => void;
  onInstall: () => void;
  onReport: () => void;
}

const UpdateCheck = ({ notes, onClose, onInstall, onReport }: UpdateCheckProps) => (
  <UtilityScreen
    title="Check for updates"
    onClose={onClose}
    status={{ tone: 'info', icon: <Icon name="download" />, title: 'Update available', message: <>Version <Strong>0.10.0</Strong> is available</> }}
    notes={{ title: 'What is new in 0.10.0', children: notes }}
    report={{ onClick: onReport }}
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
- `settings` (optional): `ReactNode`.
- `notes` (optional): `UtilityScreenNotes`.
- `children` (optional): `ReactNode`.
- `report` (optional): `UtilityScreenReport`.
- `actions` (optional): `readonly UtilityScreenAction[]`. Default `NO_ACTIONS`.
- `backdrop` (optional): `ReactNode`.
- `hidden` (optional): `boolean`.
- `className` (optional): `string`. Default `''`.

## Tokens

It draws on `--blur-glow`, `--border-width-thin`, `--c-danger`, `--c-primary`, `--c-primary-soft`, `--c-success`, `--c-sunken`, `--c-text`, `--c-text-dim`, `--c-text-muted`, `--c-warning`, `--leading-normal`, `--radius-md`, `--size-2`, `--size-32`, `--size-320`, `--space-2xs`, `--space-lg`, `--space-md`, `--space-sm`, `--space-xl`, `--space-xs`, `--text-base`, `--text-sm`, `--text-xs`, `--weight-semi`.
