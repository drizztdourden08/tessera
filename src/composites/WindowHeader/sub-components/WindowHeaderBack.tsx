/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { WindowHeaderBackProps } from '../WindowHeader.type';

const WindowHeaderBack = (props: WindowHeaderBackProps) => {
  const { back } = props;
  const { navigation } = useTesseraStrings();
  return (
    <IconButton variant="ghost" size="md" label={back.label === undefined ? navigation.back : navigation.backTo(back.label)} className="window-header__back" onClick={back.onSelect}>
      <Icon name="arrow-left" size={18} />
    </IconButton>
  );
};

export { WindowHeaderBack };
