/* @layer tooling-scripts @kind test */
import stylelint from 'stylelint';
import { describe, expect, it } from 'vitest';
import { tesseraExtension } from '../scripts/standards/tessera-extension.mjs';

const lintCss = async (code) => {
  const { stylelint: facet } = tesseraExtension();
  const { results } = await stylelint.lint({ code, config: { plugins: facet.plugins, rules: facet.rules } });
  return results[0].warnings.map((warning) => warning.rule);
};

describe('K1 the disabled text rule of the standards extension', { tags: ['standard'] }, () => {
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
