/* @layer stories @kind data */
const STUDIO_CODE = `import { StudioLayout } from '@drizztdourden08/tessera';

<StudioLayout
  bar={{ caption: 'Character Studio', title: sprite.name, groups: fileActions, idleHint: 'Save keeps the sprite in this app.' }}
  start={{ title: 'Sprites', content: <SpriteList />, storageKey: 'studio.sprites' }}
  end={{ title: 'Properties', content: <SpriteFacts />, storageKey: 'studio.properties' }}
  editorLabel="Sprite sheet"
  toolbar={[{ id: 'zoom', label: 'Zoom', content: <ZoomButtons /> }]}
>
  <SpriteSheet />
</StudioLayout>`;

export { STUDIO_CODE };
