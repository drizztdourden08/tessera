# Test clean-up

Verdicts against the shared test standard. A case is one `it` or `test` call site; an `it.each` counts as one. Nothing was run in this pass (no tests, lint or typecheck); the checker runs them.
Branch: standards/0.13.0.

## Counts for the whole repo

| | before | after |
|---|---|---|
| files | 438 | 300 |
| cases | 3608 | 2036 |
| tagged critical | 0 | 1888 |
| tagged standard | 0 | 87 |
| tagged e2e | 0 | 61 |
| untagged | 3608 | 0 |

Before: 1209 in part 1, 1129 in part 2, 1241 in part 3 and 29 in the five files of part 4. After counts come from a scan of the final tree (every case checked for exactly one tag, on itself or on its describe), so they can differ by a few cases from the per-part tables below.

## Tag pass

Every critical case was checked for a real process, a socket, a real build, a path outside a temp folder or a real timer.

- Critical: pure logic, hook tests on the harness and tests on fake DOM objects.
- Standard: tests with fake timers, tests that read the real token sources or review store, and jsdom component behaviour.
- E2E: tests that run a child process, a real tool or a real TypeScript program.
- Per-test and per-hook timeouts are removed from every file. The last ones went in this pass: `TIMEOUT` and `MEASURED_MS` in `tessera-lint-rules`, and `TIMEOUT` in `cli-sandbox.mjs` with its export. The shared preset sets the limit per tag.
- W7 rewrites: `guided-tour-hooks` now runs its two step event tests on fake timers instead of a real 5 ms sleep. `list-detail-create` flushes microtasks instead of waiting on the real clock.
- Removed helper: `tests/read-sfnt-face.mjs`, with no importer left after `truetype-fonts` was wiped.

## Lint rules

- Added: dates are written only by the date-format primitive. `eslint.config.mjs` reports `.toLocaleDateString`, `.toLocaleTimeString`, `Intl.DateTimeFormat` and `Intl.RelativeTimeFormat` under `src/` and `stories/`, except `src/primitives/date-format/`. It replaces the deleted `date-format-only` test. It uses `no-restricted-properties`, so it does not touch the `no-restricted-syntax` selectors.
- Kept as check scripts: the overview description limits (`scripts/storylite/check-descriptions.mjs`, from the deleted `overview-descriptions` test) and the splash and status colour contrast (`scripts/tokens/check-contrast.mjs`, from the deleted `splash-contrast` and `status-tones` tests) now run at the end of `pnpm lint` and `pnpm lint:all`. Each prints its problems and exits 1 on any.
- Dropped: every other candidate the parts listed (token and stylesheet reads such as dialog sizes, track-drop tokens, width and hit-area rules; the brand SVG marks; the TrueType copies of the title font; export map and barrel checks; leftover class names). They were stylesheet or source text checks, and each needs a rule that is more than a few lines.

## Part 1: the first file, to guided-tour-parts

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

Deleted cases that would have been critical:

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

## Part 2: after guided-tour-parts, to seat-card

| file | verdict | rule | cases before | cases after |
|---|---|---|---|---|
| guided-tour-settle | keep | K1 | 5 | 5 |
| guided-tour-slow-frames | keep | K1 | 7 | 7 |
| guided-tour-stale-hole | keep | K1 | 10 | 10 |
| guided-tour-top-layer | keep | K1 | 6 | 6 |
| guided-tour | trim | K1 | 23 | 21 |
| hamburger-morph | delete | W1 W3 | 6 | 0 |
| header-back | trim | K1 | 8 | 1 |
| header-chip-strip | trim | K1 | 7 | 5 |
| help-tip | delete | W3 | 3 | 0 |
| hero-bleed | delete | W1 W3 | 6 | 0 |
| hero-height | delete | W1 W3 | 5 | 0 |
| hint | trim | K1 | 5 | 1 |
| hit-area | delete | W1 W3 | 3 | 0 |
| icon-button-height | delete | W1 | 2 | 0 |
| icon-effect | trim | K1 | 14 | 10 |
| icon-set | delete | W5 | 6 | 0 |
| image-integer | trim | K1 | 7 | 5 |
| inline-create-dashed | delete | W3 | 3 | 0 |
| inline-edit | trim | K1 | 19 | 9 |
| input-adornments | delete | W3 | 10 | 0 |
| input-icon | trim | K1 | 14 | 4 |
| input-props | trim | K1 | 7 | 3 |
| item-card | delete | W3 | 12 | 0 |
| item-highlight | trim | K1 S2 | 10 | 9 |
| item-list-activate | trim | K1 | 8 | 5 |
| item-list-create-open | trim | K1 | 5 | 2 |
| item-list-create | trim | K1 | 7 | 4 |
| item-list-groups | trim | K1 | 7 | 2 |
| item-list-max-rows | trim | K1 | 6 | 4 |
| item-list-new-disabled | delete | W3 | 5 | 0 |
| item-list-rows | delete | W1 W3 | 4 | 0 |
| item-list-undo | trim | K1 | 8 | 5 |
| item-list | trim | K1 | 8 | 2 |
| kanban-board-props | delete | W1 W3 | 12 | 0 |
| kanban-board-slots | delete | W3 | 5 | 0 |
| kanban-board | trim | K1 | 34 | 21 |
| link | trim | K1 | 9 | 4 |
| list-detail-count-draw | delete | W3 | 1 | 0 |
| list-detail-count | keep | K1 | 3 | 3 |
| list-detail-create | keep | K1 | 12 | 12 |
| list-detail-guard | delete | W1 W3 | 3 | 0 |
| list-detail-layout | trim | K1 | 22 | 3 |
| list-item-header | trim | K1 | 6 | 3 |
| list-item-row-drag | delete | W3 | 2 | 0 |
| list-item-row-lead | delete | W3 | 6 | 0 |
| list-item-row-menu | delete | W6 | 1 | 0 |
| list-item-row | trim | K1 | 5 | 2 |
| list-row-inset | trim | K1 | 7 | 1 |
| list | delete | W3 | 3 | 0 |
| load-error-users | delete | W3 | 7 | 0 |
| load-error | trim | K1 | 9 | 1 |
| log-ansi | trim | K1 | 20 | 17 |
| log-count | delete | W5 | 1 | 0 |
| log-follow | keep | K1 | 19 | 19 |
| log-input-row | delete | W3 | 3 | 0 |
| log-input | keep | K1 | 13 | 13 |
| log-kind-tone | trim | K1 | 11 | 7 |
| log-selection | trim | K1 | 6 | 4 |
| log-window | keep | K1 | 10 | 10 |
| markdown-data-images | trim | K4 | 13 | 11 |
| markdown-editor-compact | delete | W3 | 6 | 0 |
| markdown-editor-keys | trim | K1 | 6 | 4 |
| markdown-editor-lists | keep | K1 | 16 | 16 |
| markdown-editor-preview | delete | W3 | 3 | 0 |
| markdown-editor-quote | trim | K1 | 9 | 7 |
| markdown-editor | trim | K1 | 25 | 19 |
| markdown-images | trim | K4 | 5 | 3 |
| markdown-link-ids | trim | K4 | 9 | 7 |
| markdown-links | trim | K4 | 3 | 2 |
| markdown-on-image | delete | W3 | 4 | 0 |
| markdown-strip-chars | keep | K4 | 8 | 8 |
| markdown | trim | K4 | 17 | 5 |
| marker-toggle | keep | K1 | 3 | 3 |
| marquee-math | keep | K1 | 18 | 18 |
| mascot-state | trim | K1 | 11 | 10 |
| media-viewer-zoom | keep | K1 | 4 | 4 |
| media-viewer | trim | K1 | 10 | 5 |
| menu-icon-sources | delete | W3 | 2 | 0 |
| menu-slider | delete | W3 W5 | 5 | 0 |
| miller-columns | trim | K1 | 9 | 6 |
| mixed-fields | delete | W1 W3 | 6 | 0 |
| native-drag-ghost | trim | K1 | 5 | 3 |
| navigator | trim | K1 | 13 | 10 |
| node-design-controls | delete | W1 W3 | 15 | 0 |
| node-opt-ins | delete | W1 W3 | 14 | 0 |
| number-field | trim | K1 | 12 | 7 |
| number-helpers | keep | K1 | 5 | 5 |
| number-hex-hint | trim | K1 | 3 | 2 |
| number-scrub | keep | K1 | 2 | 2 |
| number-unit | keep | K1 | 4 | 4 |
| observe-resize | keep | K1 | 2 | 2 |
| opt-in-looks | trim | K1 | 11 | 1 |
| option-disabled-reason | trim | K1 | 9 | 3 |
| option-inputs | trim | K1 | 11 | 3 |
| option-tooltips | delete | W3 | 6 | 0 |
| overview-descriptions | delete | W1 | 3 | 0 |
| overview-overflow | delete | W1 | 7 | 0 |
| page-frame | delete | W1 W3 | 4 | 0 |
| page-gutter-stable | delete | W3 | 1 | 0 |
| page-root | trim | K1 | 5 | 2 |
| palette-neutrals | keep | S2 | 4 | 4 |
| pane-edge-drag | keep | K1 | 9 | 9 |
| pane-edge-fold | delete | W1 W3 | 9 | 0 |
| pane-edge-keys | keep | K1 | 7 | 7 |
| pane-edge-wiring | keep | K1 | 12 | 12 |
| pane-edge | delete | W1 | 11 | 0 |
| panel-props | delete | W3 | 6 | 0 |
| part-options | delete | W3 | 3 | 0 |
| password-input | trim | K1 | 19 | 7 |
| path-input | trim | K1 | 5 | 3 |
| pelago-mascot | trim | K1 | 11 | 5 |
| pixel-icon-size | trim | K1 | 6 | 1 |
| pixel-icons | trim | K1 | 12 | 5 |
| pressable | delete | W6 | 1 | 0 |
| primary-text-contrast | keep | S2 | 2 | 2 |
| primitives-exports | trim | E2 | 4 | 2 |
| progress-bar | trim | K1 | 3 | 1 |
| public-helpers | trim | K1 | 4 | 3 |
| radio-group | delete | W3 | 4 | 0 |
| rating-keys | keep | K1 | 7 | 7 |
| rating | trim | K1 | 8 | 2 |
| record-readers | keep | K1 | 2 | 2 |
| renames | keep | S4 E2 | 5 | 5 |
| reorder-grid | keep | K1 | 12 | 12 |
| reorder-set | trim | K1 | 9 | 6 |
| reorder | keep | K1 | 9 | 9 |
| resize-handle-keys | keep | K1 | 12 | 12 |
| resize-handle-users | delete | W3 | 8 | 0 |
| restore-focus | keep | K1 | 4 | 4 |
| retry-button | trim | K1 | 6 | 2 |
| review-mask | delete | W3 W5 | 3 | 0 |
| review-notes | keep | S2 | 9 | 9 |
| review-store | keep | S2 | 3 | 3 |
| review-text-free | keep | S2 | 2 | 2 |
| review-write | keep | S2 | 9 | 9 |
| row-grid | trim | K1 | 7 | 2 |
| save-bar | delete | W3 | 5 | 0 |
| screen-fit | trim | K1 | 12 | 3 |
| screen-layer-order | trim | K1 | 3 | 1 |
| screen-window-corner | delete | W1 W3 | 16 | 0 |
| screen-window-move | keep | K1 | 10 | 10 |
| scroll-area-gutter | delete | W1 | 5 | 0 |
| scroll-area-slim | trim | K1 | 3 | 2 |
| scroll-area-thumb-auto | trim | K1 | 6 | 2 |
| seat-card | delete | W3 | 12 | 0 |

Deleted cases that would have been critical:

- `markdown-images`: an image drawn for an http address and a resolver that rewrites an address (K4 shaped). The unsafe-address and default-off cases stay.
- `markdown-link-ids`: a rule list, and an id with no address for the resolver (K1 shaped, covered by the kept id cases).
- `markdown`: an image shown as its alt text. The same default is kept in `markdown-images`.
- `markdown-editor-quote`, `markdown-editor`, `markdown-editor-compact`: toolbar and layout cases (S1 shaped, markup only).
- `password-input`: no mask once the password shows, and the checklist link to the input (K2 shaped, markup only). The mask counts, rules and strength cases stay.
- `list-item-row-menu` and `pressable`: Menu key and Shift+F10 reach the app through the button (K2 shaped, mock call only).
- `radio-group`: two groups without a name get their own names (K1 shaped, asserted through markup).
- `save-bar`: Save and Discard off with nothing to save (S1 shaped, markup only).
- `review-mask`: time cells marked for the review mask (K5 shaped, markup only).
- `reorder-set`, `rating`, `retry-button`: DragGhost count, picker Tab stop and Retry label cases (S1 shaped, markup only).
- `overview-descriptions`: the page description limits (K2 shaped, reads page files). A lint-rule candidate.
- `list-detail-guard`, `item-list-rows`, `kanban-board-props`: guards that read source text. Lint-rule candidates.

## Part 3: after seat-card to the last file

| File | Verdict | Rule | Cases before | Cases after | Tags |
|---|---|---|---|---|---|
| section-heading-count.test.mjs | wipe | W3 | 4 | 0 | - |
| section-timeline.test.mjs | trim | K1 | 12 | 3 | critical 3 |
| segmented-control-icon.test.mjs | wipe | W3 | 3 | 0 | - |
| select-groups-and-options.test.mjs | keep | K1 | 3 | 3 | critical 3 |
| selection-math.test.mjs | keep | K1 | 7 | 7 | critical 7 |
| selection-model.test.mjs | keep | K1 | 12 | 12 | critical 12 |
| settings-choice-fit.test.mjs | trim | K1 | 4 | 3 | critical 3 |
| settings-model.test.mjs | trim | K1 | 13 | 8 | critical 8 |
| settings-number-row.test.mjs | wipe | W3 | 1 | 0 | - |
| settings-row-marks.test.mjs | wipe | W3 | 12 | 0 | - |
| settings-row-optional-hint.test.mjs | wipe | W3 | 3 | 0 | - |
| settings-row-rest-hints.test.mjs | wipe | W3 | 4 | 0 | - |
| shared-logic.test.mjs | trim | K1 | 14 | 9 | critical 9 |
| shortcut-drag.test.mjs | wipe | W3 | 2 | 0 | - |
| side-nav-badge.test.mjs | trim | K1 | 5 | 1 | critical 1 |
| side-nav-open.test.mjs | trim | S2,K3 | 8 | 4 | standard 2, critical 2 |
| side-nav-top.test.mjs | wipe | W3 | 5 | 0 | - |
| side-panel.test.mjs | trim | K1 | 12 | 2 | critical 2 |
| site-chrome.test.mjs | trim | K1 | 7 | 1 | critical 1 |
| slider-hit-area.test.mjs | wipe | W1 | 5 | 0 | - |
| slider.test.mjs | trim | K1 | 12 | 5 | critical 5 |
| small-props.test.mjs | trim | K1 | 10 | 2 | critical 2 |
| smart-times.test.mjs | trim | K1,S2 | 6 | 5 | critical 3, standard 2 |
| space-2xs.test.mjs | wipe | W1 | 3 | 0 | - |
| speech-bubble.test.mjs | wipe | W3 | 8 | 0 | - |
| splash-contrast.test.mjs | wipe | W1 | 5 | 0 | - |
| splash-kit.test.mjs | wipe | W1 | 3 | 0 | - |
| splash.test.mjs | wipe | W3 | 12 | 0 | - |
| split-button.test.mjs | trim | K1 | 8 | 1 | critical 1 |
| split-pane.test.mjs | wipe | W3 | 8 | 0 | - |
| stacked-bar-description.test.mjs | wipe | W3 | 2 | 0 | - |
| stacked-bar-vertical.test.mjs | trim | K1 | 2 | 1 | critical 1 |
| standards-extension.test.mjs | trim | S2 | 9 | 6 | standard 6 |
| status-bar-menu.test.mjs | trim | K1 | 3 | 2 | critical 2 |
| status-bar.test.mjs | trim | K1 | 13 | 3 | critical 3 |
| status-map.test.mjs | wipe | W3 | 7 | 0 | - |
| status-tones.test.mjs | wipe | W1 | 4 | 0 | - |
| steady-motion.test.mjs | wipe | W1 | 5 | 0 | - |
| stepper-ladder.test.mjs | trim | K1 | 29 | 10 | critical 10 |
| stepper-motion.test.mjs | trim | K1 | 8 | 3 | critical 3 |
| stepper-name.test.mjs | wipe | W3 | 4 | 0 | - |
| stored-value.test.mjs | keep | K3 | 4 | 4 | critical 4 |
| studio-layout.test.mjs | wipe | W3 | 8 | 0 | - |
| studio-stack.test.mjs | trim | K1 | 4 | 3 | critical 3 |
| subpath-exports.test.mjs | wipe | W1 | 9 | 0 | - |
| table.test.mjs | wipe | W3 | 2 | 0 | - |
| tabs-badge-tone.test.mjs | trim | K1 | 7 | 2 | critical 2 |
| tabs-disabled.test.mjs | trim | K1 | 6 | 3 | critical 3 |
| tag-custom.test.mjs | trim | K1 | 6 | 3 | critical 3 |
| task-progress.test.mjs | wipe | W3 | 8 | 0 | - |
| tessera-lint-rules.test.mjs | trim | K1 | 5 | 4 | standard 4 |
| tessera-provider.test.mjs | trim | S2 | 13 | 4 | standard 4 |
| text-look.test.mjs | trim | K1 | 6 | 2 | standard 2 |
| text-match.test.mjs | trim | K1 | 10 | 9 | critical 9 |
| tight-rows.test.mjs | wipe | W3 | 6 | 0 | - |
| tile.test.mjs | wipe | W3 | 13 | 0 | - |
| title-bar-dropdown-place.test.mjs | trim | K1 | 6 | 5 | critical 5 |
| title-sublabel.test.mjs | wipe | W3 | 4 | 0 | - |
| toast-close.test.mjs | keep | K1 | 4 | 4 | critical 4 |
| toast-queue.test.mjs | trim | K1 | 7 | 6 | critical 6 |
| toast.test.mjs | wipe | W3 | 4 | 0 | - |
| toggle-sweep.test.mjs | keep | K1 | 9 | 9 | critical 9 |
| tokens.test.mjs | trim | K1 | 12 | 2 | critical 2 |
| tool-groups-compact.test.mjs | wipe | W3 | 6 | 0 | - |
| toolbar-click-list.test.mjs | trim | K1 | 16 | 5 | critical 5 |
| toolbar-corner-take.test.mjs | keep | K1 | 23 | 23 | critical 23 |
| toolbar-dock.test.mjs | trim | K1 | 16 | 4 | critical 4 |
| toolbar-drag.test.mjs | keep | K1 | 12 | 12 | critical 12 |
| toolbar-drop-insert.test.mjs | keep | K1 | 28 | 28 | critical 28 |
| toolbar-fold-fields.test.mjs | trim | K1 | 21 | 18 | critical 18 |
| toolbar-grid-placement.test.mjs | keep | K1 | 11 | 11 | critical 11 |
| toolbar-group-fold.test.mjs | keep | K1 | 11 | 11 | critical 11 |
| toolbar-hold.test.mjs | keep | K1 | 5 | 5 | critical 5 |
| toolbar-item-kinds.test.mjs | trim | K1 | 16 | 7 | critical 7 |
| toolbar-key-move.test.mjs | trim | K1 | 18 | 17 | critical 17 |
| toolbar-labels-side.test.mjs | keep | K1 | 16 | 16 | critical 16 |
| toolbar-layout-fields.test.mjs | keep | K1 | 13 | 13 | critical 13 |
| toolbar-layout-hide.test.mjs | keep | K1 | 12 | 12 | critical 12 |
| toolbar-layout-hook.test.mjs | keep | K1 | 6 | 6 | critical 6 |
| toolbar-layout-lanes.test.mjs | keep | K1 | 13 | 13 | critical 13 |
| toolbar-layout-migrate.test.mjs | keep | K1 | 19 | 19 | critical 19 |
| toolbar-layout.test.mjs | keep | K1 | 14 | 14 | critical 14 |
| toolbar-menu-side.test.mjs | trim | K1 | 14 | 5 | critical 5 |
| toolbar-menu.test.mjs | keep | K1 | 4 | 4 | critical 4 |
| toolbar-number-width.test.mjs | trim | K1 | 8 | 5 | critical 5 |
| toolbar-resize-end.test.mjs | keep | K1 | 19 | 19 | critical 19 |
| toolbar.test.mjs | trim | K1 | 27 | 12 | critical 12 |
| tooltip-close.test.mjs | keep | K1 | 9 | 9 | critical 9 |
| tooltip-pointer.test.mjs | keep | K1 | 6 | 6 | critical 6 |
| tooltip-portal.test.mjs | wipe | W3 | 2 | 0 | - |
| tooltip-scroll.test.mjs | keep | K1 | 7 | 7 | critical 7 |
| tooltip.test.mjs | wipe | W3 | 3 | 0 | - |
| track-table-width.test.mjs | trim | K1 | 5 | 4 | critical 4 |
| tree-drag-out.test.mjs | trim | K1 | 7 | 5 | critical 5 |
| tree-hooks.test.mjs | keep | K1 | 7 | 7 | critical 7 |
| tree-move.test.mjs | keep | K1 | 16 | 16 | critical 16 |
| tree.test.mjs | trim | K1 | 18 | 9 | critical 9 |
| truetype-fonts.test.mjs | wipe | W1 | 2 | 0 | - |
| undo-stack.test.mjs | keep | K1 | 9 | 9 | critical 9 |
| usage-example-imports.test.mjs | keep | K1, E1 | 3 | 3 | critical 2, e2e 1 |
| validation-summary.test.mjs | wipe | W3 | 4 | 0 | - |
| value-rule.test.mjs | keep | K1 | 17 | 17 | critical 17 |
| virtual-collections.test.mjs | trim | K1 | 20 | 13 | critical 13 |
| virtual-grid-columns.test.mjs | trim | K1 | 10 | 7 | critical 7 |
| virtual-grid-drop-data.test.mjs | trim | K1 | 10 | 9 | critical 9 |
| virtual-grid-rects.test.mjs | trim | K1 | 8 | 5 | critical 5 |
| virtual-grid-render.test.mjs | wipe | W3 | 7 | 0 | - |
| virtual-grid-sections.test.mjs | keep | K1 | 15 | 15 | critical 15 |
| virtual-grid-tile.test.mjs | wipe | W3 | 3 | 0 | - |
| virtual-grid.test.mjs | trim | K1 | 20 | 12 | critical 12 |
| virtual-list.test.mjs | trim | K1 | 9 | 6 | critical 6 |
| volume-control.test.mjs | trim | K1 | 5 | 2 | critical 2 |
| volume-icon.test.mjs | trim | K1 | 6 | 1 | critical 1 |
| volume-popover-hooks.test.mjs | keep | K1 | 5 | 5 | critical 5 |
| wheel-step.test.mjs | keep | K1 | 5 | 5 | critical 5 |
| widget-body.test.mjs | wipe | W3 | 2 | 0 | - |
| widget-chrome.test.mjs | trim | K1 | 12 | 1 | critical 1 |
| widget-context.test.mjs | keep | K1 | 3 | 3 | critical 3 |
| widget-disabled.test.mjs | wipe | W3 | 3 | 0 | - |
| widget-dock-weight.test.mjs | keep | K1 | 9 | 9 | critical 9 |
| widget-drag-hint.test.mjs | trim | K1 | 4 | 3 | critical 3 |
| widget-floating-resize.test.mjs | trim | K1 | 6 | 4 | critical 4 |
| widget-hit-areas.test.mjs | wipe | W3 | 4 | 0 | - |
| widget-icon.test.mjs | wipe | W3 | 3 | 0 | - |
| widget-names.test.mjs | trim | K1 | 5 | 1 | critical 1 |
| widget-open-on-edge.test.mjs | keep | K1 | 4 | 4 | critical 4 |
| widget-options-attribute.test.mjs | wipe | W3 | 3 | 0 | - |
| widget-pin-menu.test.mjs | trim | K1 | 4 | 2 | critical 2 |
| widget-pop-out.test.mjs | keep | K1 | 4 | 4 | critical 4 |
| widget-window-options.test.mjs | trim | K1 | 3 | 2 | critical 2 |
| window-chrome.test.mjs | wipe | W1 | 4 | 0 | - |
| window-title-bar-dropdown.test.mjs | trim | K1 | 5 | 3 | critical 3 |
| window-title-bar-icon-look.test.mjs | trim | K1 | 4 | 1 | critical 1 |
| window-title-bar-no-controls.test.mjs | wipe | W3 | 3 | 0 | - |
| window-title-bar-peek-flicker.test.mjs | trim | K1 | 15 | 12 | critical 12 |
| window-title-bar-peek.test.mjs | trim | K1 | 2 | 1 | critical 1 |
| window-title-bar-reveal.test.mjs | trim | K1 | 4 | 2 | critical 2 |
| window-title-bar-tucked-rows.test.mjs | trim | K1 | 13 | 12 | critical 12 |
| window-title-bar-view.test.mjs | trim | K1 | 17 | 16 | critical 16 |
| window-title-bar.test.mjs | trim | K1 | 17 | 13 | critical 13 |
| wizard-busy.test.mjs | trim | K1 | 8 | 6 | critical 6 |
| wizard-parts.test.mjs | trim | K1 | 19 | 5 | critical 5 |
| wizard.test.mjs | keep | K1 | 21 | 21 | critical 21 |
| workspace-top.test.mjs | keep | K1 | 4 | 4 | critical 4 |

Deleted cases that would have been critical:

- Tree: roving tab stop, aria level and position markup. The row math stays in tree tests.
- VirtualGrid and VirtualList: how many rows and tiles the server render draws. The window math stays.
- ValidationSummary: the display limit text ("first four, and 2 more"). It is text in markup.
- Wizard: the count of disabled buttons while busy. It is markup.
- Stepper and compact progress: aria status and progressbar attributes.
- WizardNav: which buttons show per step and the busy hint. Markup again.
- ListDetail and Widget: chrome button names and hit areas.
- Disabled overlay: class and attribute checks.
- truetype-fonts: byte equality of the TrueType copies with the woff2 files.

## Part 4: five files left over

| file | verdict | rule | cases before | cases after |
|---|---|---|---|---|
| data-table-row-ref-render.test.mjs | delete | W3, W6 | 2 | 0 |
| data-table-row-ref.test.mjs | trim | K1 | 8 | 7 |
| marquee-starts-inside.test.mjs | keep | K1 | 4 | 4 |
| small-target.test.mjs | delete | W1, W3 | 13 | 0 |
| tree-scroll-to-top.test.mjs | keep | K1 | 2 | 2 |

All kept cases are critical. `data-table-row-ref` lost the case that only asserted the host ref was called with the row and key (W6); the next case checks the outcome. `small-target` read stylesheets and class names. `data-table-row-ref-render` rendered markup.

Deleted cases that would have been critical: `small-target` (the 24 px hit area and its stylesheet rules, read from CSS text, K1 token invariant shaped).

## Batch 0.95.0

Merge of main into integrate/0.95.0. Main's cleaned and tagged files are the base. The branch cases below were judged against the same rules. Nothing was run.

| file | verdict | rule | cases before | cases after | tag |
|---|---|---|---|---|---|
| split-button.test.mjs | main's version, 5 branch cases dropped | W3, W6 | 5 | 0 | main's 1 critical case stays |
| toolbar-item-kinds.test.mjs | main's version, key badge case dropped | W8 | 1 | 0 | key-badge-keys no longer exists |
| tree-drag-out.test.mjs | main's version, 1 branch case dropped | W3 | 1 | 0 | main's cases stay critical |
| scroll-area-slim-round.test.mjs | wipe | W1, W3 | 4 | 0 | - |
| tree-row-size-roomy.test.mjs | wipe | W1 | 4 | 0 | - |
| virtual-grid-measured.test.mjs | trim | K1, W3 | 20 | 18 | critical 18 |
| virtual-grid-sections.test.mjs | keep | K1 | 15 | 15 | critical 15 |
| virtual-grid-fixture.mjs | new helper | jscpd | - | - | shared `GROUPS` and `HEIGHTS` for the two virtual-grid files |

`virtual-grid-measured` lost the `rowHeight` prop cases, which only checked a class name and style variables (W3).
