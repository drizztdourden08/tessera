# Test clean-up, part 1 of 3

Verdicts against the shared test standard. This part covers the files of `tests/` from the first one up to and including `guided-tour-parts.test.mjs`. The brief named 146 files; the sorted list holds 144. Nothing was run in this pass (no tests, lint or typecheck); the checker runs them.

A case is one `it` or `test` call site. An `it.each` counts as one, and a loop that calls `it` counts as one. The same count was used before and after, so the numbers compare, but they undercount each-expanded cases.

Branch: test-cleanup/part-1.

## Counts

| | before | after |
|---|---|---|
| files | 144 | 98 |
| cases | 1209 | 705 |
| tagged critical | 0 | 619 |
| tagged standard | 0 | 29 |
| tagged e2e | 0 | 57 |
| untagged | 1209 | 0 |

Of the 144 files, 46 were deleted whole, 69 lost cases and 29 were kept as they were (with tags added).

## How the verdicts fell

Most old tests drew a component with `renderToString` and asserted class names, attributes or CSS text. Those are W3 (markup, CSS and layout) or W1 (reads source files and asserts text), and they went. The pure functions of `behavior/`, the hook tests on the harness and the fake-DOM tests stayed as K1, or K2 to K4 where they fit.

- Critical: no process, no network, no build, no real file outside a temp folder, no timers.
- Standard: tests with fake timers (`armed-icon-button`, `button-hint`, `carousel-turn`, `confirm-ask`, `date-elapsed`, `date-text`, `guided-tour-hooks`).
- E2E: tests that run a child process or a real tool (`app-parts`, `app-usage`, `cli-app`, `cli-tessera`, the `tessera` bin in `cli-parts`, `guide`, `guide-checks`).
- Per-test timeouts and long `beforeAll` limits were removed from every kept file. The `TIMEOUT` constants are gone from the tests.
- `guided-tour-hooks`: the two step event tests slept on a real 5 ms timer (W7). They now run on fake timers and advance them, and they are tagged standard.

## Files

| file | verdict | rule | cases before | cases after |
|---|---|---|---|---|
| action-bar.test.mjs | trim | K1 | 13 | 7 |
| action-data.test.mjs | delete | W3 | 2 | 0 |
| action-tile.test.mjs | delete | W3 | 5 | 0 |
| anchor-picker.test.mjs | trim | K1 | 14 | 7 |
| anchored-dismiss.test.mjs | delete | W6 | 2 | 0 |
| anchored-fallback.test.mjs | trim | K1 | 3 | 2 |
| anchored-fit.test.mjs | trim | K1 | 16 | 14 |
| anchored-rect.test.mjs | trim | K1 | 8 | 7 |
| angle-field.test.mjs | trim | K1 | 8 | 6 |
| animated-mascot.test.mjs | trim | K1 | 11 | 8 |
| app-parts.test.mjs | keep | E2 | 7 | 7 |
| app-usage.test.mjs | keep | E2, K1 | 15 | 15 |
| argus-agents-tab.test.mjs | trim | K1 | 14 | 1 |
| argus-mark-ink.test.mjs | trim | K1 | 4 | 2 |
| argus-opt-in-props.test.mjs | trim | K1 | 8 | 1 |
| argus-parity.test.mjs | trim | K1 | 24 | 1 |
| armed-icon-button.test.mjs | trim | S1 | 9 | 8 |
| armed-icon.test.mjs | delete | W3 | 4 | 0 |
| audit-options.test.mjs | delete | W3 | 8 | 0 |
| backdrop-layer.test.mjs | trim | K1 | 7 | 3 |
| badge-hide-zero.test.mjs | trim | K1 | 4 | 1 |
| badge-text.test.mjs | trim | K1 | 8 | 6 |
| box-surface.test.mjs | delete | W1 | 5 | 0 |
| brand-file-types.test.mjs | trim | K1 | 7 | 5 |
| brand-gradient-contrast.test.mjs | delete | W1 | 1 | 0 |
| brand-mark-fill.test.mjs | delete | W3 | 5 | 0 |
| brand-mark-height.test.mjs | delete | W3 | 8 | 0 |
| brand-mark-paths.test.mjs | delete | W3 | 7 | 0 |
| brand-rim.test.mjs | delete | W3 | 4 | 0 |
| breadcrumbs.test.mjs | trim | K1 | 16 | 7 |
| button-cta.test.mjs | delete | W3 | 10 | 0 |
| button-gradient.test.mjs | delete | W1 | 5 | 0 |
| button-hint.test.mjs | trim | S1 | 3 | 2 |
| button-icon-fit.test.mjs | delete | W1 | 4 | 0 |
| button-pixel.test.mjs | delete | W1 | 5 | 0 |
| callout-block-body.test.mjs | delete | W3 | 1 | 0 |
| callout.test.mjs | delete | W3 | 2 | 0 |
| card-edge.test.mjs | delete | W3 | 5 | 0 |
| card-fill.test.mjs | delete | W3 | 2 | 0 |
| card-flush.test.mjs | delete | W3 | 3 | 0 |
| card-header.test.mjs | delete | W3 | 3 | 0 |
| carousel-turn.test.mjs | keep | S2 | 10 | 10 |
| carousel.test.mjs | delete | W3 | 6 | 0 |
| catalogue-jobs.test.mjs | keep | K1 | 1 | 1 |
| charts.test.mjs | trim | K1 | 23 | 19 |
| check-list.test.mjs | delete | W3 | 4 | 0 |
| checkbox-tooltip.test.mjs | delete | W3 | 5 | 0 |
| choice-grid.test.mjs | trim | K1 | 23 | 17 |
| choice-mark.test.mjs | delete | W3 | 5 | 0 |
| cli-app.test.mjs | keep | E2 | 9 | 9 |
| cli-monorepo.test.mjs | keep | K2 | 12 | 12 |
| cli-parts.test.mjs | keep | E2, K1, K2 | 12 | 12 |
| cli-tessera.test.mjs | keep | E2 | 12 | 12 |
| collapse-toggle.test.mjs | trim | K1 | 6 | 1 |
| color-oklch.test.mjs | keep | K1 | 12 | 12 |
| color-picker-drop-up.test.mjs | trim | K1 | 5 | 4 |
| color-picker-modes.test.mjs | delete | W3 | 11 | 0 |
| color-swatch-alpha.test.mjs | trim | K1 | 5 | 1 |
| color-swatch-marks.test.mjs | trim | K1 | 17 | 4 |
| color-swatch-ref.test.mjs | delete | W1 | 2 | 0 |
| command-combobox-keys.test.mjs | trim | K1 | 18 | 17 |
| command-combobox.test.mjs | delete | W3 | 6 | 0 |
| command-input.test.mjs | trim | K1 | 13 | 10 |
| command-palette-escape.test.mjs | keep | K1 | 6 | 6 |
| command-suggest.test.mjs | trim | K1 | 9 | 7 |
| config-loader.test.mjs | trim | K1 | 12 | 11 |
| confirm-ask-focus.test.mjs | trim | K1 | 10 | 8 |
| confirm-ask.test.mjs | trim | K1, S2 | 11 | 9 |
| context-menu.test.mjs | trim | K1 | 14 | 12 |
| control-grow.test.mjs | trim | K1 | 4 | 1 |
| control-menu.test.mjs | trim | K1 | 6 | 5 |
| control-names.test.mjs | delete | W3 | 8 | 0 |
| control-size.test.mjs | delete | W3 | 3 | 0 |
| controller-silhouette.test.mjs | delete | W3 | 7 | 0 |
| copy-value.test.mjs | delete | W3 | 10 | 0 |
| data-table-cell-controls.test.mjs | keep | K1 | 7 | 7 |
| data-table-controlled.test.mjs | trim | K1 | 14 | 6 |
| data-table-detail.test.mjs | trim | K1 | 16 | 9 |
| data-table-footer.test.mjs | delete | W3 | 2 | 0 |
| data-table-groups.test.mjs | keep | K1 | 12 | 12 |
| data-table-rows.test.mjs | keep | K1 | 23 | 23 |
| data-table-virtual.test.mjs | delete | W3 | 2 | 0 |
| date-elapsed.test.mjs | trim | K1, S2 | 13 | 9 |
| date-format-only.test.mjs | trim | K1 | 3 | 1 |
| date-text.test.mjs | trim | K1, S2 | 7 | 5 |
| declared-options.test.mjs | trim | K2 | 7 | 5 |
| density-scope.test.mjs | delete | W3 | 7 | 0 |
| description-markup.test.mjs | trim | K1, K4 | 12 | 10 |
| dialog-data.test.mjs | delete | W3 | 3 | 0 |
| dialog-fit.test.mjs | delete | W3 | 3 | 0 |
| dialog-focus.test.mjs | keep | K1 | 13 | 13 |
| dialog-sizing.test.mjs | delete | W1 | 12 | 0 |
| disabled-overlay-placement.test.mjs | delete | W3 | 3 | 0 |
| disclosure-end.test.mjs | trim | K1 | 3 | 1 |
| disclosure-open.test.mjs | trim | K1 | 4 | 3 |
| dismiss-layers.test.mjs | keep | K1 | 4 | 4 |
| dismiss-listeners.test.mjs | keep | K1 | 3 | 3 |
| dock-corner-hit.test.mjs | trim | K1 | 11 | 9 |
| dock-corner.test.mjs | keep | K1 | 21 | 21 |
| dock-float-snap.test.mjs | keep | K1 | 9 | 9 |
| dock-groups.test.mjs | keep | K1 | 13 | 13 |
| dock-handle.test.mjs | keep | K1 | 7 | 7 |
| dock-make-room.test.mjs | keep | K3 | 6 | 6 |
| dock-peek-keys.test.mjs | trim | K1 | 4 | 2 |
| dock-resize-push.test.mjs | keep | K1 | 13 | 13 |
| dock-zones.test.mjs | delete | W3 | 3 | 0 |
| document-tabs-menu.test.mjs | trim | K1 | 5 | 3 |
| document-tabs.test.mjs | trim | K1 | 22 | 5 |
| drawer-focus.test.mjs | delete | W6 | 5 | 0 |
| drawer-header.test.mjs | delete | W3 | 9 | 0 |
| drawer-size.test.mjs | delete | W3 | 2 | 0 |
| drop-zone-paste.test.mjs | keep | K1 | 2 | 2 |
| drop-zone-take.test.mjs | trim | K1 | 5 | 3 |
| dropdown-menu-confirm.test.mjs | trim | K1 | 7 | 2 |
| dropdown-menu-join.test.mjs | keep | K1 | 9 | 9 |
| dropdown-menu-side.test.mjs | keep | K1 | 6 | 6 |
| dropdown-menu.test.mjs | trim | K1 | 22 | 11 |
| dynamic-input-rules.test.mjs | trim | K1 | 24 | 21 |
| dynamic-input.test.mjs | trim | K1 | 20 | 17 |
| escape-stack.test.mjs | keep | K1 | 10 | 10 |
| facts-align.test.mjs | delete | W3 | 4 | 0 |
| facts-frameless.test.mjs | delete | W3 | 2 | 0 |
| field-invalid-controls.test.mjs | trim | K2 | 6 | 1 |
| field-reports.test.mjs | keep | K1 | 5 | 5 |
| field-width.test.mjs | delete | W1 | 8 | 0 |
| file-drag-disabled.test.mjs | trim | K1 | 5 | 4 |
| file-drag.test.mjs | trim | K1 | 5 | 4 |
| file-list.test.mjs | trim | K1 | 5 | 2 |
| filter-bar-chips.test.mjs | trim | K1 | 11 | 9 |
| flint-mascot.test.mjs | trim | K1 | 9 | 3 |
| floating-prompt.test.mjs | trim | K1 | 11 | 4 |
| fold-text-hint.test.mjs | trim | K1 | 8 | 4 |
| fold-text-middle.test.mjs | trim | K1 | 10 | 7 |
| form-row-label.test.mjs | trim | K1 | 9 | 1 |
| grid-fit.test.mjs | keep | K1 | 3 | 3 |
| group-tree.test.mjs | trim | K1 | 21 | 14 |
| guide-checks.test.mjs | trim | E2, K1 | 12 | 11 |
| guide.test.mjs | trim | E2 | 11 | 5 |
| guided-tour-clear.test.mjs | trim | K1 | 9 | 8 |
| guided-tour-fit.test.mjs | trim | K1 | 9 | 7 |
| guided-tour-hooks.test.mjs | keep | K1, S2 | 4 | 4 |
| guided-tour-intro-labels.test.mjs | trim | K1 | 3 | 1 |
| guided-tour-intro.test.mjs | trim | K1 | 12 | 8 |
| guided-tour-parts.test.mjs | trim | K1 | 12 | 10 |

## Deleted cases that would have been critical

These are K1 to K5 shaped. Each went because the check lived in markup, CSS text or source text, not in a function. The ones marked lint should become a lint rule.

- `brand-gradient-contrast`: mark contrast per gradient stop, read from the brand SVG files (K1 data invariant). Lint.
- `button-gradient` and `button-pixel`: label contrast per palette, read from token sources (K1). Lint.
- `brand-file-types`: the case that every file the packager copies is written (reads the real brand files).
- `argus-agents-tab`: the track-drop token matches the CSS container queries (K1). Lint.
- `armed-icon`: the load-state icon equals the armed icon data.
- `check-list`: the shape of the `checkStatuses` table.
- `action-bar`: the primary action draws last.
- `controller-silhouette`: the outline mirrors and stays inside its bounds (data invariant, checked through the drawn path).
- `dialog-sizing`: the size tokens climb from small to large and min is not above max (K1 token invariant, read from CSS). Lint.
- `date-format-only`: the scan that date calls live only in `date-format` (W1). Lint.
- `dialog-data`: id and data attributes land on the dialog element (K2 shaped, checked through markup).
- `form-row-label`: the name is a label for the control, and the slider and switch point at it (K2 shaped accessibility, checked through markup with regexes).
- `field-invalid-controls`: the DropZone `data-invalid` mark and the red outline rules (K2 shaped, markup and CSS).
- `dropdown-menu`: the roles and checked state of menu items (K2 shaped, markup).
- `guide`: the committed guide folder equals what `pnpm guide` writes (K5 shaped freshness check, W2 because the guide command has its own drift check).
- `field-width`: the width tokens and their CSS rules (W1).
- `flint-mascot`: the mascot constants and the markup of each clip (W5 and W3).
- `floating-prompt`: asserts that mocked hooks were called with arguments (W6).

Markup-only files (`command-input`, `dialog-fit`, `disabled-overlay-placement` and most others on the list above) were not K shaped.

## Lint rule candidates

Not written here. Each would be a few lines.

- Track-drop size tokens match the container queries in `TrackTable.css`.
- Palette contrast for the label fills of pixel and gradient buttons.
- The brand SVG files carry the marks listed in `family.constants`.
- Surface classes are only asked through the `surface="..."` prop (from `box-surface`).
- Date calls (`toLocale*`, Intl date formatters, `getHours`, `getMinutes`, `getSeconds`) appear only in `src/primitives/date-format/` (a `no-restricted-syntax` rule).
- The dialog size tokens climb in order (`dialog-sizing`).
- The `DockCornerHandle` and `DisabledOverlay` CSS rules, only if they are real rules.

## Helper and fixture files

None was deleted. Every helper still has an importer in this tree. These lose their last importer if part 2 or part 3 deletes the tests that use them, so check them after the three parts are merged:

- `tests/read-sfnt-face.mjs` (only `truetype-fonts`)
- `tests/title-bar-menu-fixture.mjs` (`window-title-bar-view`, `window-title-bar-tucked-rows`)
- `tests/tooltip-document.mjs` (`tooltip-scroll`, `tooltip-pointer`, `tooltip-close`)
- `tests/listener-node.mjs` (`wheel-step`, `volume-popover-hooks`, `toolbar-hold`)
- `tests/app-usage-fixture.mjs` (`app-usage`, `app-parts`)
- `tests/cli-sandbox.mjs` (`cli-app`, `cli-tessera`, `cli-monorepo`)
- `tests/fixtures/guide/*` (`guide`, `guide-checks`: the fixtures `bad-alternative`, `broken-example`, `building-block`, `hook-module`, `hook-with-tree`, `missing-field`, `off-tree`, `pilot`, `stale-props`, `unknown-hook-module`)

`tests/cli-sandbox.mjs` still exports `TIMEOUT` and sets a 240000 ms `beforeAll` limit inside `generateParts`. It is a helper, so it was left alone. The preset should set the limit per tag; this needs a decision in the checker pass.

## Doubts

- `cli-monorepo` is tagged critical on the assumption that its in-process `runNew` on a temp fixture repo runs under one second.
- Hook tests with the harness are critical. Fake-timer tests are standard. Tests that still use a real `setTimeout(resolve, 0)` tick (`guided-tour-intro`) were left, because that is a task flush, not a sleep.
- The counts are static call sites. The loops in `guided-tour-clear` and the `describe.each` blocks expand to more cases at run time.
