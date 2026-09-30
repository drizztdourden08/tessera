/* @layer renderer-components @kind util */
import type { TagAdvice, TagTone } from '../TagInput.type';

const tagChipClass = (tone: TagTone, advice: TagAdvice | undefined): string =>
  [
    'tag-input__chip',
    tone === 'primary' && 'tag-input__chip--primary',
    advice?.ok === false && 'tag-input__chip--off-convention',
  ].filter(Boolean).join(' ');

export { tagChipClass };
