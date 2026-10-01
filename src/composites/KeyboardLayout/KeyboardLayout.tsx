/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Box } from '../../primitives/Box';
import { cssVars } from './behavior/css-vars';
import { keyState } from './behavior/key-state';
import { keyboardGeometry } from './behavior/keyboard-geometry';
import { targetSet } from './behavior/target-set';
import { useKeyRects } from './behavior/useKeyRects';
import { KeyboardKey } from './sub-components/KeyboardKey';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { KeyboardLayoutProps } from './KeyboardLayout.type';
import './KeyboardLayout.css';

const KeyboardLayout = (props: KeyboardLayoutProps) => {
  const { highlight = [], pressed = [], size = 'full', onKeyRects, className, style, ...rest } = props;
  const geometry = useMemo(() => keyboardGeometry(size), [size]);
  const { panels } = useTesseraStrings();
  const lit = targetSet(highlight);
  const down = targetSet(pressed);
  const rootRef = useKeyRects(onKeyRects, size);
  const frame = cssVars({ '--keyboard-columns': geometry.columns, '--keyboard-rows': geometry.rows });

  return (
    <Box
      ref={rootRef}
      role="img"
      aria-label={panels.keyboard}
      className={className ? `keyboard-layout ${className}` : 'keyboard-layout'}
      style={{ ...style, ...frame }}
      {...rest}
    >
      {geometry.keys.map((key) => <KeyboardKey key={key.id} placed={key} state={keyState(key, lit, down)} />)}
    </Box>
  );
};

export { KeyboardLayout };
