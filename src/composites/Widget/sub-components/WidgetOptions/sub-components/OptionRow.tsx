/* @layer renderer-components @kind component */
import { Box } from '../../../../../primitives/Box';
import { Small, Span } from '../../../../../primitives/text-elements';
import type { OptionRowProps } from '../WidgetOptions.type';

const OptionRow = (props: OptionRowProps) => {
  const { label, hint, children } = props;
  return (
    <Box className="widget-option-row">
      <Box className="widget-option-row__text">
        <Span tone="dim" className="widget-option-row__label">{label}</Span>
        {hint && <Small tone="muted" className="widget-option-row__hint">{hint}</Small>}
      </Box>
      <Box className="widget-option-row__control">{children}</Box>
    </Box>
  );
};

export { OptionRow };
