/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ActionTile } from '../src/composites/ActionTile';

const noop = () => undefined;

const render = (props) => renderToString(h(ActionTile, { label: 'Players', value: '2 / 3', ...props }));

describe('ActionTile', () => {
  it('is a group named by its label, with its value, unit and meta', () => {
    const html = render({ unit: 'connected', meta: 'Cleo is offline', tone: 'danger' });
    const [, labelledBy] = /role="group" aria-labelledby="([^"]+)"/.exec(html);
    expect(html).toContain(`<span class="text-el text-el--span action-tile__label" id="${labelledBy}">Players</span>`);
    expect(html).toContain('class="action-tile"');
    expect(html).toContain('data-size="md"');
    expect(html).toContain('class="text-el text-el--span text-el--toned text-el--tone-danger action-tile__value">2 / 3<');
    expect(render({ tone: 'neutral' })).toContain('text-el--tone-muted action-tile__value');
    expect(html).toContain('action-tile__unit">connected<');
    expect(html).toContain('action-tile__meta">Cleo is offline<');
    expect(html).not.toContain('action-tile__tools');
    expect(html).not.toContain('action-tile__action');
  });

  it('runs one action at its foot, secondary by default', () => {
    const html = render({ action: { label: 'Stop', icon: 'square', onSelect: noop } });
    expect(html).toContain('action-tile__action');
    expect(html).toContain('btn--secondary');
    expect(html).toContain('>Stop</span>');
    expect(render({ action: { label: 'Stop', onSelect: noop, tone: 'danger', disabled: true } })).toMatch(/btn--danger[^>]*disabled=""/);
  });

  it('copies through CopyButton when the action or a tool takes copy', () => {
    const action = render({ action: { label: 'Copy address', copy: 'localhost:38281' } });
    expect(action).toContain('class="copy-button"');
    expect(action).toContain('>Copy address</span>');
    expect(action).toContain('role="status"');
    const tool = render({ tools: [{ label: 'Copy the path', copy: 'C:/runs' }] });
    expect(tool).toMatch(/action-tile__tools"><span class="copy-button"><button[^>]*aria-label="Copy the path"/);
  });

  it('puts tools and the open chevron in the top corner, named by their labels', () => {
    const html = render({ tools: [{ label: 'Open the runs folder', icon: 'folder-open', onSelect: noop }], onOpen: noop, openLabel: 'Show the Players widget' });
    expect(html).toMatch(/aria-label="Open the runs folder"[^>]*title="Open the runs folder"/);
    expect(html).toMatch(/aria-label="Show the Players widget"[^>]*title="Show the Players widget"/);
    expect(render({ onOpen: noop })).toContain('aria-label="Open"');
  });

  it('shows a status word beside the label and takes the small size', () => {
    const html = render({ status: { label: 'hosting', tone: 'success' }, size: 'sm' });
    expect(html).toContain('data-size="sm"');
    expect(html).toMatch(/status--success[^"]*action-tile__status/);
    expect(html).toContain('hosting');
  });
});
