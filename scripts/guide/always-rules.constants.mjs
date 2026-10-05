/* @layer tooling-scripts @kind data */
const ALWAYS_RULES = [
  {
    title: 'Tokens only',
    text: 'Every colour, length, space, radius, shadow, duration and layer comes from a Tessera token, written as `var(--token)`. App CSS holds no raw hex, px or ms values.',
  },
  {
    title: 'No hand-rolled replacements',
    text: 'When Tessera has a part for the job, use that part. Never restyle the inside of a Tessera part through its class names. A part Tessera lacks is a request to Tessera, not a local copy.',
  },
  {
    title: 'Text and structure through Tessera',
    text: 'Text goes through the text elements (`Paragraph`, `Span`, `Strong`, `Code` and the rest) and `Title`. Structure goes through `Box`. Never write bare lowercase JSX such as `<div>`, `<span>` or `<p>`.',
  },
  {
    title: 'Icons through Icon',
    text: 'Every icon is an `Icon` by name. A new icon joins the set through `TesseraProvider`, in `overrides.icons`.',
  },
  {
    title: 'App-wide swaps through TesseraProvider',
    text: 'Strings, icons, the spinner, the clipboard and the error fallback are swapped through the `overrides` of one `TesseraProvider`, set once at the app root. Links are not an override: use `Link` for URLs, and `Link` with `navigate` for app routes.',
  },
  {
    title: 'Accessibility',
    text: 'Every `IconButton` has a `label`. Every group of controls has an `aria-label`. Every input sits in a `Field`. Work in flight sets `loading`, not `disabled`. Never remove a focus ring.',
  },
  {
    title: 'Spacing by gaps',
    text: 'Space between items comes from the `gap` of `Flex`, `Stack` or `Grid`, never from margins.',
  },
  {
    title: 'Public imports only',
    text: 'Import from the package root or one of its public subpaths, and nothing deeper:',
  },
];

export { ALWAYS_RULES };
