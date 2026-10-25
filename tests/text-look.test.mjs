/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import stylelint from 'stylelint';
import { describe, expect, it } from 'vitest';
import { Text } from '../src/primitives/Text';
import { tesseraExtension } from '../scripts/standards/tessera-extension.mjs';

const lintCss = async (code) => {
  const { stylelint: facet } = tesseraExtension();
  const { results } = await stylelint.lint({ code, config: { plugins: facet.plugins, rules: facet.rules } });
  return results[0].warnings.map((warning) => warning.rule);
};

describe('Text', () => {
  it('takes a tone as Span does, on top of its variant', () => {
    const html = renderToString(h(Text, { variant: 'caption', tone: 'danger' }, 'Port taken'));
    expect(html).toContain('class="text text--caption text--toned text-el--tone-danger"');
  });

  it('takes the faint tone, for decoration and secondary hints only', () => {
    const html = renderToString(h(Text, { variant: 'caption', tone: 'faint' }, 'Hold Shift to snap'));
    expect(html).toContain('class="text text--caption text--toned text-el--tone-faint"');
  });

  it('sets the code face and tabular figures', () => {
    expect(renderToString(h(Text, { mono: true, numeric: true }, '01:12'))).toContain('class="text text--mono text--numeric"');
  });

  it('draws an overline over a group and keeps a class from the host', () => {
    expect(renderToString(h(Text, { variant: 'overline', className: 'host' }, 'Templates'))).toContain('class="text text--overline host"');
  });
});

describe('the disabled text rule of the standards extension', () => {
  it('refuses disabled text colour and keeps disabled borders', async () => {
    expect(await lintCss('.a { color: var(--c-text-disabled); }')).toEqual(['tessera/no-disabled-text']);
    expect(await lintCss('.a { border-color: var(--c-text-disabled); background: var(--c-text-disabled); color: var(--c-text-faint); }')).toEqual([]);
  });

  it('lets faint text through, and disabled text inside a disabled selector', async () => {
    expect(await lintCss('.a { --tone-ink: var(--c-text-faint); }')).toEqual([]);
    expect(await lintCss('.a:disabled { color: var(--c-text-disabled); }')).toEqual([]);
    expect(await lintCss('.a { --tone-ink: var(--c-text-disabled); }')).toEqual(['tessera/no-disabled-text']);
  });
});
