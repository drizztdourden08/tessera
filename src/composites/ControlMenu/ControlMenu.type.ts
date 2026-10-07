/* @layer renderer-components @kind types */
import type { CSSProperties, ReactNode, RefObject } from 'react';
import type { Hint } from '../../primitives/hint/hint.type';
import type { IconName } from '../../primitives/Icon';
import type { DropAlign } from '../../primitives/listbox/drop-placement.type';
import type { DataAttributes } from '../../primitives/dom/data-attributes.type';
import type { MenuIntensity, MenuSize, MenuTrigger, MenuVariant } from '../DropdownMenu';

interface ControlMenuProps {
  trigger: MenuTrigger;
  children: ReactNode;
  label?: string;
  header?: ReactNode;
  filter?: boolean;
  filterPlaceholder?: string;
  hints?: boolean;
  align?: DropAlign;
  variant?: MenuVariant;
  intensity?: MenuIntensity;
  size?: MenuSize;
  disabled?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  triggerClassName?: string;
  panelData?: DataAttributes;
}

interface ControlMenuRowProps {
  label: string;
  hint?: Hint;
  about?: string;
  children: ReactNode;
}

interface ControlMenuSubProps {
  label: string;
  icon?: IconName;
  description?: string;
  hint?: Hint;
  children: ReactNode;
}

interface ControlMenuGroupProps {
  label?: string;
  shown?: boolean;
  children: ReactNode;
}

interface ControlMenuContextValue {
  query: string;
  look: string;
  data?: DataAttributes;
}

interface ControlMenuPanelProps {
  id: string;
  label: string;
  header?: ReactNode;
  filter: boolean;
  filterPlaceholder?: string;
  hints: boolean;
  query: string;
  look: string;
  data?: DataAttributes;
  onQueryChange: (query: string) => void;
  children: ReactNode;
}

interface ControlMenuFilterProps {
  inputRef: RefObject<HTMLInputElement | null>;
  bodyRef: RefObject<HTMLElement | null>;
  panelId: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

interface ControlSubPanelProps {
  id: string;
  anchorRef: RefObject<HTMLElement | null>;
  label: string;
  focus: boolean;
  onBack: () => void;
  children: ReactNode;
}

interface ControlSubRowProps {
  label: string;
  icon?: IconName;
  description?: string;
  open: boolean;
  panelId: string;
  onOpen: () => void;
}

type SubOpenState = 'hover' | 'focus' | null;

interface SubOpen {
  open: SubOpenState;
  hover: () => void;
  focus: () => void;
  leave: () => void;
  back: () => void;
}

type SubWidthStyle = CSSProperties & Record<'--control-sub-width', string>;

export type {
  ControlMenuContextValue, ControlMenuFilterProps, ControlMenuGroupProps, ControlMenuPanelProps, ControlMenuProps, ControlMenuRowProps,
  ControlMenuSubProps, ControlSubPanelProps, ControlSubRowProps, SubOpen, SubOpenState, SubWidthStyle,
};
