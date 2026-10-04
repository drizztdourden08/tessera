# ValidationSummary

What blocks a save, listed above the form in a toned box, each problem a link that moves focus to its field.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { ValidationSummary } from '@drizztdourden08/tessera';
```

The source is `src/composites/ValidationSummary/ValidationSummary.tsx`. Its gallery page is Composites · Forms/ValidationSummary (`#/story/composites-validationsummary--overview`).

## Where the questions lead here

What are you placing? Feedback. What are you telling the user? What blocks a save, with a jump to each field.

ValidationSummary lists what blocks a save in one place and takes the user to each field, the same way in every editor.

## Use it when

- A form or an editor cannot save or run until the user fixes one or more fields.
- The problems sit in fields the user may not see, such as rows of a long list or another section.

## Use something else when

- One note with no list, such as a warning about the whole page. Use `Callout` instead.
- Only one field is wrong and it is in view; its own error is enough. Use `Field` instead.
- A step of a wizard reports what stops it going on. Use `WizardStep` instead.

## Rules

- Write each problem as what to fix, such as Enter the path of the key file, and give it the field it belongs to.
- Move focus to the field in onFocusField, and scroll it into view; the summary does not know the form.
- Keep tone danger for what blocks the save, and warning for options to check that do not.
- Show the summary once the user tries to save, or keep it in step with the form; leave it out when nothing is wrong.

## Accessibility

- The box is an alert, so a screen reader reads the title and the problems when it appears.
- The problems are a list; one with a field is a button named by its message, the arrow hidden.
- And N more shows the rest and moves focus to the first problem it revealed.

## Example

```tsx
import { ValidationSummary } from '@drizztdourden08/tessera';
import type { ValidationProblem } from '@drizztdourden08/tessera';

interface ServerProblemsProps {
  problems: ValidationProblem[];
  focusField: (field: string) => void;
}

const ServerProblems = ({ problems, focusField }: ServerProblemsProps) => (
  <ValidationSummary problems={problems} onFocusField={focusField} />
);
```

## Props

- `title` (optional): `ReactNode`.
- `problems`: `readonly ValidationProblem[]`.
- `max` (optional): `number`. Default `DEFAULT_MAX`.
- `tone` (optional): `ValidationTone`, one of `'danger'`, `'warning'`. Default `'danger'`.
- `onFocusField` (optional): `(field: string) => void`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--c-border-strong`, `--c-text`, `--c-text-dim`, `--callout-ink`, `--radius-sm`, `--space-2xs`, `--space-lg`, `--space-md`, `--space-sm`, `--space-xs`, `--text-base`, `--weight-semi`.
