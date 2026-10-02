/* @layer renderer-design-system @kind types */
import type * as ColorPickerEntry from '../composites/ColorPicker';
import type * as ColorPickerPopoverEntry from '../composites/ColorPickerPopover';
import type * as PackageRoot from '../index';
import type { DECISION_TREE } from './tree.constants';
import type { PathsOf } from './tree.type';

type PublicValues = typeof PackageRoot & typeof ColorPickerEntry & typeof ColorPickerPopoverEntry;

type ComponentName = {
  [Name in Extract<keyof PublicValues, string>]: Name extends Uppercase<Name> ? never : Name extends Capitalize<Name> ? Name : never;
}[Extract<keyof PublicValues, string>];

type TreePath = PathsOf<typeof DECISION_TREE>;

type Lines = readonly [string, ...string[]];

interface UsageAlternative {
  readonly case: string;
  readonly use: ComponentName;
}

interface UsageTree {
  readonly path: TreePath;
  readonly rule: string;
}

interface UsageFields {
  readonly job: string;
  readonly useWhen: Lines;
  readonly avoidWhen: readonly [UsageAlternative, ...UsageAlternative[]];
  readonly rules: Lines;
  readonly a11y: Lines;
  readonly example: string;
  readonly propsHash: string;
}

type ComponentUsage = UsageFields & (
  | { readonly tree: UsageTree; readonly buildingBlock?: never }
  | { readonly buildingBlock: true; readonly tree?: never }
);

export type { ComponentName, ComponentUsage, TreePath, UsageAlternative, UsageTree };
