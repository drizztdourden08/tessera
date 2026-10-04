/* @layer renderer-components @kind component */
import { Box } from '../../Box';
import { Span } from '../../text-elements';
import type { StackedBarLegendProps } from './StackedBarLegend.type';

const StackedBarLegend = (props: StackedBarLegendProps) => {
  const { rows } = props;
  return (
    <Box as="ul" className="stacked-bar__legend">
      {rows.map((row) => (
        <Box as="li" key={row.id} className="stacked-bar__item">
          <Span className="stacked-bar__swatch" data-color={row.color} />
          <Span className="stacked-bar__name">{row.label}</Span>
          <Span className="stacked-bar__amount">{row.amount}</Span>
        </Box>
      ))}
    </Box>
  );
};

export { StackedBarLegend };
