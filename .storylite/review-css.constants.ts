/* @layer root-config @kind data */
const REVIEW_CSS = `
/* The header's review control (review-control.ts): three icon radios in Storylite's segmented
   group, lit in the page's colour, and a note button whose popover holds one note per page.
   A small dot on the lit radio says the files changed since that status was set. */
:root { --review-red: #ef6a6a; --review-yellow: #e6b84f; --review-green: #6cc38a; }
.review-control { display: flex; align-items: center; gap: 8px; }
.review-control[hidden], .review-note [hidden] { display: none; }
.review-status [data-status="new"] { --review-tone: var(--review-red); }
.review-status [data-status="seen"] { --review-tone: var(--review-yellow); }
.review-status [data-status="ok"] { --review-tone: var(--review-green); }
.toolbar .review-status button:hover:not([aria-checked="true"]) { color: var(--review-tone); }
.toolbar .review-status [aria-checked="true"] {
  color: var(--review-tone); border-inline-start-width: 1px;
  border-color: color-mix(in oklab, var(--review-tone), transparent 30%);
  background: color-mix(in oklab, var(--review-tone), transparent 86%);
}
.toolbar .review-status button:has(+ [aria-checked="true"]) { border-inline-end-color: transparent; }
.toolbar .review-status button:focus-visible { outline: 2px solid color-mix(in oklab, var(--sl-primary), transparent 30%); outline-offset: 1px; z-index: 1; }
.review-status svg, .review-note__button svg { inline-size: 16px; block-size: 16px; }
.review-status__changed { display: none; }
.review-status [data-changed="true"] .review-status__changed {
  display: block; position: absolute; inset-block-start: 4px; inset-inline-end: 4px;
  inline-size: 7px; block-size: 7px; border-radius: 50%; background: var(--review-yellow);
  box-shadow: 0 0 0 2px var(--sl-panel);
}
.toolbar .review-note__button { position: relative; color: var(--sl-muted); }
.toolbar .review-note__button[data-has-note="true"] { color: var(--sl-primary); }
.review-note__button[data-has-note="true"]::after {
  content: ""; position: absolute; inset-block-start: 4px; inset-inline-end: 4px;
  inline-size: 7px; block-size: 7px; border-radius: 50%; background: var(--sl-primary);
  box-shadow: 0 0 0 2px var(--sl-panel);
}
.toolbar-dropdown__panel.review-note { inline-size: 340px; max-inline-size: min(340px, 100vw - 24px); padding: 10px; }
.review-note:popover-open { display: grid; gap: 8px; }
.review-note__label { display: grid; gap: 6px; font-size: 12px; color: var(--sl-muted); }
.review-note__label textarea {
  box-sizing: border-box; inline-size: 100%; min-block-size: 96px; resize: vertical; padding: 8px;
  font: inherit; font-size: 13px; line-height: 1.45; color: var(--sl-text);
  background: var(--sl-panel-subtle); border: 1px solid var(--sl-border); border-radius: 7px;
}
.review-note__label textarea:focus { outline: 0; border-color: color-mix(in oklab, var(--sl-primary), transparent 35%); }
.review-note__actions { display: flex; align-items: center; gap: 6px; }
.review-note__hint { flex: auto; font-size: 12px; color: var(--sl-muted); }
.toolbar .review-note__actions button { font-size: 13px; color: var(--sl-text); }
.toolbar .review-note__actions [data-act="save"] { color: var(--sl-primary); border-color: color-mix(in oklab, var(--sl-primary), transparent 45%); }

/* A page with a note waiting, and every row above it, shows a small note mark before its count. */
[data-note] > small { display: inline-flex; align-items: center; gap: 6px; }
[data-note] > small::before {
  content: ""; inline-size: 11px; block-size: 11px; flex: none; background: var(--sl-primary);
  mask: var(--review-note-icon) center / contain no-repeat;
}
`;

export { REVIEW_CSS };
