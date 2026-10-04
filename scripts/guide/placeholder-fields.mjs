/* @layer tooling-scripts @kind logic */
import { REQUIRED_LISTS } from './guide.constants.mjs';
import { placeholderSentences } from './placeholder-sentences.mjs';

const textOf = (entry) => (typeof entry === 'string' ? entry : entry?.case);

const lastAnswer = (usage) => (Array.isArray(usage.tree?.path) ? usage.tree.path.at(-1) : undefined);

const placeholderFields = (name, usage) => {
  const sentences = placeholderSentences(name, lastAnswer(usage));
  const lists = REQUIRED_LISTS.filter((field) => Array.isArray(usage[field]) && usage[field].some((entry) => textOf(entry) === sentences[field]));
  return [
    ...(usage.job === sentences.job ? ['job'] : []),
    ...lists,
    ...(usage.tree?.rule === sentences.rule ? ['tree.rule'] : []),
  ].map((field) => `${field} still holds the sentence tessera new wrote; replace it`);
};

export { placeholderFields };
