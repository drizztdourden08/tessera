/* @layer renderer-components @kind hook */
import { useState } from 'react';

const useFoldedGroups = () => {
  const [folded, setFolded] = useState<readonly string[]>([]);
  const toggle = (group: string): void => setFolded((now) => (now.includes(group) ? now.filter((key) => key !== group) : [...now, group]));
  return { folded, toggle };
};

export { useFoldedGroups };
