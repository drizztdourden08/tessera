/* @layer stories @kind story */
import type { ReactNode } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Svg, SvgCircle, SvgGroup, SvgLine, SvgPath, SvgPolygon, SvgRect, SvgText } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import './Svg.stories.css';

type SvgArgs = {
  strokeWidth: number;
  showArea: boolean;
  showPoints: boolean;
  showGrid: boolean;
};

const WIDTH = 320;
const HEIGHT = 160;
const PAD = 24;

const SAMPLES = [0, 18, 31, 40, 62, 71, 90, 104, 131, 142, 167, 188, 212];

const MAX = Math.max(...SAMPLES);

const pointAt = (value: number, index: number) => ({
  x: PAD + (index / (SAMPLES.length - 1)) * (WIDTH - PAD * 2),
  y: HEIGHT - PAD - (value / MAX) * (HEIGHT - PAD * 2),
});

const POINTS = SAMPLES.map(pointAt);
const LINE_PATH = POINTS.map(({ x, y }, index) => `${index === 0 ? 'M' : 'L'}${x} ${y}`).join(' ');
const AREA_POINTS = [
  `${PAD},${HEIGHT - PAD}`,
  ...POINTS.map(({ x, y }) => `${x},${y}`),
  `${WIDTH - PAD},${HEIGHT - PAD}`,
].join(' ');
const GRID_ROWS = [0, 0.25, 0.5, 0.75, 1].map((fraction) => PAD + fraction * (HEIGHT - PAD * 2));

const ARGS: Partial<SvgArgs> = { strokeWidth: 2, showArea: true, showPoints: true, showGrid: true };

const ARG_TYPES: StoryLiteArgTypes<SvgArgs> = {
    strokeWidth: { control: 'number' },
    showArea: { control: 'boolean' },
    showPoints: { control: 'boolean' },
    showGrid: { control: 'boolean' },
  };

const meta = {
  title: 'Primitives · Display/Svg',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<SvgArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Svg className="svg-demo" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="Checks found over time">
      {args.showGrid && (
        <SvgGroup>
          {GRID_ROWS.map((y) => (
            <SvgLine key={y} className="svg-demo__grid" x1={PAD} x2={WIDTH - PAD} y1={y} y2={y} />
          ))}
        </SvgGroup>
      )}
      {args.showArea && <SvgPolygon className="svg-demo__area" points={AREA_POINTS} />}
      <SvgPath className="svg-demo__line" d={LINE_PATH} strokeWidth={args.strokeWidth} />
      {args.showPoints && (
        <SvgGroup>
          {POINTS.map(({ x, y }) => (
            <SvgCircle key={`${x}-${y}`} className="svg-demo__point" cx={x} cy={y} r={3} />
          ))}
        </SvgGroup>
      )}
      <SvgText className="svg-demo__label" x={PAD} y={PAD - 8}>{`${MAX} checks`}</SvgText>
      <SvgText className="svg-demo__label" x={WIDTH - PAD} y={HEIGHT - 8} textAnchor="end">2 hours</SvgText>
    </Svg>
  ),
} satisfies StoryLiteStoryDefinition<SvgArgs>;

const SWATCHES: Readonly<Record<string, ReactNode>> = {
  SvgRect: <SvgRect className="svg-demo__shape" x={10} y={10} width={40} height={40} rx={4} />,
  SvgCircle: <SvgCircle className="svg-demo__shape" cx={30} cy={30} r={20} />,
  SvgLine: <SvgLine className="svg-demo__shape" x1={10} y1={50} x2={50} y2={10} />,
  SvgPolygon: <SvgPolygon className="svg-demo__shape" points="30,8 52,50 8,50" />,
  SvgPath: <SvgPath className="svg-demo__shape" d="M10 40 Q30 0 50 40 T50 50" />,
  SvgText: <SvgText className="svg-demo__label" x={30} y={34} textAnchor="middle">Aa 12</SvgText>,
};

const Elements = {
  name: 'All elements',
  render: () => (
    <Demonstrator
      columns={axis(Object.keys(SWATCHES))}
      cell={(_row, name) => (
        <Svg className="svg-demo svg-demo--swatch" viewBox="0 0 60 60" aria-hidden="true">
          <SvgGroup>{SWATCHES[name]}</SvgGroup>
        </Svg>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<SvgArgs>;

const Overview = overviewStory({
  component: 'Svg',
  description: 'Inline SVG for drawings computed at run time: plots, gizmos, minimaps. Reach for it when a static Icon glyph cannot show the shape. Svg is the root element, and SvgGroup, SvgRect, SvgCircle, SvgLine, SvgPolygon, SvgPath and SvgText draw inside it. Each one passes every SVG attribute straight through and adds no style of its own.',
  playground: Playground,
  variants: [Elements],
});

export default meta;
export { Elements, Overview, Playground };
