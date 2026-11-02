/* @layer renderer-components @kind component */
import { Small, Span } from '../../text-elements';
import type { SegmentHeaderProps } from './SegmentHeader.type';

const SegmentHeader = (props: SegmentHeaderProps) => {
  const { label, description } = props;
  if (!label && !description) return null;
  return (
    <div className="segmented__header">
      {label && <Span className="segmented__label">{label}</Span>}
      {description && <Small tone="dim" className="segmented__description">{description}</Small>}
    </div>
  );
};

export { SegmentHeader };
