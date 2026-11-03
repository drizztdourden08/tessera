/* @layer renderer-components @kind types */
import type { DragEvent, HTMLAttributes, ReactNode, RefObject } from 'react';
import type { DataAttributes } from '../../primitives/dom/data-attributes.type';
import type { IconName } from '../../primitives/Icon';
import type { MenuGroup, MenuNode } from '../DropdownMenu';

type BreadcrumbSibling = MenuNode & { group?: string };

type SegmentDropProps = HTMLAttributes<HTMLElement> & DataAttributes;

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
  dropTarget?: (index: number, id: string) => SegmentDropProps;
  validate?: (path: string) => string | null;
  path?: string;
  onPathSubmit?: (path: string) => void;
  trailing?: ReactNode;
  trailingLabel?: string;
  label?: string;
  className?: string;
}

interface SegmentDrop {
  overId: string | null;
  bind: (id: string, index: number) => SegmentDropProps;
}

interface SegmentDropRules {
  onDropOn: BreadcrumbsProps['onDropOn'];
  canDrop: BreadcrumbsProps['canDrop'];
  dropTarget: BreadcrumbsProps['dropTarget'];
}

interface SpringOpen {
  openId: string | null;
  hold: (id: string) => void;
  release: () => void;
  close: () => void;
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
  index: number;
  current: boolean;
  first: boolean;
  drop: SegmentDrop;
  spring: SpringOpen;
  onNavigate: (id: string) => void;
}

type BreadcrumbSegmentButtonProps = Omit<BreadcrumbItemProps, 'first' | 'spring'>;

type SiblingMenu =
  | { menu: readonly BreadcrumbSibling[]; asMenu: true }
  | { menu: readonly BreadcrumbSibling[] | undefined; asMenu: false };

interface BreadcrumbSiblingsProps {
  label: string;
  siblings: readonly BreadcrumbSibling[];
  named: boolean;
}

interface BreadcrumbSpringMenuProps {
  anchorRef: RefObject<HTMLElement | null>;
  label: string;
  siblings: readonly BreadcrumbSibling[];
  onClose: () => void;
}

interface BreadcrumbOverflowProps {
  hidden: readonly BreadcrumbSegment[];
  onNavigate: (id: string) => void;
}

interface BreadcrumbEditProps {
  initial: string;
  onSubmit: (path: string) => void;
  onCancel: () => void;
  validate?: (path: string) => string | null;
}

export type {
  BreadcrumbEditProps, BreadcrumbItemProps, BreadcrumbOverflowProps, BreadcrumbSegment, BreadcrumbSegmentButtonProps, BreadcrumbSibling, BreadcrumbSiblingsProps, BreadcrumbSpringMenuProps, BreadcrumbsProps, FoldedSegments, OverSetter,
  SegmentDrop, SegmentDropProps, SegmentDropRules, SiblingGroup, SiblingMenu, SpringOpen,
};
