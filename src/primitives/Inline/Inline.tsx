/* @layer renderer-components @kind component */
import { Flex } from '../Flex';
import type { InlineProps } from './Inline.type';

const Inline = (props: InlineProps) => {
  const { gap = 'sm', align = 'center', ...rest } = props;
  return <Flex direction="row" gap={gap} align={align} {...rest} />;
};

export { Inline };
