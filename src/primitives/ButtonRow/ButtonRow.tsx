/* @layer renderer-components @kind component */
import { Flex } from '../Flex';
import type { ButtonRowProps } from './ButtonRow.type';

const ButtonRow = (props: ButtonRowProps) => {
  const { align = 'end', gap = 'sm', className, children } = props;
  return (
    <Flex justify={align} gap={gap} align="center" wrap className={className}>
      {children}
    </Flex>
  );
};

export { ButtonRow };
