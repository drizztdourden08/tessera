/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { Icon } from '../../../primitives/Icon';
import type { ListDetailLayoutBackProps } from './ListDetailLayoutBack.type';

const ListDetailLayoutBack = (props: ListDetailLayoutBackProps) => (
  <Box className="list-detail-layout__back">
    <Button variant="ghost" size="sm" icon={<Icon name="chevron-left" />} onClick={props.onBack}>{props.label}</Button>
  </Box>
);

export { ListDetailLayoutBack };
