/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Tooltip } from '../../../primitives/Tooltip';
import { BACK_CLASS } from '../ContentHeader.constants';
import type { ContentHeaderBackProps } from './ContentHeaderBack.type';

const ContentHeaderBack = (props: ContentHeaderBackProps) => {
  const { back, folded } = props;
  const { navigation } = useTesseraStrings();
  const text = navigation.backTo(back.label);
  const arrow = <Icon name="arrow-left" size={16} />;
  if (!folded) return <Button variant="ghost" size="sm" icon={arrow} className={BACK_CLASS} onClick={back.onSelect}>{text}</Button>;
  return (
    <Tooltip content={text} placement="bottom" className={`${BACK_CLASS} ${BACK_CLASS}--folded`}>
      <IconButton variant="ghost" size="sm" label={text} onClick={back.onSelect}>{arrow}</IconButton>
    </Tooltip>
  );
};

export { ContentHeaderBack };
