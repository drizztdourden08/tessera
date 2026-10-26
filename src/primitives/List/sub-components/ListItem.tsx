/* @layer renderer-components @kind component */
import { Box } from '../../Box';
import type { ListItemProps } from '../List.type';

const ListItem = (props: ListItemProps) => {
  const { bare = false, className, children, ...rest } = props;
  const classes = ['list-item', bare && 'list-item--bare', className].filter(Boolean).join(' ');
  return <Box as="li" className={classes} {...rest}>{children}</Box>;
};

export { ListItem };
