/* @layer renderer-components @kind logic */
import { Children, isValidElement } from 'react';
import type { ReactNode } from 'react';
import type { ListItemRowProps, ListItemShape } from '../ListItemRow.type';

const shapeOfRows = (children: ReactNode): ListItemShape => {
  const shape: ListItemShape = { icon: false, columns: 0, action: false };
  Children.forEach(children, (child) => {
    if (!isValidElement<Partial<ListItemRowProps>>(child)) return;
    const { icon, columns, action } = child.props;
    shape.icon ||= icon != null;
    shape.action ||= action != null;
    shape.columns = Math.max(shape.columns, columns?.length ?? 0);
  });
  return shape;
};

export { shapeOfRows };
