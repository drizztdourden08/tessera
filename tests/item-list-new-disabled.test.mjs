/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ItemList } from '../src/composites/ItemList';
import { ListDetail } from '../src/composites/ListDetail';
import { Toast } from '../src/composites/Toast';

const noop = () => undefined;
const WHY = 'Start a game to make a new save.';
const SAVES = [{ id: 'a', name: 'Before the palace' }];
const LIST = { title: 'Saves', items: SAVES, getId: (save) => save.id, getName: (save) => save.name, onCreate: noop, createLabel: 'New save' };
const draw = (props) => renderToStaticMarkup(h(ItemList, { ...LIST, ...props }));
const newButton = (html) => html.match(/<button[^>]*data-tour="item-list-new"[^>]*>/)?.[0] ?? '';

describe('ItemList New disabled with a reason', () => {
  it('keeps the same New button when newDisabled is left out or false', () => {
    expect(draw({ newDisabled: false })).toBe(draw({}));
    expect(newButton(draw({}))).not.toMatch(/disabled|aria-description/);
  });

  it('greys New out with its reason in a tooltip and as its description, still a Tab stop so focus shows the reason', () => {
    const html = draw({ newDisabled: WHY });
    expect(html).toContain('<span class="tooltip-anchor reason-tip reason-tip--stop"><button');
    const button = newButton(html);
    expect(button).toContain('aria-disabled="true"');
    expect(button).toContain(`aria-description="${WHY}"`);
    expect(button).not.toMatch(/ disabled=""/);
  });

  it('disables New outright when newDisabled is true, with no tooltip', () => {
    const html = draw({ newDisabled: true });
    expect(newButton(html)).toContain('disabled=""');
    expect(html).not.toContain('reason-tip');
  });

  it('takes newDisabled through ListDetail list props', () => {
    const html = renderToStaticMarkup(h(ListDetail, { list: { ...LIST, newDisabled: WHY }, selectedId: null, onSelect: noop, detail: null }));
    expect(newButton(html)).toContain(`aria-description="${WHY}"`);
  });
});

describe('Toast undo', () => {
  it('draws Undo as the action of a toast that carries undo', () => {
    const html = renderToStaticMarkup(h(Toast, { item: { id: 'loaded', message: 'Save loaded.', undo: noop }, onDismiss: noop }));
    expect(html).toMatch(/<button[^>]*class="[^"]*toast__action[^"]*"[^>]*>.*Undo.*<\/button>/);
  });
});
