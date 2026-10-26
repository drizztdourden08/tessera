/* @layer renderer-components @kind util */
import { TASK_CLASS } from '../Markdown.constants';
import type { MarkdownChild, MarkdownNode } from '../Markdown.type';

const isBox = (child: MarkdownChild): boolean => child.type === 'element' && child.tagName === 'input';

const boxOf = (item: MarkdownNode): MarkdownChild | undefined => {
  const direct = item.children.find(isBox);
  if (direct) return direct;
  const first = item.children.find((child) => child.type === 'element' && child.tagName === 'p');
  return first?.type === 'element' ? first.children.find(isBox) : undefined;
};

const taskState = (item: MarkdownNode | undefined): boolean | undefined => {
  const classes = item?.properties.className;
  if (!item || !Array.isArray(classes) || !classes.includes(TASK_CLASS)) return undefined;
  const box = boxOf(item);
  return box?.type === 'element' ? box.properties.checked === true : undefined;
};

export { taskState };
