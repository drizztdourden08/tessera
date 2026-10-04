/* @layer tooling-scripts @kind logic */
import { quoteText } from './quote-text.mjs';
import { placeholderSentences } from '../guide/placeholder-sentences.mjs';
import { templatePropsHash } from './template-props-hash.mjs';

const TYPE_IMPORTS = {
  tessera: 'import type { ComponentUsage } from \'../../guide/usage.type\';',
  app: 'import type { ComponentUsage } from \'@drizztdourden08/tessera\';',
};

const exampleOf = ({ kind, names, exampleImport }) => {
  const element = kind === 'view'
    ? `<${names.name} title="${names.human}" />`
    : `<${names.name} title="${names.human}">The content ${names.name} holds.</${names.name}>`;
  return `import { ${names.name} } from '${exampleImport}';\n\nconst ${names.name}Sample = () => ${element};\n`;
};

const placeOf = ({ tree }, sentences) => {
  if (!tree) return ['  buildingBlock: true,'];
  return [
    '  tree: {',
    `    path: [${tree.map(quoteText).join(', ')}],`,
    `    rule: ${quoteText(sentences.rule)},`,
    '  },',
  ];
};

const usageSource = (spec) => {
  const sentences = placeholderSentences(spec.names.name, spec.tree?.at(-1));
  return [
    `/* @layer ${spec.layer} @kind data */`,
    TYPE_IMPORTS[spec.mode],
    '',
    'const usage = {',
    `  job: ${quoteText(sentences.job)},`,
    `  useWhen: [${quoteText(sentences.useWhen)}],`,
    `  avoidWhen: [{ case: ${quoteText(sentences.avoidWhen)}, use: 'Box' }],`,
    `  rules: [${quoteText(sentences.rules)}],`,
    `  a11y: [${quoteText(sentences.a11y)}],`,
    ...placeOf(spec, sentences),
    `  example: \`${exampleOf(spec)}\`,`,
    `  propsHash: '${templatePropsHash()}',`,
    '} satisfies ComponentUsage;',
    '',
    'export { usage };',
    '',
  ].join('\n');
};

export { usageSource };
