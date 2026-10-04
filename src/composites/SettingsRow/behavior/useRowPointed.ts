/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { RowPointed } from './row-pointed.type';

const useRowPointed = (): RowPointed => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };
  return { pointed: hovered || focused, handlers };
};

export { useRowPointed };
