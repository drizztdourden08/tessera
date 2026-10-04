/* @layer stories @kind component */
import { DropdownMenu } from '../../../src/composites';
import { Button, Flex, Icon } from '../../../src/primitives';
import type { IconName } from '../../../src/primitives';

type BarAction = {
  id: string;
  label: string;
  icon?: IconName;
  onSelect: () => void;
  kind?: 'primary' | 'default' | 'danger';
  disabled?: boolean;
  confirm?: { title: string; confirmLabel: string };
};
type ActionBarProps = { actions: readonly BarAction[]; size?: 'sm' | 'md'; keep?: number; overflowLabel?: string };

const variantOf = (kind: BarAction['kind']) => {
  if (kind === 'primary') return 'primary';
  if (kind === 'danger') return 'danger';
  return 'secondary';
};

const ActionBar = ({ actions, size = 'md', keep = 2, overflowLabel = 'More' }: ActionBarProps) => {
  const primary = actions.filter((a) => a.kind === 'primary');
  const rest = actions.filter((a) => a.kind !== 'primary');
  const shown = rest.slice(0, keep);
  const hidden = rest.slice(keep);
  return (
    <Flex gap="xs" align="center" className="spike-action-bar">
      {shown.map((a) => (
        <Button key={a.id} size={size} variant={variantOf(a.kind)} disabled={a.disabled} onClick={a.onSelect} icon={a.icon ? <Icon name={a.icon} /> : undefined}>{a.label}</Button>
      ))}
      {hidden.length > 0 && (
        <DropdownMenu size={size} variant="secondary" trigger={{ label: overflowLabel, icon: 'ellipsis', iconOnly: true }}
          groups={[
            { id: 'more', items: hidden.filter((a) => a.kind !== 'danger').map((a) => ({ id: a.id, label: a.label, icon: a.icon, disabled: a.disabled, onSelect: a.onSelect })) },
            { id: 'danger', items: hidden.filter((a) => a.kind === 'danger').map((a) => ({ id: a.id, label: `${a.label}…`, icon: a.icon, disabled: a.disabled, onSelect: a.onSelect })) },
          ].filter((g) => g.items.length > 0)} />
      )}
      {primary.map((a) => (
        <Button key={a.id} size={size} variant="primary" disabled={a.disabled} onClick={a.onSelect} icon={a.icon ? <Icon name={a.icon} /> : undefined}>{a.label}</Button>
      ))}
    </Flex>
  );
};

export { ActionBar };
export type { ActionBarProps, BarAction };
