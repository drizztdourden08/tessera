/* @layer renderer-components @kind component */
import { Box } from '../Box';
import { Flex } from '../Flex';
import type { ButtonRowProps } from './ButtonRow.type';
import './ButtonRow.css';

const ButtonRow = (props: ButtonRowProps) => {
  const { align = 'end', gap = 'sm', variant = 'plain', lead, className, children } = props;
  const classes = ['button-row', `button-row--${variant}`, className].filter(Boolean).join(' ');
  return (
    <Flex justify={align} gap={gap} align="center" wrap className={classes}>
      {lead != null && <Box className="button-row__lead">{lead}</Box>}
      {children}
    </Flex>
  );
};

export { ButtonRow };
