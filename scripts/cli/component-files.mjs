/* @layer tooling-scripts @kind logic */
import { barrelSource } from './barrel-source.mjs';
import { componentSource } from './component-source.mjs';
import { styleSource } from './style-source.mjs';
import { typesSource } from './types-source.mjs';
import { usageSource } from './usage-source.mjs';

const componentFiles = (spec) => {
  const { folder, names } = spec;
  return [
    { path: `${folder}/${names.name}.tsx`, content: componentSource(spec) },
    { path: `${folder}/${names.name}.type.ts`, content: typesSource(spec) },
    { path: `${folder}/${names.name}.css`, content: styleSource(spec) },
    { path: `${folder}/${names.name}.usage.ts`, content: usageSource(spec) },
    { path: `${folder}/index.ts`, content: barrelSource(spec) },
  ];
};

export { componentFiles };
