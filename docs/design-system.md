<!-- @layer docs @kind doc -->
# How Tessera is built

Tessera is the design system shared by Relic of the Past, Brock and Archipelia. This page says what each part of it is for and where an app's own UI goes. For installing and theming, see `using-tessera.md`. For how code is written, see `coding-standards.md`.

## Tiers

| Tier | What it is | Lives in | Examples |
|---|---|---|---|
| Tokens | CSS custom properties: colour roles, space, sizes, type, motion | `src/tokens/` | `--c-primary`, `--space-md`, `--radius-lg` |
| Primitives | single-purpose building blocks; the only place raw HTML is written | `src/primitives/` | Box, Text, Button, TextInput, Field, Icon, Tooltip |
| Composites | parts built from primitives, holding layout and interaction | `src/composites/` | Dialog, DropdownMenu, DataTable, Wizard, SideNav |
| Brand | each app's mark, wordmark, mascot and gradient | `src/brand/`, files in `brand/` | Logo, BrandWordmark, Mascot |
| Data | headless logic and hooks with no markup: schema, table, filter, view state | `src/data/` | useDataTable, useViewState |

Tokens have one entry, `src/tokens/index.css`, with one file per concept behind it. CSS that several components share, such as the focus ring and the control sizes, sits in `src/theme/`.

Every tier is presentational. Data comes in through props and goes out through callbacks. Nothing in Tessera reads an app's stores, calls its IPC, or imports its router; a part that needs one of those takes it as a prop or through `TesseraProvider`.

## Raw HTML lives only in primitives

Only files in `src/primitives/` write lowercase JSX such as `<div>` or `<button>`. Everywhere else, composites, brand, stories and apps alike, builds from primitives: `Box` for a plain element (`<Box as="section">`), `Text` for text, `Flex` and `Stack` for layout, `Button` for a button. ESLint enforces it with `local/no-raw-html`, which is off for `src/primitives/**` alone, and `local/no-as-element-with-primitive` stops `as="button"` and the like when a primitive exists.

So a primitive is where an element gets its markup, its accessibility and its look once. When a composite needs an element no primitive draws, the fix is a new primitive, not raw HTML in the composite.

## The app's own tiers

Two tiers stay in each app, because they know its domain:

| Tier | What it is | Example |
|---|---|---|
| Compound | a presentational part for one of the app's concepts, built from Tessera parts; data in by props | SaveSlot, PlayerRow |
| View | a screen or feature that owns state and talks to stores, IPC or the router, then hands data down | ProfileHub, GameStore |

An app keeps them in its own source, for example `src/compounds/<Name>/` and `src/views/<Name>/`, as Archipelia does. Compounds follow the same rules as Tessera's tiers: no raw HTML, no stores, tokens only in CSS. Views are the one tier with logic and data.

To pick a tier: a part that touches stores, IPC or navigation is a View. A part tied to an app concept but only drawing it is a Compound. A part any app could use belongs in Tessera; ask for it instead of building it in the app (see `using-tessera.md`).

The gallery's Core · Setup pages show how to build each one: the folder, the usage file, the lint rules and an example. Building compounds and Building views cover the two app tiers. App primitives and composites covers the rare part only one app needs, which is not recommended and follows the same rules as Tessera's own.

## One component per folder

```text
<tier>/<Name>/
  <Name>.tsx            the component
  <Name>.css            its styles, tokens only, classes prefixed with its name
  <Name>.type.ts        its props and other types
  <Name>.constants.ts   static data, when it has any
  index.ts              the barrel
  behavior/             hooks and logic, one per file
  sub-components/       children used only here, in the same shape
```

`standards structure --check` rejects any other file at a component root, and the ESLint shape rules keep one export per file, types in `.type.ts` files and constants in `.constants.ts` files.

## Rules

- Use a token for every design value. A new value gets a token first.
- Express a variant through a prop, never a second component: `<Button variant="danger">`, not `DangerButton`.
- A pattern used twice gets extracted to the right tier.
- Style in the component's own CSS file. Inline `style` is for values computed at run time, and each such file is listed with its reason in `eslint.config.mjs`.
- Every exported part has a gallery page in `stories/`, registered in `.storylite/catalogue*.constants.ts`.
