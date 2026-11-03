/* @layer renderer-components @kind util */
import { AVATAR_INITIALS_MAX } from '../Avatar.constants';

const initialsOf = (label: string): string | undefined => {
  const letters = label.split(/\s+/).filter(Boolean).map((word) => [...word][0] ?? '').join('');
  const text = [...letters].slice(0, AVATAR_INITIALS_MAX).join('');
  return text === '' ? undefined : text;
};

export { initialsOf };
