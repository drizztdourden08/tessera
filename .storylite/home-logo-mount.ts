/* @layer root-config @kind logic */
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { TesseraLogo } from '../src/brand';
import type { CssRegistry } from './home-logo-mount.type';
import '../src/tokens/size.css';
import '../src/tokens/radius.css';
import '../src/tokens/typography.css';
import '../src/tokens/motion.css';

const registry = window.__STORYLITE_IMPORTED_CSS__;
const style = document.createElement('style');
style.dataset.tesseraHome = '';
document.head.appendChild(style);

const copyStyles = (): void => {
  const css = (registry?.toArray() ?? []).join('\n').replace(/:root\b/g, ':scope');
  style.textContent = `@scope ([data-tessera-logo]) {\n${css}\n}`;
};

const follow = (reg: CssRegistry): void => {
  const { set, delete: remove } = reg;
  reg.set = (id, css) => { set.call(reg, id, css); queueMicrotask(copyStyles); };
  reg.delete = (id) => { remove.call(reg, id); queueMicrotask(copyStyles); };
};

const roots = new Map<Element, Root>();

const sync = (): void => {
  document.querySelectorAll('[data-tessera-logo]').forEach((el) => {
    if (roots.has(el)) return;
    const root = createRoot(el);
    root.render(createElement(TesseraLogo));
    roots.set(el, root);
  });
  roots.forEach((root, el) => {
    if (el.isConnected) return;
    root.unmount();
    roots.delete(el);
  });
};

if (registry) follow(registry);
copyStyles();
new MutationObserver(sync).observe(document.body, { childList: true, subtree: true });
sync();
