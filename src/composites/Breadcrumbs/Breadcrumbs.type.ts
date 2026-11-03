/* @layer renderer-components @kind types */
import type { DragEvent, ReactNode } from 'react';
import type { IconName } from '../../primitives/Icon';
import type { MenuNode } from '../DropdownMenu';

interface BreadcrumbSegment {
  id: string;
  label: string;
  icon?: IconName;
  siblings?: readonly MenuNode[];
  opensMenu?: boolean;
}

interface BreadcrumbsProps {
  segments: readonly BreadcrumbSegment[];
  onNavigate: (id: string) => void;
  maxVisible?: number;
  onDropOn?: (id: string, event: DragEvent<HTMLElement>) => void;
  canDrop?: (id: string, event: DragEvent<HTMLElement>) => boolean;
  path?: string;
  onPathSubmit?: (path: string) => void;
  trailing?: ReactNode;
  trailingLabel?: string;
  label?: string;
  className?: string;
}

interface SegmentDrop {
  overId: string | null;
  bind: (id: string) => SegmentDropHandlers;
}

interface SegmentDropHandlers {
  onDragOver: (event: DragEvent<HTMLElement>) => void;
  onDragLeave: () => void;
  onDrop: (event: DragEvent<HTMLElement>) => void;
}

type OverSetter = (update: (was: string | null) => string | null) => void;

interface FoldedSegments {
  head: readonly BreadcrumbSegment[];
  hidden: readonly BreadcrumbSegment[];
  tail: readonly BreadcrumbSegment[];
}

interface BreadcrumbItemProps {
  segment: BreadcrumbSegment;
  current: boolean;
  first: boolean;
  drop: SegmentDrop;
  onNavigate: (id: string) => void;
}

type BreadcrumbSegmentButtonProps = Omit<BreadcrumbItemProps, 'first'>;

type SiblingMenu =
  | { menu: readonly MenuNode[]; asMenu: true }
  | { menu: readonly MenuNode[] | undefined; asMenu: false };

interface BreadcrumbSiblingsProps {
  label: string;
  siblings: readonly MenuNode[];
  named: boolean;
}

interface BreadcrumbOverflowProps {
  hidden: readonly BreadcrumbSegment[];
  onNavigate: (id: string) => void;
}

interface BreadcrumbEditProps {
  initial: string;
  onSubmit: (path: string) => void;
  onCancel: () => void;
}

export type {
  BreadcrumbEditProps, BreadcrumbItemProps, BreadcrumbOverflowProps, BreadcrumbSegment, BreadcrumbSegmentButtonProps, BreadcrumbSiblingsProps, BreadcrumbsProps, FoldedSegments, OverSetter, SegmentDrop,
  SegmentDropHandlers, SiblingMenu,
};
