/* @layer stories @kind component */
import { Icon } from '../../../src/primitives/Icon';
import { IconButton } from '../../../src/primitives/IconButton';

const RecordCardMenu = () => (
  <IconButton variant="ghost" size="sm" label="Actions">
    <Icon name="ellipsis" aria-hidden />
  </IconButton>
);

export { RecordCardMenu };
