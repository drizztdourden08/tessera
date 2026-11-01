/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { LogPanel } from '../src/composites/LogPanel';
import { Button } from '../src/primitives/Button';
import { CodeBlock } from '../src/composites/CodeBlock';
import { CopyValue } from '../src/composites/CopyValue';
import { FactsPanel } from '../src/composites/FactsPanel';
import { DropZone } from '../src/primitives/DropZone';
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
const STRINGS = { common: { loading: 'Chargement', cancel: 'Annuler' }, fields: { dropFiles: 'Deposez ici' } };
const OVERRIDES = { spinner: AppSpinner };
const CopyProbe = ({ text }) => {
  const { copy } = useCopy();
  return h(Button, { onClick: () => copy(text) }, 'Copy');
};
const draw = (overrides, ...children) => renderToString(h(TesseraProvider, { overrides }, ...children));

describe('S2 TesseraProvider clipboard, placeholders and wording', { tags: ['standard'] }, () => {
  it('writes every copy button and an app useCopy through the app clipboard writer', async () => {
    const written = [];
    seen.clicks.length = 0;
    draw({ writeText: (text) => { written.push(text); } },
      h(CodeBlock, { code: 'pnpm build', language: 'text', copyable: true }),
      h(CopyProbe, { text: 'Brock 1.4.0' }),
      h(LogPanel, { rows: [], copyText: () => 'log text' }),
      h(CopyValue, { value: 'Room 4', text: 'https://archipelago.gg/room/4', label: 'room page' }),
      h(FactsPanel, { groups: [[{ label: 'Status', value: h('b', null, 'Hosting'), copyable: 'archipelago.gg:38281' }, { label: 'Seed', value: '2193', copyable: true }]] }));
    await Promise.all(seen.clicks.filter(Boolean).map((click) => click()));
    expect(written.sort()).toEqual(['2193', 'Brock 1.4.0', 'archipelago.gg:38281', 'https://archipelago.gg/room/4', 'log text', 'pnpm build']);
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

describe('S2 TesseraProvider crash screen, art, icons and portals', { tags: ['standard'] }, () => {
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
