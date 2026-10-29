/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { Span } from '../../../primitives/text-elements';
import { VirtualList } from '../../VirtualList';
import { COLUMN_ATTRIBUTE } from '../MillerColumns.constants';
import type { MillerColumnViewProps } from './MillerColumnView.type';

const MillerColumnView = <T,>(props: MillerColumnViewProps<T>) => {
  const { column, label, selected, getKey, getChildren, getLabel, renderItem, rowSize, onChange, onOpen, attach } = props;
  const select = { selected, onChange: (next: ReadonlySet<string>) => onChange(column.index, next) };
  return (
    <Box className="miller-columns__column" {...{ [COLUMN_ATTRIBUTE]: column.index }}>
      <VirtualList
        ref={attach(column.index)}
        className="miller-columns__list"
        items={column.items}
        getKey={getKey}
        getLabel={getLabel}
        label={`${label} ${column.index + 1}`}
        rowSize={rowSize}
        selection={select}
        renderItem={(item) => {
          const key = getKey(item);
          const branch = getChildren(item) !== undefined;
          return (
            <Box
              className="miller-columns__cell"
              data-open={key === column.openKey && !selected.has(key) ? true : undefined}
              onDoubleClick={branch ? undefined : () => onOpen?.(item)}
            >
              <Span className="miller-columns__text">{renderItem(item)}</Span>
              {branch && <Icon name="chevron-right" className="miller-columns__chevron" aria-hidden />}
            </Box>
          );
        }}
      />
    </Box>
  );
};

export { MillerColumnView };
