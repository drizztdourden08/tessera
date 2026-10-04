# Rules for every Tessera screen

These rules hold on every screen and for every component. A component page adds its own rules on top of them.

## 1. Tokens only

Every colour, length, space, radius, shadow, duration and layer comes from a Tessera token, written as `var(--token)`. App CSS holds no raw hex, px or ms values.

## 2. No hand-rolled replacements

When Tessera has a part for the job, use that part. Never restyle the inside of a Tessera part through its class names. A part Tessera lacks is a request to Tessera, not a local copy.

## 3. Text and structure through Tessera

Text goes through the text elements (`Paragraph`, `Span`, `Strong`, `Code` and the rest) and `Title`. Structure goes through `Box`. Never write bare lowercase JSX such as `<div>`, `<span>` or `<p>`.

## 4. Icons through Icon

Every icon is an `Icon` by name. A new icon joins the set through `TesseraProvider`, in `overrides.icons`.

## 5. App-wide swaps through TesseraProvider

Strings, icons, the spinner, the clipboard and the error fallback are swapped through the `overrides` of one `TesseraProvider`, set once at the app root. Links are not an override: use `Link` for URLs and `RouterLink` for app routes.

## 6. Accessibility

Every `IconButton` has a `label`. Every group of controls has an `aria-label`. Every input sits in a `Field`. Work in flight sets `loading`, not `disabled`. Never remove a focus ring.

## 7. Spacing by gaps

Space between items comes from the `gap` of `Flex`, `Stack` or `Grid`, never from margins.

## 8. Public imports only

Import from the package root or one of its public subpaths, and nothing deeper:

- `@drizztdourden08/tessera`
- `@drizztdourden08/tessera/brand`
- `@drizztdourden08/tessera/color-picker`
- `@drizztdourden08/tessera/color-picker-popover`
- `@drizztdourden08/tessera/composites`
- `@drizztdourden08/tessera/data`
- `@drizztdourden08/tessera/field-kits`
- `@drizztdourden08/tessera/primitives`
