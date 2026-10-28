/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { sizeVariable } from '../virtual/size-variable';
import { useMillerColumns } from './behavior/useMillerColumns';
import { MillerColumnView } from './sub-components/MillerColumnView';
import { WIDTH_PROPERTY } from './MillerColumns.constants';
import type { CSSProperties } from 'react';
import type { MillerColumnsProps } from './MillerColumns.type';
import './MillerColumns.css';

const MillerColumns = <T,>(props: MillerColumnsProps<T>) => {
  const { getKey, getChildren, getLabel, renderItem, label, selection, rowSize, onOpen, columnWidth = 'size-224', className } = props;
  const model = useMillerColumns(props);
  const classes = ['miller-columns', className].filter(Boolean).join(' ');
  return (
    <Box
      ref={model.rootRef}
      role="group"
      aria-label={label}
      className={classes}
      style={{ [WIDTH_PROPERTY]: sizeVariable(columnWidth) } as CSSProperties}
      onKeyDown={model.onKeyDown}
    >
      {model.columns.map((column) => (
        <MillerColumnView
          key={column.index}
          column={column}
          label={label}
          selected={selection.selected}
          getKey={getKey}
          getChildren={getChildren}
          getLabel={getLabel}
          renderItem={renderItem}
          rowSize={rowSize}
          onChange={model.changeAt}
          onOpen={onOpen}
          attach={model.attach}
        />
      ))}
    </Box>
  );
};

export { MillerColumns };
