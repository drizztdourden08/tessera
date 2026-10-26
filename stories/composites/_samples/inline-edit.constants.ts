/* @layer stories @kind data */
const MIN_LENGTH = 3;

const MAX_LENGTH = 40;

const nameRule = (text: string): string | undefined => {
  if (text.length < MIN_LENGTH) return `Use at least ${MIN_LENGTH} characters.`;
  return text.length > MAX_LENGTH ? `Use at most ${MAX_LENGTH} characters.` : undefined;
};

const INLINE_EDIT_CODE = `import { InlineEdit } from '@drizztdourden08/tessera';

<InlineEdit label="Title" value={title} onCommit={setTitle} placeholder="Add a title" />
<InlineEdit value={title} onCommit={setTitle} validate={(text) => (text.length < 3 ? 'Use at least 3 characters.' : undefined)} />
<InlineEdit label="Notes" value={notes} onCommit={setNotes} multiline />`;

export { INLINE_EDIT_CODE, nameRule };
