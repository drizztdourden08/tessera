/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { TagCategoryColor } from '../../primitives/Tag';
import type { CardEdge, CardTone, CardVariant } from '../../primitives/Card';
import type { RecordHeaderDensity } from '../RecordHeader';

type RecordCardDensity = RecordHeaderDensity | 'compact';

interface RecordCardProps {
  title: ReactNode;
  icon?: ReactNode;
  code?: ReactNode;
  content?: ReactNode;
  end?: ReactNode;
  menu?: ReactNode;
  children?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  density?: RecordCardDensity;
  chevronOnIcon?: boolean;
  menuOnHover?: boolean;
  className?: string;
  name?: string;
  edge?: CardEdge;
  edgeTone?: CardTone;
  variant?: CardVariant;
  fill?: boolean;
  tint?: TagCategoryColor;
  'aria-label'?: string;
}

interface RecordCardChevronInput {
  expandable: boolean;
  expanded: boolean;
  bodyId: string;
  name: string | undefined;
  named: { expand: (name: string) => string; collapse: (name: string) => string };
  onToggle: () => void;
}

export type { RecordCardChevronInput, RecordCardDensity, RecordCardProps };
