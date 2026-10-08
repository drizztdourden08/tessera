/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { CompactRecordView } from '../src/composites/CompactRecordView';
import { resolveFieldKit } from '../src/composites/field-kits';
import { closedSetRoom } from '../src/composites/field-kits/behavior/closed-set-room';
import { closedSetTier } from '../src/composites/field-kits/behavior/closed-set-tier';
import { declaredValue } from '../src/composites/field-kits/declared-value';
import { clauseValueText } from '../src/composites/FilterBar/behavior/clause-value-text';
import { buildSchema } from '../src/data';
import { FILTER_STRINGS } from '../src/primitives/strings/filters-strings.constants';

const ROWS = [{ weight: 2, mode: 'fast', name: 'Mira' }];
const [weight, mode] = buildSchema(ROWS, {
  options: { weight: [{ value: 1, label: 'Light' }, { value: 2, label: 'Medium' }, { value: 3, label: 'Heavy' }], mode: ['fast', 'slow'] },
});

describe('SchemaConfig.options', () => {
  it('makes the field an enum with its names, and keeps the values as text in options', () => {
    expect(weight).toMatchObject({ kind: 'enum', closed: true, options: ['1', '2', '3'] });
    expect(weight.declaredOptions).toEqual([{ value: 1, label: 'Light' }, { value: 2, label: 'Medium' }, { value: 3, label: 'Heavy' }]);
  });

  it('hands a picked option back in the type it was declared in, so a number stays a number', () => {
    expect(declaredValue(weight, '2')).toBe(2);
    expect(declaredValue(mode, 'slow')).toBe('slow');
    expect(declaredValue(mode, 'typed by hand')).toBe('typed by hand');
  });

  it('still takes plain values, each its own name', () => {
    expect(mode.options).toEqual(['fast', 'slow']);
    expect(mode.declaredOptions).toEqual([{ value: 'fast', label: 'fast' }, { value: 'slow', label: 'slow' }]);
  });
});

describe('a declared set in the enum kit', () => {
  const kit = resolveFieldKit('enum');

  it('shows the names in the editor, the cell and a filter chip', () => {
    const editor = renderToStaticMarkup(h(kit.EditorControl, { field: weight, value: 2, onChange: () => undefined }));
    expect(editor).toContain('Medium');
    expect(editor).not.toContain('>2<');
    expect(renderToStaticMarkup(kit.renderCell(3, weight))).toContain('Heavy');
    expect(clauseValueText({ op: 'anyOf', value: ['1', '3'], strings: FILTER_STRINGS, labelOf: (text) => (text === '1' ? 'Light' : 'Heavy') })).toBe('Light, Heavy');
  });
});

describe('the measured enum editor', () => {
  it('prefers segments for a handful, chips for the rest of a closed set and a list past that', () => {
    expect(closedSetTier(3)).toBe('segments');
    expect(closedSetTier(7)).toBe('chips');
    expect(closedSetTier(40)).toBe('list');
    expect(closedSetTier(0)).toBe('list');
  });

  it('measures the row the control sits in, never the control', () => {
    const row = { clientWidth: 320 };
    const probe = { closest: (selector) => (selector === '.field-kit__open-set' ? row : null) };
    expect(closedSetRoom(probe)).toEqual({ box: row, width: 320 });
    const box = { clientWidth: 180 };
    expect(closedSetRoom({ closest: (selector) => (selector === '.field-kit__closed-set' ? box : null) })).toEqual({ box, width: 180 });
  });
});

describe('CompactRecordView fieldRenderers', () => {
  it('draws the app row for its path in the place of that field and the kit row for the rest', () => {
    const schema = buildSchema(ROWS, {});
    const draw = vi.fn((record) => h('p', { className: 'own-row' }, `weighs ${record.weight}`));
    const html = renderToStaticMarkup(h(CompactRecordView, { record: ROWS[0], schema, fieldRenderers: new Map([['weight', draw]]) }));
    expect(draw).toHaveBeenCalledWith(ROWS[0]);
    expect(html.indexOf('own-row')).toBeLessThan(html.indexOf('Mira'));
    expect(html).toContain('weighs 2');
  });
});
