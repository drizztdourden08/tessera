/* @layer renderer-design-system @kind types */
import type * as ColorPickerEntry from '../composites/ColorPicker';
import type * as ColorPickerPopoverEntry from '../composites/ColorPickerPopover';
import type * as PackageRoot from '../index';
import type { AppTreePaths } from './app-tree.type';
import type { TesseraApps } from './tessera-apps.type';
import type { DECISION_TREE } from './tree.constants';
import type { PathsOf } from './tree.type';

type PublicValues = typeof PackageRoot & typeof ColorPickerEntry & typeof ColorPickerPopoverEntry;

type TesseraName = {
  [Name in Extract<keyof PublicValues, string>]: Name extends Uppercase<Name> ? never : Name extends Capitalize<Name> ? Name : never;
}[Extract<keyof PublicValues, string>];

type RegisteredApp = TesseraApps[keyof TesseraApps];

type AppPartName<App> = App extends { readonly parts: infer Parts extends string } ? Parts : never;

type AppPath<App> = App extends { readonly tree: infer Tree } ? AppTreePaths<Tree> : never;

type WithApp<Own, App> = Own | App;

type ComponentName = WithApp<TesseraName, AppPartName<RegisteredApp>>;

type TreePath = WithApp<PathsOf<typeof DECISION_TREE>, AppPath<RegisteredApp>>;

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
