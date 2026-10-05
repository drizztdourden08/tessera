/* @layer renderer-components @kind component */
import { Text } from '../../../primitives/Text';
import { HeaderRename } from './HeaderRename';
import type { HeaderLabelProps } from './HeaderLabel.type';

const HeaderLabel = ({ label, renaming, ...rename }: HeaderLabelProps) => {
  if (!renaming) {
    return <Text variant="label" className="data-table__header-label" data-column-label="">{label}</Text>;
  }
  return <HeaderRename label={label} {...rename} />;
};

export { HeaderLabel };
