/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { Text } from '../../primitives/Text';
import type { OptionGroupProps } from './OptionGroup.type';
import './OptionGroup.css';

const OptionGroup = (props: OptionGroupProps) => {
  const { title, tone = 'default', className, children } = props;
  const titleId = useId();
  return (
    <Box role="group" aria-labelledby={titleId} className={['option-group', className].filter(Boolean).join(' ')} data-tone={tone}>
      <Text id={titleId} className="option-group__title">{title}</Text>
      {children}
    </Box>
  );
};

export { OptionGroup };
