/* @layer renderer-components @kind component */
import { columnCell } from './column-cell';
import { columnId } from './column-id';
import { Span } from '../text-elements';
import { HighlightedText } from './HighlightedText';
import type { ListboxCellsProps } from './listbox-view.type';

const ListboxCells = <T,>(props: ListboxCellsProps<T>) => {
  const { columns, context, highlight } = props;
  return (
    <>
      {columns.map((column, index) => {
        const cell = columnCell(column, context);
        const marked = highlight && typeof cell.content === 'string' && context.query !== '';
        return (
          <Span key={columnId(column, index)} className="listbox-cell" data-align={column.align} tone={cell.tone}>
            {marked ? <HighlightedText text={cell.text} query={context.query} /> : cell.content}
          </Span>
        );
      })}
    </>
  );
};

export { ListboxCells };
