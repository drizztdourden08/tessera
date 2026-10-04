/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { IconName } from '../../primitives/Icon';

interface FileEntry {
  path: string;
  name?: string;
  size?: number;
  modified?: number;
  icon?: IconName;
}

interface FileListProps {
  files: readonly FileEntry[];
  onOpen?: (path: string) => void;
  onReveal?: (path: string) => void;
  empty?: ReactNode;
  dense?: boolean;
  label?: string;
  className?: string;
}

interface FileRowProps {
  file: FileEntry;
  onOpen?: (path: string) => void;
  onReveal?: (path: string) => void;
}

interface FileButtonProps {
  label: string;
  icon: IconName;
  onPress: () => void;
}

export type { FileButtonProps, FileEntry, FileListProps, FileRowProps };
