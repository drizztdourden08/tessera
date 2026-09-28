/* @layer root-config @kind data */
const HOME_CSS = `
.home-title { margin: 0.5rem 0 0.75rem; line-height: 0; }
.home-title svg { block-size: clamp(2.2rem, 6vw, 3.4rem); inline-size: auto; max-inline-size: 100%; }

.home-logo {
  --c-text: var(--sl-text); --c-text-muted: var(--sl-muted); --c-border: var(--sl-border);
  --c-surface: var(--sl-panel); --c-hover: var(--sl-panel-subtle); --c-bg: var(--sl-bg); --c-lift: var(--sl-text);
  margin: 1.5rem 0 1rem; min-block-size: 8rem;
}

.home-banner {
  display: flex; flex-direction: column; gap: 0.3rem; margin: 0 0 2rem; padding: 0.9rem 1.1rem;
  border: 1px solid color-mix(in oklab, var(--sl-primary), transparent 60%); border-inline-start-width: 4px;
  border-radius: 10px; background: color-mix(in oklab, var(--sl-primary), transparent 90%);
}
.home-banner span { color: var(--sl-muted); }
`;

export { HOME_CSS };
