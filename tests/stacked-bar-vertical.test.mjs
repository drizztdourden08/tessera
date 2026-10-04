/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { StackedBar } from '../src/primitives/StackedBar';
import { barTemplate } from '../src/primitives/StackedBar/behavior/bar-template';

const segment = (id, value) => ({ id, label: id, value });

describe('a vertical stacked bar', () => {
  it('lays the tracks across, or up from the bottom when vertical', () => {
    const sizes = ['0.5fr', '0.3fr', '0.2fr'];
    expect(barTemplate(sizes, 'horizontal')).toEqual({ gridTemplateColumns: '0.5fr 0.3fr 0.2fr' });
    expect(barTemplate(sizes, 'vertical')).toEqual({ gridTemplateRows: '0.2fr 0.3fr 0.5fr' });
    expect(sizes).toEqual(['0.5fr', '0.3fr', '0.2fr']);
  });

  it('stacks a vertical bar bottom to top, with free room on top and the legend in the same order', () => {
    const segments = [segment('Game', 4), segment('Chat', 1), segment('Tray', 0.5), segment('Fonts', 0.25)];
    const html = renderToString(h(StackedBar, { segments, limit: 3, total: 8, legend: true, label: 'Memory', orientation: 'vertical', height: 200 }));
    expect(html).toContain('data-orientation="vertical"');
    expect(html).toContain('height:200px');
    expect(html).toContain('grid-template-rows:0.2813fr 0.0938fr 0.125fr 0.5fr');
    const order = ['data-color="free"', 'data-color="neutral"', 'data-color="violet"', 'data-color="blue"'].map((mark) => html.indexOf(mark));
    expect(order).toEqual([...order].sort((a, b) => a - b));
    expect(html.indexOf('Other (2)')).toBeLessThan(html.indexOf('>Game<'));
  });
});
