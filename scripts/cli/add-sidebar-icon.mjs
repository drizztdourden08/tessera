/* @layer tooling-scripts @kind logic */
import { insertInList } from './insert-in-list.mjs';
import { quoteText } from './quote-text.mjs';

const QUOTED_KEY = /'[^']+':\s*'/;

const addSidebarIcon = (text, folder, name, icon) => {
  const declared = text.indexOf('const PAGE_ICONS');
  if (declared === -1) return undefined;
  const pages = text.indexOf('{', declared);
  const key = text.indexOf(`${quoteText(folder)}: {`, pages);
  if (key === -1) return insertInList(text, pages, `${quoteText(folder)}: { ${name}: ${quoteText(icon)} }`);
  const open = text.indexOf('{', key);
  const block = text.slice(open, text.indexOf('}', open));
  return insertInList(text, open, `${QUOTED_KEY.test(block) ? quoteText(name) : name}: ${quoteText(icon)}`);
};

export { addSidebarIcon };
