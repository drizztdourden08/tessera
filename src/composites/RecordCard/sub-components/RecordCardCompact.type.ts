/* @layer renderer-components @kind types */
import type { RecordCardProps } from '../RecordCard.type';

type RecordCardCompactProps = Pick<RecordCardProps, 'title' | 'icon' | 'code' | 'content' | 'end' | 'menu' | 'chevronOnIcon' | 'menuOnHover'>;

export type { RecordCardCompactProps };
