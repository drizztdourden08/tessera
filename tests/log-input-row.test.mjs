/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { LogPanel } from '../src/composites/LogPanel/LogPanel';

const ROWS = [{ id: 'r1', gutter: '', tag: '', kind: 'out', message: 'started' }];
const render = (props) => renderToString(h(LogPanel, { rows: ROWS, ...props }));

describe('LogPanel input row', () => {
  it('stays hidden without onInput', () => {
    expect(render({})).not.toContain('log-panel__input-row');
  });

  it('shows a disabled field with its placeholder, with or without onInput', () => {
    const bare = render({ inputDisabled: true, inputPlaceholder: 'This run has no input' });
    expect(bare).toContain('log-panel__input-row');
    expect(bare).toContain('placeholder="This run has no input"');
    expect(bare).toMatch(/<input[^>]*disabled/);
    const sent = render({ onInput: () => undefined, inputDisabled: true, inputPlaceholder: 'The run is over' });
    expect(sent).toMatch(/<input[^>]*disabled/);
    expect(sent).toContain('The run is over');
  });

  it('leaves the field enabled when only onInput is set', () => {
    expect(render({ onInput: () => undefined })).not.toMatch(/<input[^>]*disabled/);
  });
});
