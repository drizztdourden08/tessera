/* @layer tooling-scripts @kind test */
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Linter } from 'eslint';
import stylelint from 'stylelint';
import { describe, expect, it } from 'vitest';
import { tesseraExtension } from '../scripts/standards/tessera-extension.mjs';

const MEASURED_MS = 8_000;
const TIMEOUT = MEASURED_MS * 3;
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

describe('K1 the ESLint rules of the standards extension', { tags: ['standard'] }, () => {
  it('refuses an Icon written as a child of Button, and keeps the icon prop and IconButton', () => {
    expect(lintTsx('const A = () => <Button><Icon name="x" />Close</Button>;')).toEqual(['tessera/no-icon-button-child']);
    expect(lintTsx('const A = () => <><Button icon={<Icon name="x" />}>Close</Button><IconButton label="Close"><Icon name="x" /></IconButton></>;')).toEqual([]);
  }, TIMEOUT);

  it('points a password or search TextInput to its own part', () => {
    expect(lintTsx('const A = () => <><TextInput type="password" /><TextInput type={\'search\'} /><TextInput type="email" /></>;'))
      .toEqual(['tessera/prefer-named-input', 'tessera/prefer-named-input']);
  });
});

describe('K1 the internals rule of the standards extension', { tags: ['standard'] }, () => {
  const app = join(tmpdir(), 'app', 'src', 'theme.css');

  it('refuses a selector that names a class of a Tessera part, from an app stylesheet', async () => {
    expect(await lintCss('.my-log .log-panel__tag--goal { color: red; }\n.stat-row__value[data-mono] { gap: 0; }\n.dialog { gap: 0; }', app))
      .toEqual(['.log-panel__tag--goal', '.stat-row__value', '.dialog']);
  }, TIMEOUT);

  it('keeps app classes and leaves the stylesheets of Tessera itself alone', async () => {
    expect(await lintCss('.my-log .my-log__tag { gap: 0; }', app)).toEqual([]);
    expect(await lintCss('.log-panel__tag { gap: 0; }', join(process.cwd(), 'src', 'composites', 'LogPanel', 'LogPanel.css'))).toEqual([]);
  });
});
