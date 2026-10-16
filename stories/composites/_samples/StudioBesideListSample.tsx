/* @layer stories @kind component */
import { useState } from 'react';
import { FactsPanel, ListDetailLayout, ListItemList, ListItemRow, StudioLayout } from '../../../src/composites';
import { SearchInput } from '../../../src/primitives';
import { SpriteSheet } from './SpriteSheet';
import { SpriteViewSwitch } from './SpriteViewSwitch';
import { SPRITE_FACTS, SPRITES } from './studio-sample.constants';
import { usePickedSprite } from './usePickedSprite';
import { POSES } from './studio-beside-list.constants';

const StudioBesideListSample = () => {
  const { sprite, setPicked } = usePickedSprite();
  const [pose, setPose] = useState<string>(POSES[0]);
  const [view, setView] = useState('sheet');
  const [query, setQuery] = useState('');

  const list = (
    <ListItemList heading="Sprites" count={SPRITES.length}>
      {SPRITES.map((item) => (
        <ListItemRow key={item.id} name={item.name} meta={item.meta} selected={sprite.id === item.id} onClick={() => setPicked(item.id)} />
      ))}
    </ListItemList>
  );

  const poses = POSES.map((name) => <ListItemRow key={name} name={name} selected={pose === name} onClick={() => setPose(name)} />);

  const studio = (
    <StudioLayout
      start={{ title: 'Poses', content: poses, width: 224, defaultCollapsed: true }}
      end={{ title: 'Properties', content: <FactsPanel groups={SPRITE_FACTS} />, width: 224 }}
      editorLabel={`${sprite.name}, ${pose}`}
      toolbar={[
        { id: 'view', label: 'View', content: <SpriteViewSwitch value={view} onChange={setView} /> },
        { id: 'find', label: 'Find', content: <SearchInput size="sm" grow={false} value={query} onChange={setQuery} placeholder="Find a frame" /> },
      ]}
    >
      <SpriteSheet />
    </StudioLayout>
  );

  return <ListDetailLayout list={list} detail={studio} listWidth={240} detailScroll={false} listLabel="sprites" detailLabel="sprite studio" />;
};

export { StudioBesideListSample };
