/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { EditorBar } from '../stories/preview/EditorHeader/EditorBar';

const ignore = () => undefined;

const draw = (props) => renderToString(h(EditorBar, { name: 'Keysanity', onNameChange: ignore, state: 'clean', ...props }));

describe('EditorBar, the preview for EditorHeader', () => {
  it('draws the name as a text box named Name, the context and the save state', () => {
    const html = draw({ context: ['A Link to the Past', 'Preset'] });
    expect(html).toMatch(/<input[^>]*aria-label="Name"[^>]*value="Keysanity"/);
    expect(html).toContain('A Link to the Past');
    expect(html).toContain('editor-context__sep');
    expect(html).toContain('role="status"');
    expect(html).toContain('No changes');
  });

  it('names each of the five states', () => {
    const words = { clean: 'No changes', dirty: 'Unsaved changes', saving: 'Saving', saved: 'Saved', error: 'Not saved' };
    for (const [state, word] of Object.entries(words)) {
      const html = draw({ state });
      expect(html).toContain(`data-status="${state}"`);
      expect(html).toContain(word);
    }
    expect(draw({ state: 'saving' })).toContain('status--pulse');
  });

  it('reads the reason of a failed save to a screen reader', () => {
    const html = draw({ state: 'error', error: 'The disk is full.' });
    expect(html).toContain('Not saved: The disk is full.');
    expect(draw({ state: 'dirty', error: 'The disk is full.' })).not.toContain('The disk is full.');
  });

  it('takes a back arrow named after the parent, and a foot edge with no name', () => {
    expect(draw({ back: { label: 'Sessions', onSelect: ignore } })).toContain('aria-label="Back to Sessions"');
    const foot = renderToString(h(EditorBar, { state: 'dirty', edge: 'foot' }));
    expect(foot).toContain('editor-bar--foot');
    expect(foot).not.toContain('<input');
  });

  it('marks an empty name as invalid with its message', () => {
    const html = draw({ name: '', nameError: 'Give it a name.' });
    expect(html).toContain('aria-invalid="true"');
    expect(html).toContain('Give it a name.');
  });
});
