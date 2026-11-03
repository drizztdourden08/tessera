/* @layer renderer-components @kind types */
import type { DragEvent, ReactNode } from 'react';
import type { IconName } from '../../primitives/Icon';
import type { MenuGroup, MenuNode } from '../DropdownMenu';

type BreadcrumbSibling = MenuNode & { group?: string };

interface BreadcrumbSegment {
  id: string;
  label: string;
  title?: string;
  icon?: IconName;
  siblings?: readonly BreadcrumbSibling[];
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

interface SiblingGroup extends MenuGroup {
  items: MenuNode[];
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
  | { menu: readonly BreadcrumbSibling[]; asMenu: true }
  | { menu: readonly BreadcrumbSibling[] | undefined; asMenu: false };

interface BreadcrumbSiblingsProps {
  label: string;
  siblings: readonly BreadcrumbSibling[];
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
  BreadcrumbEditProps, BreadcrumbItemProps, BreadcrumbOverflowProps, BreadcrumbSegment, BreadcrumbSegmentButtonProps, BreadcrumbSibling, BreadcrumbSiblingsProps, BreadcrumbsProps, FoldedSegments, OverSetter,
  SegmentDrop, SegmentDropHandlers, SiblingGroup, SiblingMenu,
};
