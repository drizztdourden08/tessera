/* @layer renderer-components @kind component */
import { Span } from '../../../primitives/text-elements';
import { WindowHeader } from '../../WindowHeader';
import { WindowContentHeader } from './WindowContentHeader';
import type { WindowTopProps } from './WindowTop.type';
import '../../../theme/visually-hidden.css';

const WindowTop = (props: WindowTopProps) => {
  const { title, titleId, onClose, back, header, subtitle, extra, bare, named } = props;
  if (header) return <WindowContentHeader header={header} back={back} title={title} titleId={titleId} onClose={onClose} />;
  if (bare) return named ? null : <Span id={titleId} className="visually-hidden">{title}</Span>;
  return (
    <WindowHeader
      title={title}
      titleId={titleId}
      subtitle={subtitle}
      extra={extra}
      back={back}
      onClose={onClose}
      className="screen-window__header"
    />
  );
};

export { WindowTop };
