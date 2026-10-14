/* @layer renderer-components @kind types */
import type { IconName } from '../../../primitives/Icon/Icon.type';
import type { GutterPane } from './ListDetailLayoutGutter.type';

interface ListDetailLayoutFoldProps {
  pane: GutterPane;
  icon: IconName;
}

export type { ListDetailLayoutFoldProps };
