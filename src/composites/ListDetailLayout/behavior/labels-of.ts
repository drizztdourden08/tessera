/* @layer renderer-components @kind logic */
import type { ListDetailLayoutProps } from '../ListDetailLayout.type';
import type { LayoutLabels } from './labels.type';

const labelsOf = (props: ListDetailLayoutProps, defaults: LayoutLabels): LayoutLabels => ({
  list: props.listLabel ?? defaults.list,
  detail: props.detailLabel ?? defaults.detail,
  back: props.backLabel ?? defaults.back,
});

export { labelsOf };
