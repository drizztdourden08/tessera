/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ContentHeader } from '../../ContentHeader';
import type { WindowContentHeaderProps } from './WindowContentHeader.type';

const WindowContentHeader = (props: WindowContentHeaderProps) => {
  const { header, back, title, titleId, onClose } = props;
  const { common } = useTesseraStrings();
  const close = (
    <IconButton variant="ghost" size="md" label={common.close} className="screen-window__close" onClick={onClose}>
      <Icon name="x" size={20} />
    </IconButton>
  );

  return <ContentHeader {...header} back={back} title={title} titleId={titleId} actions={<>{header.actions}{close}</>} className="screen-window__header" />;
};

export { WindowContentHeader };
