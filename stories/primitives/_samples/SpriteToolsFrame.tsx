/* @layer stories @kind component */
import { Text, ToolFrame, ToolGroups } from '../../../src/primitives';
import { useSpriteTools } from './useSpriteTools';

const SpriteToolsFrame = () => {
  const groups = useSpriteTools();
  return (
    <ToolFrame as="section" aria-label="Sprite sheet" padded toolbar={<ToolGroups compact groups={groups} />}>
      <Text tone="muted">Link, green tunic: 24 frames on one sheet.</Text>
    </ToolFrame>
  );
};

export { SpriteToolsFrame };
