/* @layer stories @kind logic */
import { createElement } from 'react';
import type { ComponentType, ReactNode } from 'react';
import type { StoryLiteArgType, StoryLiteArgs, StoryLiteStoryDefinition } from '@storylite/storylite';
import { TEXT_ELEMENT_SPECS, TYPE_FEATURES } from '../../src/primitives';
import type { TextElementSpec, TypeFeature, Typesetting } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { tonesStory } from './tones-story';

interface TextElementStoriesParams {
  name: TextElementSpec['name'];
  element: unknown;
  description: string;
  text: string;
  attributes?: Readonly<Record<string, string>>;
  context: ReactNode;
}

type LookArg = { value: unknown; argType: StoryLiteArgType };

const LOOK_ARGS: Readonly<Record<keyof Typesetting, LookArg>> = {
  weight: { value: 400, argType: { control: 'number', description: 'Any whole number from 100 to 900.' } },
  italic: { value: false, argType: { control: 'boolean' } },
  opticalSize: { value: 'auto', argType: { control: 'select', options: ['auto', 'text', 'display'] } },
  features: { value: '', argType: { control: 'text', description: 'OpenType features by name, comma separated: slashedZero, tabularNumbers.' } },
};

const featureList = (text: unknown): TypeFeature[] =>
  String(text).split(',').map((part) => part.trim()).filter((part): part is TypeFeature => part in TYPE_FEATURES);

const IS_DEFAULT: Readonly<Record<string, (value: unknown) => boolean>> = {
  weight: (value) => value === 400,
  italic: (value) => value !== true,
  opticalSize: (value) => value === 'auto',
  features: (value) => featureList(value).length === 0,
};

const lookProps = (looks: readonly string[], args: StoryLiteArgs): Record<string, unknown> => {
  const tone: unknown = args.tone;
  const set = looks.filter((look) => !IS_DEFAULT[look]?.(args[look])).map((look): [string, unknown] => {
    const value: unknown = args[look];
    return [look, look === 'features' ? featureList(value) : value];
  });
  if (tone !== undefined && tone !== 'none') set.push(['tone', tone]);
  return Object.fromEntries(set);
};

const textElementStories = (params: TextElementStoriesParams) => {
  const { name, element, description, text, attributes = {}, context } = params;
  const spec = TEXT_ELEMENT_SPECS.find((entry) => entry.name === name) ?? TEXT_ELEMENT_SPECS[0];
  const Element = element as ComponentType<Record<string, unknown>>;
  const attributeNames = Object.keys(attributes);
  const tones: readonly string[] = spec.tones;
  const controls: Record<string, LookArg> = Object.fromEntries(spec.looks.map((look) => [look, LOOK_ARGS[look]]));
  if (tones.length) controls.tone = { value: 'none', argType: { control: 'select', options: ['none', ...tones] } };
  const Playground = {
    name: 'Playground',
    args: { text, ...attributes, ...Object.fromEntries(Object.entries(controls).map(([key, entry]) => [key, entry.value])) },
    argTypes: {
      text: { control: 'text' },
      ...Object.fromEntries(attributeNames.map((key) => [key, { control: 'text' }])),
      ...Object.fromEntries(Object.entries(controls).map(([key, entry]) => [key, entry.argType])),
    },
    render: (args) => createElement(Element, {
      ...Object.fromEntries(attributeNames.map((key) => [key, args[key]])),
      ...lookProps(spec.looks, args),
    }, String(args.text)),
  } satisfies StoryLiteStoryDefinition;
  const InContext = { name: 'In context', render: () => context } satisfies StoryLiteStoryDefinition;
  const variants = tones.length ? [InContext, tonesStory(Element, text, tones, attributes)] : [InContext];
  const Overview = overviewStory({ component: name === spec.short ? name : `${name} (${spec.short})`, importName: spec.short, description, playground: Playground, variants });
  return { InContext, Overview, Playground };
};

export { textElementStories };
