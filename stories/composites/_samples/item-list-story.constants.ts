/* @layer stories @kind data */
const ITEM_LIST_CODE = `import { ItemList, toast } from '@drizztdourden08/tessera';

<ItemList
  title="Presets"
  items={presets}
  getId={(preset) => preset.id}
  getName={(preset) => preset.name}
  render={(preset) => ({ meta: \`\${preset.changes} changes\` })}
  groupBy={(preset) => preset.game}
  groups={games.map((game) => ({ name: game, action: { label: 'New preset', onSelect: () => createPreset(game) } }))}
  selectedId={selectedId}
  onSelect={setSelectedId}
  onCreate={createPreset}
  onRename={renamePreset}
  onDelete={deletePreset}
  loading={loading}
  error={error}
  onRetry={reload}
  empty="Install a game from Games, then make a preset for it."
/>

<ItemList
  title="Profiles"
  items={profiles}
  getId={(profile) => profile.id}
  getName={(profile) => profile.name}
  selectedId={selectedId}
  onSelect={setSelectedId}
  createLabel="New profile"
  createOpen={creating || profiles.length === 0}
  onCreateOpenChange={setCreating}
  create={(close) => (
    <InlineCreateForm
      placeholder="Profile name"
      canSubmit={game !== ''}
      onCreate={(name) => { setSelectedId(addProfile(name, game)); close(); }}
      onCancel={profiles.length ? close : undefined}
      extraFields={<Field label="Game"><Select value={game} onChange={setGame} options={GAMES} /></Field>}
    />
  )}
/>

<ItemList
  title="Profiles"
  items={profiles}
  getId={(profile) => profile.id}
  getName={(profile) => profile.name}
  selectedId={activeId}
  onActivate={switchProfile}
  onRename={renameProfile}
  onDelete={deleteProfile}
  actionVisibility="always"
/>

<ItemList
  title="Saves"
  items={saves}
  getId={(save) => save.id}
  getName={(save) => save.name}
  selectedId={selectedId}
  onSelect={setSelectedId}
  onRename={renameSave}
  onDelete={deleteSaveForGood}
  undoDelete={8000}
  deleteKey
  onCreate={newSave}
  createLabel="New save"
  newDisabled={gameRunning ? false : 'Start a game to make a new save.'}
  rowActions={(save, row) => (
    <IconButton size="sm" variant="ghost" label={\`Load \${save.name}\`} tabIndex={row.tabIndex} onClick={() => loadSave(save.id)}>
      <Icon name="play" />
    </IconButton>
  )}
/>

// A save row with its screenshot flush on the left, renamed in place with the pen
<ItemList
  title="Saves"
  items={saves}
  getId={(save) => save.id}
  getName={(save) => save.name}
  render={(save) => ({
    media: <Image src={save.screenshot} alt="" fit="cover" pixelated />,
    meta: <DateText value={save.timestamp} format="relative" />,
  })}
  onRename={renameSave}
  renameInline
  rowActions={(save, row) => <SaveActions save={save} tabIndex={row.tabIndex} />}
  actionVisibility="always"
/>

// Load joins the same Ctrl+Z as the deletes of the list
const loadSave = (id) => {
  const before = captureGame();
  load(id);
  toast({ id: 'save-loaded', message: 'Save loaded.', duration: 8000, undo: () => restoreGame(before) });
};`;

export { ITEM_LIST_CODE };
