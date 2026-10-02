/* @layer tooling-scripts @kind logic */
import { APP_IMPORTS, TESSERA_IMPORTS } from './template.constants.mjs';

const importsOf = (spec) => (spec.mode === 'tessera' ? TESSERA_IMPORTS[spec.kind] : APP_IMPORTS);

const viewBody = ({ kebab }) => [
  `    <Box as="section" className={className ? \`${kebab} \${className}\` : '${kebab}'}>`,
  `      <Text as="h1" variant="title" className="${kebab}__title">{title}</Text>`,
];

const partBody = ({ kebab }) => [
  `    <Box className={className ? \`${kebab} \${className}\` : '${kebab}'}>`,
  `      <Text variant="label" className="${kebab}__title">{title}</Text>`,
];

const componentSource = (spec) => {
  const { name, props } = spec.names;
  return [
    `/* @layer ${spec.layer} @kind component */`,
    ...importsOf(spec),
    `import type { ${props} } from './${name}.type';`,
    `import './${name}.css';`,
    '',
    `const ${name} = (props: ${props}) => {`,
    '  const { title, children, className } = props;',
    '  return (',
    ...(spec.kind === 'view' ? viewBody(spec.names) : partBody(spec.names)),
    '      {children}',
    '    </Box>',
    '  );',
    '};',
    '',
    `export { ${name} };`,
    '',
  ].join('\n');
};

export { componentSource };
