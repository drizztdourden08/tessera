/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { InlineCreateForm } from '../src/composites/InlineCreateForm';

const create = () => undefined;

describe('InlineCreateForm dashed', () => {
  it('draws no dashed class by default', () => {
    expect(renderToString(h(InlineCreateForm, { onCreate: create }))).not.toContain('inline-create-form--dashed');
  });

  it('adds inline-create-form--dashed when asked', () => {
    expect(renderToString(h(InlineCreateForm, { onCreate: create, dashed: true }))).toContain('inline-create-form--dashed');
  });

  it('keeps the class beside compact, which draws no border', () => {
    expect(renderToString(h(InlineCreateForm, { onCreate: create, dashed: true, compact: true }))).toContain('inline-create-form--compact inline-create-form--dashed');
  });
});
