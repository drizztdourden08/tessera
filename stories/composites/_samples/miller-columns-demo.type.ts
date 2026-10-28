/* @layer stories @kind types */
import type { TreeEntry } from './tree-entries';

type MillerColumnsArgs = {
  shared: boolean;
};

interface MillerColumnsDemoProps {
  shared?: boolean;
  start?: readonly TreeEntry[];
}

export type { MillerColumnsArgs, MillerColumnsDemoProps };
