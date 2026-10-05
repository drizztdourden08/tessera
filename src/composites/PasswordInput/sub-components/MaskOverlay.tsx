/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { maskCount } from '../behavior/mask-count';
import type { MaskOverlayProps } from '../behavior/mask.type';
import { useNativeMaskUnit } from '../behavior/useNativeMaskUnit';
import { useScrollSync } from '../behavior/useScrollSync';

const MaskOverlay = (props: MaskOverlayProps) => {
  const { inputRef, maskChar, value } = props;
  const stripRef = useRef<HTMLSpanElement>(null);
  const count = maskCount(value, useNativeMaskUnit(inputRef));
  useScrollSync(inputRef, stripRef, count);
  return (
    <Box as="span" className="password-input__mask" aria-hidden="true">
      <Box as="span" ref={stripRef} className="password-input__strip">
        {Array.from({ length: count }, (_, index) => <Box as="span" key={index} className="password-input__cell">{maskChar}</Box>)}
      </Box>
    </Box>
  );
};

export { MaskOverlay };
