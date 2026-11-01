# Test clean-up, part 3

Part 3 of 3. It covers the files of `tests/` after `seat-card.test.mjs` in sorted order, to the last file. The brief said 146 files. The list holds 144.

A case is one `it` or `test` call site. An `it.each` counts as one.

## Totals

| | Before | After |
|---|---|---|
| Files | 144 | 102 |
| Cases | 1241 | 731 |
| Tagged critical | - | 710 |
| Tagged standard | - | 20 |
| Tagged e2e | - | 1 |

Verdicts: 42 files wiped, 64 trimmed, 38 kept as they were (tags added).

Every kept case carries exactly one tag, through its describe. Per test timeout options and long hook limits are gone.

## What was removed

- W3: tests that render with the server renderer and then check tags, attributes, class names or text of the markup. They were most of the wipes and most of the trimmed cases.
- W1: tests that read source, CSS, token or stories files and assert on their text.
- Constants-only checks (lists of names, copy strings, class helper output).
- The slow parts of mixed files. A file keeps its logic cases (reducers, math, hooks on fake timers, stored values) and loses its markup cases.

## Deleted tests that would have been critical

These look like K1 to K5 but check markup or file text, so they went.

- Tree: roving tab stop, aria level and position markup. The row math stays in tree tests.
- VirtualGrid and VirtualList: how many rows and tiles the server render draws. The window math stays.
- ValidationSummary: the display limit text ("first four, and 2 more"). It is text in markup.
- Wizard: the count of disabled buttons while busy. It is markup.
- Stepper and compact progress: aria status and progressbar attributes.
- WizardNav: which buttons show per step and the busy hint. Markup again.
- ListDetail and Widget: chrome button names and hit areas.
- Disabled overlay: class and attribute checks.
- truetype-fonts: byte equality of the TrueType copies with the woff2 files.

## Lint rule or check script candidates (W1 shaped, not written)

- truetype-fonts: the TrueType copies of the title font match their woff2, with the right family, weight and glyphs.
- window-chrome: every window chrome part imports `theme/window-chrome.css`.
- volume-icon: wave and speaker colours live in CSS, and one VolumeIcon source is used.
- volume-control: the popover source markers.
- subpath-exports and splash-kit: the export map and the splash kit file set.
- tooltip: the CSS width and wrap rules.
- window-title-bar-peek: the z-index token order, with the title bar layer above floating.
- window-title-bar-peek-flicker: the source text of the `away` and `menus.anyOpen` rule.
- space-2xs, steady-motion, status-tones, slider-hit-area, splash-contrast: token and CSS reads.

## Helpers and fixtures that may have no importer

- `tests/read-sfnt-face.mjs`: no importer left after `truetype-fonts` was wiped. Safe to delete by the lead.
- Every other helper in `tests/` still has an importer in this tree: app-usage-fixture, cli-sandbox, config-fixture, escape-document, hook-harness, listener-node, title-bar-menu-fixture, tooltip-document, fixtures/tree/tree-items, fixtures/toolbar-dock (both files), fixtures/primitives-export-names.json.
- `tests/fixtures/guide` and `tests/fixtures/cli` were not scanned file by file. Parts 1 and 2 own their users.
- Part 1 and part 2 may drop importers of these files. Scan again after all three parts merge.

## Unsure

- The kept knip test in `usage-example-imports` runs the real tool, so it is tagged e2e (E1).
- `toolbar-corner-take` still imports constants from stories files.
- Node icon folding cases in `toolbar.test.mjs` were dropped as markup.
- `useWizard` (a server render of a hook probe, no markup assertion) stays critical.
- Standard-tagged: standards-extension, tessera-provider, tessera-lint-rules, the layout describe of side-nav-open and the Markdown describe of smart-times.

## Per file

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
