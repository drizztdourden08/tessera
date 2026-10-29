# Callout

A short note set apart from the text around it, such as a pre-release notice, a banner with a title and an action, or the fine print of a dialog.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/primitives`.

```tsx
import { Callout } from '@drizztdourden08/tessera';
```

The source is `src/primitives/Callout/Callout.tsx`. Its gallery page is Primitives · Feedback/Callout (`#/story/primitives-callout--overview`).

## Where the questions lead here

What are you placing? Feedback. What are you telling the user? A note that stays on the page.

Callout is the one note in the flow of the page. A banner is a Callout with a title, and LoadError and ValidationSummary draw on it.

## Use it when

- A note must stay on the page until the cause is gone, such as a pre-release notice or a failed install.
- A banner needs a bold first line, a short sentence and one action, such as Get the package.

## Use something else when

- The message comes and goes on its own. Use [Toast](Toast.md) instead.
- The note floats over the page and points at one thing. Use [SpeechBubble](SpeechBubble.md) instead.
- Something failed to load and can be tried again. Use [LoadError](LoadError.md) instead.

## Rules

- A banner is a Callout with a title: pass title for the bold first line and keep the children to one short sentence.
- Pick tone for the meaning: danger for a failure, warning for a risk, info for news, success for a thing that worked.
- Pass action for the one button the banner offers, and icon to lead the line; both are optional.
- Use variant footnote for fine print under a hairline; it takes no fill and is not for banners.
- Put long text or a raw error in details, which sits under the line across the whole box.

## Accessibility

- It is a note and adds no alert, so a screen reader reads it in place, title first and then the text.
- The title is a plain line, not a heading, so it does not change the outline of the page.
- The icon is decoration and is not announced; the tone is never the only carrier of the meaning.

## Example

```tsx
import { Button, Callout, Icon } from '@drizztdourden08/tessera';

const PackageBanner = ({ onGet }: { onGet: () => void }) => (
  <Callout
    tone="danger"
    title="The package could not be installed"
    icon={<Icon name="triangle-alert" size={16} />}
    action={<Button size="sm" variant="danger" onClick={onGet}>Get the package</Button>}
  >
    Check your connection and try again.
  </Callout>
);
```

## Props

- `tone` (optional): `CalloutTone`, one of `'primary'`, `'secondary'`, `'info'`, `'success'`, `'warning'`, `'danger'`. Default `'primary'`.
- `variant` (optional): `CalloutVariant`, one of `'box'`, `'footnote'`. Default `'box'`.
- `title` (optional): `ReactNode`.
- `icon` (optional): `ReactNode`.
- `action` (optional): `ReactNode`.
- `details` (optional): `ReactNode`.
- `className` (optional): `string`. Default `''`.
- `children`: `ReactNode`.

## Tokens

It draws on `--border-width-thin`, `--c-border`, `--c-danger`, `--c-danger-soft`, `--c-info`, `--c-info-soft`, `--c-primary`, `--c-primary-soft`, `--c-secondary`, `--c-secondary-soft`, `--c-success`, `--c-success-soft`, `--c-text`, `--c-warning`, `--c-warning-soft`, `--radius-md`, `--space-md`, `--space-sm`, `--space-xs`, `--text-sm`, `--text-xs`, `--weight-semi`.
