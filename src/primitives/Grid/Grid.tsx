/* @layer renderer-components @kind component */
import './Grid.css';
import { templateFor } from './behavior/template-for';
import { GridCell } from './sub-components/GridCell';
import type { GridProps } from './Grid.type';

const GridBase = (props: GridProps) => {
  const { columns, minColWidth, gap, dense, className = '', style, children, ...rest } = props;
  const templateStyle = templateFor(columns, minColWidth);
  return (
    <div
      className={`grid${className ? ` ${className}` : ''}`}
      data-gap={gap}
      data-dense={dense === true || undefined}
      data-columns={columns}
      data-min-col={minColWidth}
      style={templateStyle ? { ...templateStyle, ...style } : style}
      {...rest}
    >
      {children}
    </div>
  );
};

const Grid = Object.assign(GridBase, { Cell: GridCell });

export { Grid };
