/* @layer stories @kind component */
import { useState } from 'react';
import { FactsPanel, ListItemRow, StudioLayout } from '../../../src/composites';
import { Box, ColorSwatch, Icon, IconButton, SearchInput, SegmentedControl, Status, Text } from '../../../src/primitives';
import { StudioAction } from './StudioAction';
import { FRAMES, IDLE_HINT, SPRITE_FACTS, SPRITES, TUNIC } from './studio-sample.constants';
import type { SpriteStudioSampleProps } from './studio-sample.type';

const SpriteStudioSample = ({ folded = false, bar = true, resizable = true }: SpriteStudioSampleProps) => {
  const [picked, setPicked] = useState<string>(SPRITES[0].id);
  const [view, setView] = useState('sheet');
  const [query, setQuery] = useState('');
  const sprite = SPRITES.find((item) => item.id === picked) ?? SPRITES[0];

  const list = (
    <>
      <SearchInput value={query} onChange={setQuery} placeholder="Find a sprite" size="sm" />
      <Box surface="sunken" className="studio-demo__well" role="list" aria-label="Sprites">
        {SPRITES.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())).map((item) => (
          <ListItemRow key={item.id} role="listitem" name={item.name} meta={item.meta} selected={picked === item.id} onClick={() => setPicked(item.id)} />
        ))}
      </Box>
    </>
  );

  const inspector = (
    <>
      <FactsPanel groups={SPRITE_FACTS} />
      <Text variant="overline" tone="muted">Tunic palette</Text>
      <Box surface="sunken" className="studio-demo__well studio-demo__swatches">
        {TUNIC.map((hex, index) => <ColorSwatch key={hex} color={hex} caption={`${index}`} size="sm" aria-label={`Palette slot ${index}`} />)}
      </Box>
    </>
  );

  return (
    <StudioLayout
      bar={bar ? {
        caption: 'Character Studio',
        title: sprite.name,
        status: <Status tone="warning" variant="pill" dot>Unsaved changes</Status>,
        idleHint: IDLE_HINT,
        groups: [
          { id: 'save', label: 'Save to this app', content: <><StudioAction primary label="Save" hint="Keeps your changes in this app." /><StudioAction label="Save as a copy" hint="Keeps the original and saves a new sprite beside it." /></> },
          { id: 'export', label: 'Export a file', content: <><StudioAction label="Export .zspr" hint="Makes a sprite file to share or load in another game." /><StudioAction label="Export PNG" hint="Makes a picture of the whole sheet." /></> },
        ],
      } : undefined}
      start={{ title: 'Sprites', content: list, defaultCollapsed: folded, resizable }}
      end={{ title: 'Properties', content: inspector, defaultCollapsed: folded, resizable }}
      editorLabel="Sprite sheet"
      toolbar={[
        { id: 'view', label: 'View', content: <SegmentedControl size="sm" value={view} onChange={setView} options={[{ value: 'sheet', label: 'Sheet' }, { value: 'pose', label: 'Poses' }]} /> },
        { id: 'zoom', label: 'Zoom', content: <><IconButton size="sm" variant="ghost" label="Zoom out"><Icon name="zoom-out" /></IconButton><Text variant="label">400%</Text><IconButton size="sm" variant="ghost" label="Zoom in"><Icon name="zoom-in" /></IconButton></> },
      ]}
    >
      <Box className="studio-demo__sheet" aria-label={`${FRAMES} frames`}>
        {Array.from({ length: FRAMES }, (_, index) => <Box key={index} className="studio-demo__frame" />)}
      </Box>
    </StudioLayout>
  );
};

export { SpriteStudioSample };
