/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { Icon } from '../../../primitives/Icon';
import type { MasterDetailBackProps } from './MasterDetailBack.type';

const MasterDetailBack = (props: MasterDetailBackProps) => (
  <Box className="master-detail__back">
    <Button variant="ghost" size="sm" icon={<Icon name="chevron-left" />} onClick={props.onBack}>{props.label}</Button>
  </Box>
);

export { MasterDetailBack };
