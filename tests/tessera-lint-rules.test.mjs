/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Linter } from 'eslint';
import stylelint from 'stylelint';
import { describe, expect, it } from 'vitest';
import { tesseraExtension } from '../scripts/standards/tessera-extension.mjs';

const extension = tesseraExtension();

const lintTsx = (code) => new Linter({ configType: 'flat' }).verify(code, [{
  files: ['**/*.jsx'],
  languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
  plugins: extension.eslint.plugins,
  rules: extension.eslint.rules,
}], 'app/src/views/Console.jsx').map((message) => message.ruleId);

const lintCss = async (code, codeFilename) => {
  const { results } = await stylelint.lint({ code, codeFilename, config: { plugins: extension.stylelint.plugins, rules: extension.stylelint.rules } });
  return results[0].warnings.map((warning) => warning.text.split(' is a class')[0]);
};

describe('the ESLint rules of the standards extension', () => {
  it('refuses an Icon written as a child of Button, and keeps the icon prop and IconButton', () => {
    expect(lintTsx('const A = () => <Button><Icon name="x" />Close</Button>;')).toEqual(['tessera/no-icon-button-child']);
    expect(lintTsx('const A = () => <><Button icon={<Icon name="x" />}>Close</Button><IconButton label="Close"><Icon name="x" /></IconButton></>;')).toEqual([]);
  });

  it('points a password or search TextInput to its own part', () => {
    expect(lintTsx('const A = () => <><TextInput type="password" /><TextInput type={\'search\'} /><TextInput type="email" /></>;'))
      .toEqual(['tessera/prefer-named-input', 'tessera/prefer-named-input']);
  });
});

describe('the internals rule of the standards extension', () => {
  const app = join(tmpdir(), 'app', 'src', 'theme.css');

  it('refuses a selector that names a class of a Tessera part, from an app stylesheet', async () => {
    expect(await lintCss('.my-log .log-panel__tag--goal { color: red; }\n.stat-row__value[data-mono] { gap: 0; }\n.dialog { gap: 0; }', app))
      .toEqual(['.log-panel__tag--goal', '.stat-row__value', '.dialog']);
  });

  it('keeps app classes and leaves the stylesheets of Tessera itself alone', async () => {
    expect(await lintCss('.my-log .my-log__tag { gap: 0; }', app)).toEqual([]);
    expect(await lintCss('.log-panel__tag { gap: 0; }', join(process.cwd(), 'src', 'composites', 'LogPanel', 'LogPanel.css'))).toEqual([]);
  });
});

describe('drag regions', () => {
  it('keep every control inside a drag region clickable', () => {
    const css = readFileSync(new URL('../src/tokens/app-region.css', import.meta.url), 'utf8');
    expect(css).toMatch(/\[data-app-region="drag"\] :is\(button, a, input, select, textarea, label, summary, [^)]*\[tabindex\]:not\(\[tabindex="-1"\]\)\),/);
  });
});
