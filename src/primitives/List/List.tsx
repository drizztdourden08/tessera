/* @layer renderer-components @kind component */
import { Box } from '../Box';
import type { ListProps } from './List.type';
import './List.css';

const List = (props: ListProps) => {
  const { ordered = false, start, className, children, ...rest } = props;
  const classes = ['list', `list--${ordered ? 'numbers' : 'bullets'}`, className].filter(Boolean).join(' ');
  const first = ordered && start !== undefined ? { start } : {};
  return (
    <Box as={ordered ? 'ol' : 'ul'} className={classes} {...first} {...rest}>
      {children}
    </Box>
  );
};

export { List };
