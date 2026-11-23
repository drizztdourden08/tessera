/* @layer renderer-components @kind logic */
import type { TextareaProps } from '../../../primitives/Textarea';
import { DEFAULT_ROWS } from '../MarkdownEditor.constants';

const areaLook = (composer: boolean): Pick<TextareaProps, 'look' | 'autoGrow' | 'maxRows'> => (
  composer ? { look: 'bare', autoGrow: true, maxRows: DEFAULT_ROWS } : {}
);

export { areaLook };
