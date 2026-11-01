# Test clean-up, part 2 of 3

Branch `test-cleanup/part-2`. Scope: the files in `tests/` that sort after `tests/guided-tour-parts.test.mjs`, up to and including `tests/seat-card.test.mjs`. That is 145 files (the brief said 146).

The standard is `ai-config/docs/test-standard.md`. KEEP rules map to tags: K1 to K5 become `critical`, S1 to S4 become `standard`, E1 to E3 become `e2e`. WIPE rules W1 to W10 mean the case is deleted. A case is one `it` or `test` call site; an `it.each` counts as one.

How the tags were set:

- A kept file carries one `describe('<rule> <subject>', { tags: [...] }, ...)` per group. A file with both a fast and a slow group has one describe per tag.
- Pure logic, hook tests on the hook harness and tests on fake DOM objects are `critical`. They run in node, with no child process, network or real build. Fake timers count as deterministic.
- Tests that read the real token sources or the real review store files are `standard`.
- Tests that build a real TypeScript program are `e2e`. Their per-test timeouts were removed.
- Cases that render markup with `renderToString` and assert classes, attributes or text are W3 and were deleted. Cases that read `src` or stylesheet text are W1 and were deleted. Cases that only check a mock was called are W6. Constants and re-export checks are W5.
- Security checks that go through a render (unsafe links, data images, raw HTML) were kept as K4, because the render is the only way to reach the filter.

## Counts

| | before | after |
|---|---|---|
| files | 145 | 97 |
| cases | 1129 | 577 |
| critical | 0 | 536 |
| standard | 0 | 38 |
| e2e | 0 | 3 |

Before this clean-up no case carried a tag. Files: 35 kept as they were (tagged only), 62 trimmed, 48 deleted.

## Files

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

## Deleted cases that would have been critical

These were K1 to K5 shaped. Each was deleted because the check lived in markup, a stylesheet or a mock, not in logic.

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

## Lint-rule candidates

Tests deleted as W1 or W2 that a few lines of lint could hold. No rule was written.

- Stylesheet text checks (`hero-bleed`, `hero-height`, `hit-area`, `icon-button-height`, `scroll-area-gutter`, `overview-overflow`, `page-frame`, `screen-window-corner`, `node-design-controls`, `node-opt-ins`, `pane-edge-fold`, `mixed-fields`): stylelint rules on the named selectors and tokens.
- `pane-edge`: no leftover old class names under `src`. A grep-style lint rule.
- `primitives-exports` (deleted case): every group barrel under 200 lines and re-exported from the index. A `max-lines` rule plus a barrel check.
- `overview-descriptions`: page description length limits.
- `pixel-icons` (deleted case): every pixel grid file holds only 24 by 24 grids of `#` and `.` named `pixel-<name>`. A build-time check in the icon script.
- `renames` (kept as `standard` and `e2e`): the RENAMES.json shape checks could move to a script that runs in the release gate.

## Possibly orphaned helpers

None of the helper files lost its last user to this part. The files deleted here did not import `app-usage-fixture`, `cli-sandbox`, `config-fixture`, `listener-node`, `read-sfnt-face`, `title-bar-menu-fixture` or `tooltip-document`. `hook-harness` and `escape-document` are still used by many kept files. `tests/fixtures/primitives-export-names.json` is still used by `primitives-exports`. Parts 1 and 3 may delete the last users of some helpers; check after the three parts merge.

## Notes

- `markdown` lost its `codeOf` case, because it sat inside a markup case. `codeOf` now has no direct test.
- `list-detail-create` had a real-clock wait; it now flushes microtasks instead.
- `palette-neutrals` and `primary-text-contrast` read the real token sources and run the contrast math, so they are `standard`, not `critical`.
