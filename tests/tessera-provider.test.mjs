/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { ErrorBoundary } from '../src/primitives/ErrorBoundary';
import { LogPanel } from '../src/composites/LogPanel';
import { Button } from '../src/primitives/Button';
import { CodeBlock } from '../src/primitives/CodeBlock';
import { DropZone } from '../src/primitives/DropZone';
import { EmptyState } from '../src/primitives/EmptyState';
import { Icon } from '../src/primitives/Icon';
import { ICONS } from '../src/primitives/Icon/Icon.constants';
import { IconButton } from '../src/primitives/IconButton';
import { Image } from '../src/primitives/Image';
import { Portal } from '../src/primitives/Portal';
import { portalDocumentFor } from '../src/primitives/Portal/behavior/portal-document-for';
import { Spinner } from '../src/primitives/Spinner';
import { TesseraProvider, useCopy, useTesseraStrings } from '../src/primitives/TesseraProvider';
import { TESSERA_STRINGS } from '../src/primitives/strings';

const { seen, recordClicks } = vi.hoisted(() => {
  const state = { clicks: [], inBrowser: false, containers: [] };
  const record = (name) => async (importOriginal) => {
    const real = await importOriginal();
    const { createElement } = await import('react');
    const Recording = (props) => {
      state.clicks.push(props.onClick);
      return createElement(real[name], props);
    };
    return { ...real, [name]: Recording };
  };
  return { seen: state, recordClicks: record };
});

vi.mock('../src/primitives/Button', recordClicks('Button'));
vi.mock('../src/primitives/IconButton', recordClicks('IconButton'));
vi.mock('../src/primitives/Portal/behavior/useInBrowser', () => ({ useInBrowser: () => seen.inBrowser }));
vi.mock('react-dom', async (importOriginal) => ({
  ...(await importOriginal()),
  createPortal: (children, container) => {
    seen.containers.push(container);
    return children;
  },
}));

const AppSpinner = ({ size, label, className }) => h('i', { className: `app-spinner ${className}`, 'data-size': size, role: 'status', 'aria-label': label });
const AppPlaceholder = ({ status }) => h('i', { 'data-app-placeholder': status });
const AppCrash = ({ label, error, reset }) => h('p', { 'data-app-crash': typeof reset }, `${label}: ${error.message}`);
const APP_ICONS = { ...ICONS, house: { body: '<path d="M0 0h1"/>', width: 1, height: 1 } };
const STRINGS = { common: { loading: 'Chargement', cancel: 'Annuler' }, fields: { dropFiles: 'Deposez ici' } };
const OVERRIDES = { spinner: AppSpinner };
const CopyProbe = ({ text }) => {
  const { copy } = useCopy();
  return h(Button, { onClick: () => copy(text) }, 'Copy');
};
const draw = (overrides, ...children) => renderToString(h(TesseraProvider, { overrides }, ...children));

describe('TesseraProvider spinner', () => {
  it('draws the Tessera ring when no provider names a spinner', () => {
    const html = renderToString(h(Spinner, { size: 'lg' }));
    expect(html).toContain('class="spinner"');
    expect(html).toContain('data-size="lg"');
    expect(html).toContain('aria-label="Loading"');
  });

  it('hands every Spinner below it to the app spinner, inside buttons too', () => {
    const html = draw(OVERRIDES,
      h(Spinner, { label: 'Syncing' }),
      h(Button, { loading: true }, 'Save'),
      h(IconButton, { label: 'Refresh', loading: true }, 'R'));
    expect(html.match(/app-spinner/g)).toHaveLength(3);
    expect(html).toContain('aria-label="Syncing"');
    expect(html).not.toContain('class="spinner');
  });

  it('lets an inner provider give back the Tessera spinner for its subtree', () => {
    const html = draw(OVERRIDES, h(TesseraProvider, { overrides: { spinner: undefined } }, h(Spinner)));
    expect(html).toContain('class="spinner"');
  });

  it('marks a loading button busy and disabled, and a disabled button neither busy nor spinning', () => {
    const loading = renderToString(h(Button, { loading: true, icon: 'I' }, 'Save'));
    const disabled = renderToString(h(Button, { disabled: true, icon: 'I' }, 'Save'));
    expect(loading).toContain('aria-busy="true"');
    expect(loading).toContain('disabled=""');
    expect(disabled).not.toContain('aria-busy');
    expect(disabled).not.toContain('spinner');
  });

});

describe('TesseraProvider clipboard, placeholders and wording', () => {
  it('writes every copy button and an app useCopy through the app clipboard writer', async () => {
    const written = [];
    seen.clicks.length = 0;
    draw({ writeText: (text) => { written.push(text); } },
      h(CodeBlock, { code: 'pnpm build', language: 'text', copyable: true }),
      h(CopyProbe, { text: 'Brock 1.4.0' }),
      h(LogPanel, { rows: [], copyText: () => 'log text' }));
    await Promise.all(seen.clicks.filter(Boolean).map((click) => click()));
    expect(written.sort()).toEqual(['Brock 1.4.0', 'log text', 'pnpm build']);
  });

  it('draws the app placeholder for loading and empty images, framed or not', () => {
    const html = draw({ imagePlaceholder: AppPlaceholder }, h(Image, { pending: true, alt: '' }), h(Image, { frame: true, alt: '' }));
    expect(html).toContain('data-app-placeholder="loading"');
    expect(html).toContain('data-app-placeholder="empty"');
    expect(html).not.toContain('image-placeholder');
  });

  it('takes wording from the table, merged key by key through nested providers', () => {
    const html = draw({ ...OVERRIDES, strings: STRINGS },
      h(TesseraProvider, { overrides: { strings: { common: { cancel: 'Fermer' } } } }, h(Spinner), h(DropZone, { onDrop: () => undefined })));
    expect(html).toContain('aria-label="Chargement"');
    expect(html).toContain('app-spinner');
    expect(html).toContain('Deposez ici');
    expect(renderToString(h(DropZone, { onDrop: () => undefined }))).toContain('Drop files here');
  });

  it('hands an app part every group of the table, panels included, with the overrides merged in', () => {
    const PanelWords = () => {
      const { common, panels } = useTesseraStrings();
      return h('p', null, `${panels.copyAll} ${panels.newest} ${common.cancel}`);
    };
    expect(renderToString(h(PanelWords))).toContain(`${TESSERA_STRINGS.panels.copyAll} Newest Cancel`);
    expect(draw({ strings: { panels: { copyAll: 'Tout copier' } } }, h(PanelWords))).toContain('Tout copier Newest Cancel');
  });

});

describe('TesseraProvider crash screen, art, icons and portals', () => {
  it('shows the app crash screen with the worded label and a reset', () => {
    const boundary = new ErrorBoundary({ children: null });
    boundary.state = { caught: true, error: new Error('boom') };
    const html = draw({ errorFallback: AppCrash, strings: { panels: { sectionFailed: 'Oups' } } }, boundary.render());
    expect(html).toContain('data-app-crash="function"');
    expect(html).toContain('Oups: boom');
    expect(renderToString(boundary.render())).toContain('This section could not be shown');
  });

  it('puts the app art in an EmptyState that names no icon', () => {
    const art = h('i', { 'data-app-art': '' });
    expect(draw({ emptyArt: art }, h(EmptyState, { message: 'None' }))).toContain('data-app-art');
    expect(draw({ emptyArt: art }, h(EmptyState, { message: 'None', icon: 'X' }))).not.toContain('data-app-art');
  });

  it('draws Icon names from the app icon set', () => {
    expect(draw({ icons: APP_ICONS }, h(Icon, { name: 'house' }))).toContain('M0 0h1');
    expect(renderToString(h(Icon, { name: 'house' }))).not.toContain('M0 0h1');
  });

  it('portals into the document the provider names, and the portaled content sees the provider', () => {
    const made = [];
    const element = () => ({ style: {}, appendChild: () => undefined });
    const appDocument = {
      getElementById: () => null,
      createElement: () => { const node = element(); made.push(node); return node; },
      body: element(),
    };
    seen.inBrowser = true;
    seen.containers.length = 0;
    const html = draw({ ...OVERRIDES, portalDocument: appDocument }, h(Portal, { layer: 'popover' }, h(Spinner)));
    seen.inBrowser = false;
    expect(made).toContain(seen.containers[0]);
    expect(html).toContain('app-spinner');
  });

  it('puts the provider document ahead of the one the Portal is rendered in', () => {
    const own = { name: 'own' };
    const provided = { name: 'host' };
    const global = { name: 'global' };
    const fallback = () => global;
    expect(portalDocumentFor(provided, own, fallback)).toBe(provided);
    expect(portalDocumentFor(undefined, own, fallback)).toBe(own);
    expect(portalDocumentFor(undefined, null, fallback)).toBe(global);
  });
});
