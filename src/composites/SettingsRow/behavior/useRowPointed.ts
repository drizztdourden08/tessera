/* @layer renderer-components @kind hook */
import { useState } from 'react';

const useRowPointed = () => {
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
