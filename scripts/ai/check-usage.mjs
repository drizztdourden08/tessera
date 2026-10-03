/* @layer tooling-scripts @kind logic */
import { missingFields } from './missing-fields.mjs';
import { placeholderFields } from './placeholder-fields.mjs';

const finding = (kind, name, message) => ({ kind, name, message, coverage: false });

const offTree = (usage, { leafKeys, words }) => {
  const path = usage.tree?.path;
  if (!Array.isArray(path) || path.length === 0 || leafKeys.has(JSON.stringify(path))) return [];
  return [`tree.path ${path.join(' > ')} does not follow the questions in ${words.tree} down to an answer with no further question`];
};

const unknownAlternatives = (usage, { componentNames, words }) =>
  (Array.isArray(usage.avoidWhen) ? usage.avoidWhen : [])
    .filter((entry) => typeof entry?.use === 'string' && !componentNames.has(entry.use))
    .map((entry) => `avoidWhen names ${entry.use}, ${words.unknown}`);

const staleProps = (usage, currentHash) => {
  if (currentHash === undefined || usage.propsHash === currentHash) return [];
  return [`propsHash is ${usage.propsHash} but the props now hash to ${currentHash}. Re-read the usage against the props, then set propsHash: '${currentHash}'`];
};

const checkUsage = (name, usage, context) => [
  ...missingFields(usage).map((message) => finding('missing-field', name, message)),
  ...placeholderFields(name, usage).map((message) => ({ ...finding('placeholder', name, message), coverage: true })),
  ...unknownAlternatives(usage, context).map((message) => finding('unknown-alternative', name, message)),
  ...offTree(usage, context).map((message) => finding('off-tree', name, message)),
  ...staleProps(usage, context.currentHash).map((message) => finding('stale-props', name, message)),
];

export { checkUsage };
