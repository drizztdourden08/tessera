/* @layer tooling-scripts @kind logic */
import { readText } from './read-text.mjs';

const editFile = (root, path, change) => {
  const { text, eol } = readText(root, path);
  const content = change(text);
  if (content === undefined) return { problem: `could not find where to add it in ${path}` };
  return { edit: { path, content: content.replace(/\n/g, eol) } };
};

export { editFile };
