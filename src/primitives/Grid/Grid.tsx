/* @layer renderer-components @kind component */
import './Grid.css';
import type { CSSProperties } from 'react';
import type { GridProps } from './Grid.type';

const templateFor = (columns: number | undefined, minColWidth: number | undefined): CSSProperties | undefined => {
  if (minColWidth) return { gridTemplateColumns: `repeat(auto-fill, minmax(${minColWidth}px, 1fr))` };
  if (columns) return { gridTemplateColumns: `repeat(${columns}, 1fr)` };
  return undefined;
};

const Grid = (props: GridProps) => {
  const { columns, minColWidth, gap, className = '', style, children, ...rest } = props;
  const templateStyle = templateFor(columns, minColWidth);
  return (
    <div
      className={`grid${className ? ` ${className}` : ''}`}
      data-gap={gap}
      style={templateStyle ? { ...templateStyle, ...style } : style}
      {...rest}
    >
      {children}
    </div>
  );
};

export { Grid };
