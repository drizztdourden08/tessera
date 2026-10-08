/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { useSpanFits } from '../behavior/useSpanFits';
import type { GridCellProps } from '../Grid.type';

const GridCell = (props: GridCellProps) => {
  const { span = 1, className = '', children, ...rest } = props;
  const cellRef = useRef<HTMLDivElement>(null);
  const twoFit = useSpanFits(cellRef, span === 2);
  const shown = span === 2 && !twoFit ? 1 : span;
  return (
    <div ref={cellRef} className={`grid__cell${className ? ` ${className}` : ''}`} data-span={shown} {...rest}>
      {children}
    </div>
  );
};

export { GridCell };
