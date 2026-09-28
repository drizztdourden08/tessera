/* @layer renderer-components @kind component */
import { Flex } from '../Flex';
import type { CenterProps } from './Center.type';

const Center = (props: CenterProps) => {
  return <Flex align="center" justify="center" {...props} />;
};

export { Center };
