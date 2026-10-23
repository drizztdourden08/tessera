/* @layer stories @kind data */
const SPRITE_ROWS: readonly string[] = [
  '......kkkk......',
  '....kkrrrrkk....',
  '...krrwwrrrrk...',
  '..krrwwwwrrrrk..',
  '.krrrwwrrrrwwrk.',
  '.krrrrrrrrwwwwk.',
  'krwwrrrrrrrwwrrk',
  'krwwwrrrrrrrrrrk',
  'krrwrrrrwwrrrrrk',
  '.kkrrrrrwwrrrkk.',
  '...kkkkkkkkkk...',
  '....kssssssk....',
  '....kskssksk....',
  '....kssssssk....',
  '....kssssssk....',
  '.....kkkkkk.....',
];

const SPRITE_PALETTE: Readonly<Record<string, string>> = {
  k: '#1c1b22',
  r: '#d4473f',
  w: '#f4eee2',
  s: '#e8c9a0',
};

const SPRITE_SIZE = 16;

const PIXEL_VIEWPORT_CODE = `import { useCallback, useRef, useState } from 'react';
import { PixelViewport } from '@drizztdourden08/tessera';
import type { PixelPoint, PixelViewportHandle } from '@drizztdourden08/tessera';

const viewport = useRef<PixelViewportHandle>(null);
const [zoom, setZoom] = useState(4);
const draw = useCallback((ctx: CanvasRenderingContext2D) => paintSprite(ctx), []);

<PixelViewport ref={viewport} label="Sprite" width={16} height={16} draw={draw}
  zoom={zoom} onZoomChange={setZoom} onPointerPixel={(pixel) => setStatus(pixel)} />

<PixelViewport label="Texture" width={bitmap.width} height={bitmap.height} source={bitmap} gridFrom={12} />

viewport.current?.fit();
viewport.current?.screenToPixel(event.clientX, event.clientY);`;

export { PIXEL_VIEWPORT_CODE, SPRITE_PALETTE, SPRITE_ROWS, SPRITE_SIZE };
