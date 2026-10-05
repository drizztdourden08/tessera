/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SaveBar } from '../src/composites/SaveBar';

const ignore = () => undefined;
const draw = (props) => renderToString(h(SaveBar, { state: 'clean', onSave: ignore, onDiscard: ignore, ...props }));
const button = (html, word) => new RegExp(`<button[^>]*>(?:(?!</button>).)*>${word}</span></button>`).exec(html)?.[0] ?? '';

describe('SaveBar', () => {
  it('draws the save state in a status region on the button row bar', () => {
    const html = draw();
    expect(html).toMatch(/class="[^"]*button-row button-row--bar save-bar save-bar--clean/);
    expect(html).toContain('button-row__lead');
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

  it('shows the reason of a failed save only in the error state', () => {
    expect(draw({ state: 'error', error: 'The disk is full.' })).toMatch(/role="status".*Not saved.*The disk is full\./);
    expect(draw({ state: 'dirty', error: 'The disk is full.' })).not.toContain('The disk is full.');
  });

  it('turns Save and Discard off while there is nothing to save', () => {
    for (const state of ['clean', 'saved']) {
      const html = draw({ state });
      expect(button(html, 'Save')).toContain('disabled');
      expect(button(html, 'Discard')).toContain('disabled');
    }
    const dirty = draw({ state: 'dirty' });
    expect(button(dirty, 'Save')).not.toContain('disabled');
    expect(button(dirty, 'Discard')).not.toContain('disabled');
    expect(button(draw({ state: 'saving' }), 'Discard')).toContain('disabled');
    expect(button(draw({ state: 'error' }), 'Save')).not.toContain('disabled');
  });

  it('leaves Discard out without onDiscard and takes both labels', () => {
    expect(draw({ state: 'dirty', onDiscard: undefined })).not.toContain('Discard');
    const html = draw({ state: 'dirty', saveLabel: 'Save preset', discardLabel: 'Reset all' });
    expect(html).toContain('Save preset');
    expect(html).toContain('Reset all');
  });
});
