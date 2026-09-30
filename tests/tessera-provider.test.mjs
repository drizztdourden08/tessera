/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Button } from '../src/primitives/Button';
import { IconButton } from '../src/primitives/IconButton';
import { Spinner } from '../src/primitives/Spinner';
import { TesseraProvider } from '../src/primitives/TesseraProvider';

const AppSpinner = ({ size, label, className }) => h('i', { className: `app-spinner ${className}`, 'data-size': size, role: 'status', 'aria-label': label });

const OVERRIDES = { spinner: AppSpinner };

describe('TesseraProvider', () => {
  it('draws the Tessera ring when no provider names a spinner', () => {
    const html = renderToString(h(Spinner, { size: 'lg' }));
    expect(html).toContain('class="spinner"');
    expect(html).toContain('data-size="lg"');
  });

  it('hands every Spinner below it to the app spinner, inside buttons too', () => {
    const html = renderToString(h(TesseraProvider, { overrides: OVERRIDES },
      h(Spinner, { label: 'Syncing' }),
      h(Button, { loading: true }, 'Save'),
      h(IconButton, { label: 'Refresh', loading: true }, 'R')));
    expect(html.match(/app-spinner/g)).toHaveLength(3);
    expect(html).toContain('aria-label="Syncing"');
    expect(html).not.toContain('class="spinner');
  });

  it('lets an inner provider give back the Tessera spinner for its subtree', () => {
    const html = renderToString(h(TesseraProvider, { overrides: OVERRIDES },
      h(TesseraProvider, { overrides: { spinner: undefined } }, h(Spinner))));
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
