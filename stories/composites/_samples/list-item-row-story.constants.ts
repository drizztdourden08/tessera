/* @layer stories @kind data */
const LIST_ITEM_ROW_CODE = `import { ListItemList, ListItemRow } from '@drizztdourden08/tessera';

<ListItemList label="Sessions">
  {sessions.map((session) => (
    <ListItemRow
      key={session.id}
      icon={<Icon name="layers" />}
      name={session.name}
      meta={session.status}
      columns={[
        { primary: \`\${session.players} players\`, secondary: session.preset, align: 'end' },
        { primary: session.server, secondary: \`host \${session.host}\` },
      ]}
      selected={session.id === selectedId}
      onClick={() => setSelectedId(session.id)}
    />
  ))}
</ListItemList>

<ListItemRow
  media={<Image src={save.screenshot} alt="" fit="cover" />}
  mediaAspect={16 / 9}
  name={save.name}
  meta={<DateText value={save.timestamp} format="relative" />}
  nameAction={<IconButton size="sm" variant="ghost" label={\`Rename \${save.name}\`}><Icon name="pencil" /></IconButton>}
  onClick={() => setSelectedId(save.id)}
/>`;

export { LIST_ITEM_ROW_CODE };
