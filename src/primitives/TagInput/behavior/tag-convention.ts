/* @layer renderer-components @kind logic */
import type { TagAdvice, TagValidationResult, TagValidator } from '../TagInput.type';

const adviseTag = (raw: string, validate?: TagValidator): TagAdvice => {
  const tag = raw.trim();
  if (!tag || !validate) return { ok: true, message: null };

  const verdict: TagValidationResult = validate(tag);

  if (verdict === true) return { ok: true, message: null };
  if (verdict === false) return { ok: false, message: null };
  return { ok: false, message: verdict };
};

export { adviseTag };
