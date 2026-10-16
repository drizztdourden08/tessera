/* @layer renderer-components @kind util */
import { STACKED_CLASS } from '../StudioLayout.constants';
import type { StudioParts } from './studio-parts.type';

const unstackedEditorWidth = ({ root, body, editor }: StudioParts): number => {
  if (!root.classList.contains(STACKED_CLASS)) return editor.getBoundingClientRect().width;
  const scrolled = body.scrollTop;
  root.classList.remove(STACKED_CLASS);
  const width = editor.getBoundingClientRect().width;
  root.classList.add(STACKED_CLASS);
  body.scrollTop = scrolled;
  return width;
};

export { unstackedEditorWidth };
