/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Span } from '../../../primitives/text-elements';
import type { ControllerRowsProps } from '../ControllerLayout.type';

const ControllerRows = (props: ControllerRowsProps) => {
  const { rows, label } = props;
  if (rows.length === 0) return null;

  return (
    <Box as="ul" className="controller-layout__rows" aria-label={label}>
      {rows.map((row) => (
        <Box as="li" key={row.id} className="controller-layout__row" data-active={row.active ? '' : undefined}>
          {row.glyph !== undefined && row.glyph !== null && <Box as="span" className="controller-layout__row-glyph" aria-hidden="true">{row.glyph}</Box>}
          <Span className="controller-layout__row-label">{row.label}</Span>
          {row.amount !== undefined && <Span className="controller-layout__row-amount">{`${row.amount}%`}</Span>}
        </Box>
      ))}
    </Box>
  );
};

export { ControllerRows };
