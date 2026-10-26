/* @layer renderer-components @kind logic */
import { ghostRowSample } from './ghost-row-sample';
import { NO_ACTIONS } from './group-action-items.constants';
import type { ActionItem } from '../../ActionBar';
import type { GroupNode } from './flatten-rows.type';
import type { RowFeatureProps } from './row-features.type';

const groupActionItems = <T>(node: GroupNode<T>, groupActions: RowFeatureProps<T>['groupActions']): readonly ActionItem[] => {
  if (!groupActions) return NO_ACTIONS;
  const rows = ghostRowSample({ nodes: node.children, isExpanded: () => true, limit: Number.POSITIVE_INFINITY });
  return groupActions(node.key, rows);
};

export { groupActionItems };
