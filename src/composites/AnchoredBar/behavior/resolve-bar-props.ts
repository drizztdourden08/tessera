/* @layer renderer-components @kind logic */
import type { AnchoredBarProps } from '../AnchoredBar.type';
import type { ResolvedBarProps } from './resolve-bar-props.type';

const resolveBarProps = ({
  inline = false, placement = 'bottom-center', margin = 'md', gap = 'sm', dock = 'none', follow = true, role = 'dialog', error = false, ...rest
}: AnchoredBarProps): ResolvedBarProps => ({ ...rest, inline, placement, margin, gap, dock, follow, role, error });

export { resolveBarProps };
