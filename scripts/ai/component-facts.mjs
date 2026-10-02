/* @layer tooling-scripts @kind logic */
import { componentSymbol } from './component-symbol.mjs';
import { missingFields } from './missing-fields.mjs';
import { propsHash } from './props-hash.mjs';
import { readProps } from './read-props.mjs';
import { readTokens } from './read-tokens.mjs';

const partsOf = (component, exports) =>
  [...exports.values()]
    .filter((entry) => entry.name !== component.name && entry.file?.startsWith(`${component.folder}/`))
    .map((entry) => entry.name)
    .sort();

const usageFacts = (program, root, component) => {
  const symbol = componentSymbol(program, root, component);
  const props = symbol ? readProps(program.checker, symbol) : { own: [], inherited: { count: 0, from: [], extends: [] } };
  return { props, propsHash: propsHash(props), tokens: readTokens(root, component.folder) };
};

const componentFacts = ({ program, root, exports, gallery }, component) => {
  const story = gallery.get(component.name);
  return {
    ...component,
    page: Boolean(component.usage) && missingFields(component.usage).length === 0,
    imports: exports.get(component.name)?.specifiers ?? [],
    parts: partsOf(component, exports),
    gallery: story,
    ...(component.usage ? usageFacts(program, root, component) : {}),
  };
};

export { componentFacts };
