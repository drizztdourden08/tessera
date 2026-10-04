/* @layer root-config @kind data */
const MANAGER_CSS = `
/* The menu reads as a list of folders like "Primitives · Inputs": wide enough to show them
   whole, in sentence case. Only on the wide layout; below 940px Storylite stacks the menu
   above the page and needs its own columns. Storylite's controls panel is gone: every
   story draws its own parameters under it (renderer/controlled-client.ts), so the page
   takes the whole width. */
.storylite-shell > .inspector { display: none; }
@media (width >= 940px) {
  .storylite-shell, .storylite-shell--no-controls { grid-template-columns: minmax(280px, 310px) minmax(0, 1fr); }
}
/* With the menu hidden, or a story alone on its canvas, the page takes the whole width:
   one column, never the menu's 310px one. */
.storylite-shell.storylite-shell--no-sidebar, .storylite-shell.storylite-shell--canvas { grid-template-columns: minmax(0, 1fr); }
.story-group__toggle { text-transform: none; font-size: 0.8rem; letter-spacing: 0; }

/* The header shows the Tessera mark itself, not a mark inside a box. */
.brand__mark { background: none; border: 0; box-shadow: none; padding: 0; inline-size: auto; block-size: auto; }
.brand__mark .gallery-mark { display: block; inline-size: 34px; block-size: 34px; }
.brand__title .gallery-wordmark { display: block; block-size: 20px; inline-size: auto; }

/* The canvas always shows the theme's own ground, so the background picker changes nothing. */
button[popovertarget$="-background-popover"]:not(.toolbar-dropdown__item) { display: none; }

/* Light and dark are switched off: one button per app replaces them (app-switcher.ts),
   in the menu header where Storylite's menu button was. The hidden controls stay in the
   page; the app buttons drive them. */
.brand__menu-button { display: none; }
.toolbar__group:has(> button[aria-label="Use dark theme"]) { display: none; }
button[aria-label="App"]:not(.toolbar-dropdown__item) { display: none; }

.app-switch { display: inline-flex; gap: 2px; margin-inline-start: auto; flex: none; }
.app-switch__button {
  display: inline-grid; place-items: center; inline-size: 30px; block-size: 30px; padding: 0;
  border: 1px solid transparent; border-radius: 7px; background: transparent; cursor: pointer;
  opacity: 0.7; transition: opacity 120ms, background 120ms, border-color 120ms;
}
.app-switch__button:hover, .app-switch__button:focus-visible { opacity: 1; background: var(--sl-panel-subtle); outline: 0; }
.app-switch__button.active { opacity: 1; border-color: color-mix(in oklab, var(--sl-primary), transparent 45%); background: var(--sl-panel-subtle); }
.app-switch__button svg { inline-size: 20px; block-size: 20px; }

/* Review state (sidebar-decor.ts, from .storylite/review.json): a dot after the count.
   Red is not reviewed yet, yellow changed since the owner last saw it, green approved.
   A category takes its worst page. */
[data-review] > small { display: inline-flex; align-items: center; gap: 6px; }
[data-review] > small::after {
  content: ""; inline-size: 7px; block-size: 7px; border-radius: 50%; flex: none; background: var(--review-dot);
}
[data-review="red"] { --review-dot: var(--review-red); }
[data-review="yellow"] { --review-dot: var(--review-yellow); }
[data-review="green"] { --review-dot: var(--review-green); }

/* Tiers (sidebar-tiers.constants.ts): Core, Primitives, Composites and Data head their groups.
   Story titles keep their "Tier · Group" folder; the menu shows the group name under its tier.
   A tier with no group of its own (Data) lists its pages straight under the tier row. */
.story-tier { margin: 0; }
.story-group__toggle.story-tier__toggle { text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; }
.story-group[data-tier] {
  margin-inline-start: 14px; padding-inline-start: 8px;
  border-inline-start: 1px solid color-mix(in oklab, var(--sl-border), transparent 24%);
}
.story-group[data-tier-closed] { display: none; }
.story-group[data-tier-root] > h2 { display: none; }
.story-group[data-tier-root] > .story-group__components { display: grid; margin: 0; padding: 0; border: 0; }

/* A closed component whose story is open reads as the current row (component-pages.ts),
   and so does a closed tier. */
.story-tier__toggle[data-current],
.story-component:has(.story-tree__branch--collapsed .story-link.active) > h3 .story-component__toggle {
  color: var(--sl-primary); background: var(--sl-primary-soft); box-shadow: inset 0 0 0 1px var(--sl-primary-quiet);
}
`;

export { MANAGER_CSS };
