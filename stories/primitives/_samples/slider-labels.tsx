/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { Code, Glyph } from '../../../src/primitives';
import type { SliderLabelEntry } from '../../../src/primitives';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import { DUNGEONS, SPEEDS } from './slider-stops.constants';
import { StatefulSlider } from './StatefulSlider';

type LabelExample = { labels: string; node: ReactNode };

const percent = (value: number): string => `${value}%`;
const times = (value: number): string => `${value}x`;
const millis = (value: number): string => `${value} ms`;

const VOLUME: readonly SliderLabelEntry[] = [[0, <Glyph key="mute" name="mute" />], [50, 'Half'], [100, <Glyph key="loud" name="volume" />]];

const angle = (value: number): ReactNode => (value % 45 === 0 ? `${value}°` : null);

const EXAMPLES: Readonly<Record<string, LabelExample>> = {
  'Zoom in 0.5x steps': {
    labels: '"every 0.5 | {v}x"',
    node: <StatefulSlider initial={1} min={0.5} max={4} step={0.25} format={times} labels="every 0.5 | {v}x" ariaLabel="Zoom" />,
  },
  Percent: {
    labels: '"every 25 | {v}%"',
    node: <StatefulSlider initial={40} step={5} format={percent} labels="every 25 | {v}%" ariaLabel="Hint cost" />,
  },
  'Milliseconds at set values': {
    labels: '"0, 250, 500, 1000 | {v} ms"',
    node: <StatefulSlider initial={250} max={1000} step={50} format={millis} labels="0, 250, 500, 1000 | {v} ms" ariaLabel="Input delay" />,
  },
  'Scaled, with a format': {
    labels: '"every 0.1 | {v*100:0}%"',
    node: <StatefulSlider initial={0.15} max={0.5} step={0.01} labels="every 0.1 | {v*100:0}%" ariaLabel="Dead zone" />,
  },
  'Named words': {
    labels: '"[Low, Medium, High]"',
    node: <StatefulSlider initial={50} labels="[Low, Medium, High]" ariaLabel="Music quality" />,
  },
  'Plural words and the ends': {
    labels: '"every 2 + ends | {v} {heart|hearts}"',
    node: <StatefulSlider initial={3} min={1} max={8} labels="every 2 + ends | {v} {heart|hearts}" ariaLabel="Hearts at start" />,
  },
  'One value renamed': {
    labels: '"every 25 + 0=Off | {v}%"',
    node: <StatefulSlider initial={50} step={5} format={percent} labels="every 25 + 0=Off | {v}%" ariaLabel="Rumble" />,
  },
  'Pairs, with icons': {
    labels: "[[0, <Glyph />], [50, 'Half'], [100, <Glyph />]]",
    node: <StatefulSlider initial={80} format={percent} labels={VOLUME} ariaLabel="Music volume" />,
  },
  'A function': {
    labels: '(v) => (v % 45 === 0 ? `${v}°` : null)',
    node: <StatefulSlider initial={90} max={180} step={15} labels={angle} ariaLabel="Camera angle" />,
  },
  'Every step, thinned to fit': {
    labels: '"steps"',
    node: <StatefulSlider initial={30} labels="steps" ariaLabel="Every step" />,
  },
  'Range, named stops': {
    labels: 'left out; stops={SPEEDS} labels every stop',
    node: <StatefulSlider initial={[2, 5]} stops={SPEEDS} ariaLabel="Turbo speed range" />,
  },
  'Range, every other stop': {
    labels: '"every 2"',
    node: <StatefulSlider initial={[1, 6]} stops={DUNGEONS} labels="every 2" ariaLabel="Dungeons in the pool" />,
  },
};

const COLUMNS = [{ key: 'labels', label: 'labels' }, { key: 'slider', label: 'Slider', fill: true }] as const;

const LabelsDemo = () => (
  <Demonstrator
    corner="Kind"
    rows={axis(Object.keys(EXAMPLES))}
    columns={COLUMNS}
    align="stretch"
    cell={(row, column) => (column === 'labels' ? <Code>{EXAMPLES[row]?.labels}</Code> : EXAMPLES[row]?.node)}
  />
);

export { LabelsDemo };
