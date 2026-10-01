/* @layer renderer-components @kind component */
import { Box } from '../../../../../primitives/Box';
import { useHintTarget } from '../../../../../primitives/hint/useHintTarget';
import { Span } from '../../../../../primitives/text-elements';
import type { OptionRowProps } from '../WidgetOptions.type';

const OptionRow = (props: OptionRowProps) => {
  const { label, hint, children } = props;
  const hintHandlers = useHintTarget<HTMLElement>({ hint });
  return (
    <Box className="widget-option-row" {...hintHandlers}>
      <Span tone="dim" className="widget-option-row__label">{label}</Span>
      <Box className="widget-option-row__control">{children}</Box>
    </Box>
  );
};

export { OptionRow };
