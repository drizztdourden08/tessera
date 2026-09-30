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

/* Review state per page (sidebar-decor.ts): red is not reviewed yet, yellow changed since
   the owner last saw it, green approved. The colour is on the label only. */
.story-component[data-review="red"] > h3 .story-component__toggle > span { color: #ef6a6a; }
.story-component[data-review="yellow"] > h3 .story-component__toggle > span { color: #e6b84f; }
.story-component[data-review="green"] > h3 .story-component__toggle > span { color: #6cc38a; }

/* A closed component whose story is open reads as the current row (component-pages.ts). */
.story-component:has(.story-tree__branch--collapsed .story-link.active) > h3 .story-component__toggle {
  color: var(--sl-primary); background: var(--sl-primary-soft); box-shadow: inset 0 0 0 1px var(--sl-primary-quiet);
}
`;

export { MANAGER_CSS };
