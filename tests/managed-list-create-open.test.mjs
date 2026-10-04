/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { InlineCreateForm } from '../src/composites/InlineCreateForm';
import { ManagedList } from '../src/composites/ManagedList';
import { focusLost } from '../src/composites/ManagedList/behavior/focus-lost';
import { openChange } from '../src/composites/ManagedList/behavior/open-change';
import { MasterDetail } from '../src/composites/MasterDetail';

const base = {
  title: 'Profiles',
  items: [],
  getId: (profile) => profile.id,
  getName: (profile) => profile.name,
  createLabel: 'New profile',
  empty: 'Create a profile to get started.',
  create: () => h(InlineCreateForm, { placeholder: 'Profile name', onCreate: () => {} }),
};

const draw = (props) => renderToStaticMarkup(h(ManagedList, { ...base, ...props }));

describe('ManagedList createOpen', () => {
  it('starts the form open when the app holds createOpen, as on a first run with no items', () => {
    const html = draw({ createOpen: true, onCreateOpenChange: () => {} });
    expect(html).toContain('placeholder="Profile name"');
    expect(html).not.toContain('>New profile<');
    expect(html).not.toContain('>Cancel<');
    expect(html).toContain('Create a profile to get started.');
  });

  it('keeps the form shut while createOpen is false, and starts shut on its own tracking', () => {
    expect(draw({ createOpen: false })).not.toContain('placeholder="Profile name"');
    expect(draw({ createOpen: false })).toContain('>New profile<');
    expect(draw({})).not.toContain('placeholder="Profile name"');
  });

  it('asks the app through onCreateOpenChange, and tracks the state itself only without createOpen', () => {
    const setOwn = vi.fn();
    const onChange = vi.fn();
    openChange(true, setOwn, onChange)(false);
    expect(setOwn).not.toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(false);
    openChange(undefined, setOwn, onChange)(true);
    expect(setOwn).toHaveBeenCalledWith(true);
    expect(onChange).toHaveBeenLastCalledWith(true);
    openChange(undefined, setOwn)(false);
    expect(setOwn).toHaveBeenLastCalledWith(false);
  });

  it('moves focus after the app closes the form only when focus went down with it', () => {
    const body = {};
    expect(focusLost({ body, activeElement: body })).toBe(true);
    expect(focusLost({ body, activeElement: null })).toBe(true);
    expect(focusLost({ body, activeElement: {} })).toBe(false);
  });

  it('passes createOpen through the list of MasterDetail', () => {
    const html = renderToStaticMarkup(h(MasterDetail, {
      list: { ...base, createOpen: true }, selectedId: null, onSelect: () => {}, detail: 'The editor',
    }));
    expect(html).toContain('placeholder="Profile name"');
  });
});
