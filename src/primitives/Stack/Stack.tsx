/* @layer renderer-components @kind component */
import { Flex } from '../Flex';
import type { StackProps } from './Stack.type';

const Stack = (props: StackProps) => {
  const { gap = 'md', ...rest } = props;
  return <Flex direction="column" gap={gap} {...rest} />;
};

export { Stack };
