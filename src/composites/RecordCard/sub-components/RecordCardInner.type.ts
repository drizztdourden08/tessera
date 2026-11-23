/* @layer renderer-components @kind types */
import type { RecordHeaderChevron } from '../../RecordHeader';
import type { RecordCardDensity, RecordCardProps } from '../RecordCard.type';

type RecordCardInnerProps = Pick<RecordCardProps, 'title' | 'icon' | 'code' | 'content' | 'end' | 'menu' | 'chevronOnIcon' | 'children'> & {
  density: RecordCardDensity;
  expanded: boolean;
  bodyId: string;
  chevron: RecordHeaderChevron | undefined;
};

export type { RecordCardInnerProps };
