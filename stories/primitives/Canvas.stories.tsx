/* @layer stories @kind story */
import { useEffect, useRef } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Canvas, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import './Canvas.stories.css';

type CanvasArgs = {
  width: number;
  height: number;
  showValues: boolean;
};

const CHECKS = [
  { player: 'Aria', found: 64 },
  { player: 'Brom', found: 41 },
  { player: 'Cadence', found: 58 },
  { player: 'Dov', found: 23 },
  { player: 'Esker', found: 49 },
];

const KEY_SPRITE = [
  '....aaaa....',
  '...abbbba...',
  '..abb..bba..',
  '..ab....ba..',
  '..abb..bba..',
  '...abbbba...',
  '....abba....',
  '.....ab.....',
  '.....abba...',
  '.....ab.....',
  '.....abbba..',
  '.....aaa....',
];

const tokenColor = (el: Element, name: string, fallback: string) =>
  getComputedStyle(el).getPropertyValue(name).trim() || fallback;

const drawChart = (canvas: HTMLCanvasElement, showValues: boolean) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const { width, height } = canvas;
  const bar = tokenColor(canvas, '--c-primary', 'goldenrod');
  const ink = tokenColor(canvas, '--c-text-dim', 'gray');
  const max = Math.max(...CHECKS.map((entry) => entry.found));
  const slot = width / CHECKS.length;
  const chartHeight = height - 40;

  ctx.clearRect(0, 0, width, height);
  ctx.font = '11px sans-serif';
  ctx.textAlign = 'center';
  CHECKS.forEach((entry, index) => {
    const barHeight = (entry.found / max) * (chartHeight - 16);
    const x = index * slot + slot * 0.2;
    const y = chartHeight - barHeight;
    ctx.fillStyle = bar;
    ctx.fillRect(x, y, slot * 0.6, barHeight);
    ctx.fillStyle = ink;
    ctx.fillText(entry.player, x + slot * 0.3, height - 16);
    if (showValues) ctx.fillText(String(entry.found), x + slot * 0.3, y - 4);
  });
};

const drawSprite = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const palette: Record<string, string> = {
    a: tokenColor(canvas, '--c-warning', 'darkgoldenrod'),
    b: tokenColor(canvas, '--c-primary-bright', 'gold'),
  };
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  KEY_SPRITE.forEach((row, y) => {
    [...row].forEach((cell, x) => {
      const fill = palette[cell];
      if (!fill) return;
      ctx.fillStyle = fill;
      ctx.fillRect(x, y, 1, 1);
    });
  });
};

const BarChart = ({ width, height, showValues }: CanvasArgs) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) drawChart(canvasRef.current, showValues);
  }, [width, height, showValues]);
  return (
    <Canvas
      ref={canvasRef}
      className="canvas-demo"
      width={width}
      height={height}
      role="img"
      aria-label="Checks found per player"
    />
  );
};

const PixelSprite = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) drawSprite(canvasRef.current);
  }, []);
  return <Canvas ref={canvasRef} className="canvas-demo canvas-demo--pixel" width={12} height={12} role="img" aria-label="Key sprite" />;
};

const ARGS: Partial<CanvasArgs> = { width: 420, height: 220, showValues: true };

const ARG_TYPES: StoryLiteArgTypes<CanvasArgs> = {
    width: { control: 'number', description: 'Bitmap width in px.' },
    height: { control: 'number', description: 'Bitmap height in px.' },
    showValues: { control: 'boolean' },
  };

const meta = {
  title: 'Primitives · Display/Canvas',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<CanvasArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="story-column">
      <Text className="story-label">checks found per player</Text>
      <BarChart width={args.width} height={args.height} showValues={args.showValues} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<CanvasArgs>;

const PixelArt = {
  name: 'Pixel art',
  render: () => (
    <Box className="story-column">
      <Text variant="subtitle">A 12 by 12 bitmap scaled up with CSS, colours read from the palette tokens.</Text>
      <PixelSprite />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<CanvasArgs>;

const CODE = `import { useEffect, useRef } from 'react';
import { Canvas } from '@drizztdourden08/tessera';

const ChecksChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) ctx.fillRect(16, 40, 48, 160);
  }, []);
  return <Canvas ref={canvasRef} width={420} height={220} role="img" aria-label="Checks found per player" />;
};`;

const Overview = overviewStory({
  component: 'Canvas',
  description: 'The plain canvas element, for anything drawn by code: a chart, a sprite, a minimap. It forwards a ref and every canvas attribute, and adds no styles, so the bitmap size comes from width and height and the shown size from CSS. Give it a role and a label when the drawing carries meaning.',
  playground: Playground,
  variants: [PixelArt],
  code: CODE,
});

export default meta;
export { Overview, PixelArt, Playground };
