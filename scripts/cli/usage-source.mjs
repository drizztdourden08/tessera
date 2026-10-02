/* @layer tooling-scripts @kind logic */
import { quoteText } from './quote-text.mjs';
import { templatePropsHash } from './template-props-hash.mjs';
import { usageJob } from './usage-job.mjs';

const TYPE_IMPORTS = {
  tessera: 'import type { ComponentUsage } from \'../../ai/usage.type\';',
  app: 'import type { ComponentUsage } from \'@drizztdourden08/tessera\';',
};

const exampleOf = ({ mode, kind, names, folder }) => {
  const from = mode === 'tessera' ? '@drizztdourden08/tessera' : `../../${folder.split('/').slice(1).join('/')}`;
  const element = kind === 'view'
    ? `<${names.name} title="${names.human}" />`
    : `<${names.name} title="${names.human}">The content ${names.name} holds.</${names.name}>`;
  return `import { ${names.name} } from '${from}';\n\nconst ${names.name}Sample = () => ${element};\n`;
};

const placeOf = ({ tree, names }) => {
  if (!tree) return ['  buildingBlock: true,'];
  return [
    '  tree: {',
    `    path: [${tree.map(quoteText).join(', ')}],`,
    `    rule: ${quoteText(`Write in one line why ${names.name} answers ${tree.at(-1)}.`)},`,
    '  },',
  ];
};

const usageSource = (spec) => {
  const { name } = spec.names;
  return [
    `/* @layer ${spec.layer} @kind data */`,
    TYPE_IMPORTS[spec.mode],
    '',
    'const usage = {',
    `  job: ${quoteText(usageJob(name))},`,
    `  useWhen: [${quoteText(`Write a case where ${name} is the part to use.`)}],`,
    `  avoidWhen: [{ case: ${quoteText(`Write a case where a plain Box fits better than ${name}.`)}, use: 'Box' }],`,
    `  rules: [${quoteText(`Write a rule every use of ${name} follows.`)}],`,
    `  a11y: [${quoteText(`Write what ${name} gives a keyboard or screen reader user.`)}],`,
    ...placeOf(spec),
    `  example: \`${exampleOf(spec)}\`,`,
    `  propsHash: '${templatePropsHash()}',`,
    '} satisfies ComponentUsage;',
    '',
    'export { usage };',
    '',
  ].join('\n');
};

export { usageSource };
