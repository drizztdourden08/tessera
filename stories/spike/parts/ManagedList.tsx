/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { ConfirmIconButton, ListItemList, ListItemRow } from '../../../src/composites';
import { Box, Button, EmptyState, Flex, Icon, IconButton, SearchInput, Spinner, Stack, Text, TextInput } from '../../../src/primitives';

type ManagedItem = { id: string; name: string; meta: string; group?: string; trailing?: ReactNode };
type ManagedListProps = {
  title: string;
  items: readonly ManagedItem[];
  selectedId?: string | null;
  renamingId?: string | null;
  createLabel?: string;
  filter?: string;
  loading?: boolean;
  error?: ReactNode;
  empty?: ReactNode;
};

const rowAction = (item: ManagedItem, selected: boolean) => (
  <Flex gap="xs" align="center">
    {item.trailing}
    {selected && <IconButton size="sm" variant="ghost" label={`Rename ${item.name}`}><Icon name="pencil" /></IconButton>}
    {selected && <ConfirmIconButton icon={<Icon name="trash-2" />} label={`Delete ${item.name}`} confirmLabel="Delete" cancelLabel="Keep" onConfirm={() => {}} />}
  </Flex>
);

const renameRow = (item: ManagedItem) => (
  <Flex key={item.id} gap="xs" align="center" className="spike-rename">
    <TextInput defaultValue={item.name} aria-label="New name" />
    <IconButton size="sm" variant="primary" label="Keep the name"><Icon name="check" /></IconButton>
    <IconButton size="sm" variant="ghost" label="Cancel"><Icon name="x" /></IconButton>
  </Flex>
);

const body = (props: ManagedListProps) => {
  const { items, selectedId, renamingId, loading, error, empty } = props;
  if (loading) return <Flex gap="sm" align="center"><Spinner size="sm" /><Text variant="caption">{`Loading ${props.title.toLowerCase()}`}</Text></Flex>;
  if (error) return <Box role="alert" className="spike-summary"><Text variant="body">{error}</Text></Box>;
  if (!items.length) return <EmptyState size="sm" icon={<Icon name="sliders-horizontal" />} message={empty} />;
  const groups = [...new Set(items.map((i) => i.group ?? ''))];
  return groups.map((group) => (
    <Stack key={group} gap="xs">
      {group && <Text variant="label">{group}</Text>}
      <ListItemList>
        {items.filter((i) => (i.group ?? '') === group).map((item) => (item.id === renamingId ? renameRow(item) : (
          <ListItemRow key={item.id} actionVisibility="always" name={item.name} meta={item.meta} selected={item.id === selectedId} action={rowAction(item, item.id === selectedId)} />
        )))}
      </ListItemList>
    </Stack>
  ));
};

const ManagedList = (props: ManagedListProps) => {
  const { title, items, createLabel = 'New', filter } = props;
  return (
    <Stack gap="sm">
      <Flex justify="between" align="center">
        <Text variant="subtitle">{`${title} · ${items.length}`}</Text>
        <Button size="sm" variant="primary" icon={<Icon name="plus" />}>{createLabel}</Button>
      </Flex>
      {filter !== undefined && <SearchInput value={filter} onChange={() => {}} placeholder={`Filter ${title.toLowerCase()}`} />}
      {body(props)}
    </Stack>
  );
};

export { ManagedList };
export type { ManagedItem, ManagedListProps };
