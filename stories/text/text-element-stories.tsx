/* @layer stories @kind logic */
import { createElement } from 'react';
import type { ComponentType, ReactNode } from 'react';
import type { StoryLiteArgs, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgType, PlaygroundStory } from '../_template/controls/playground.type';
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
  variants?: readonly StoryLiteStoryDefinition[];
}

type LookArg = { value: unknown; argType: PlaygroundArgType };

const LOOK_ARGS: Readonly<Record<keyof Typesetting, LookArg>> = {
  weight: { value: 400, argType: { group: 'Appearance', control: 'range', min: 100, max: 900, step: 1, description: 'Any whole number from 100 to 900.' } },
  italic: { value: false, argType: { group: 'Appearance', control: 'boolean' } },
  opticalSize: { value: 'auto', argType: { group: 'Appearance', control: 'select', options: ['auto', 'text', 'display'] } },
  features: { value: [], argType: { group: 'Appearance', control: 'multiselect', options: Object.keys(TYPE_FEATURES), description: 'OpenType features, by name.' } },
};

const featureList = (picked: unknown): TypeFeature[] =>
  (Array.isArray(picked) ? picked : []).filter((part): part is TypeFeature => typeof part === 'string' && part in TYPE_FEATURES);

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
  const { name, element, description, text, attributes = {}, context, variants: extra = [] } = params;
  const spec = TEXT_ELEMENT_SPECS.find((entry) => entry.name === name) ?? TEXT_ELEMENT_SPECS[0];
  const Element = element as ComponentType<Record<string, unknown>>;
  const attributeNames = Object.keys(attributes);
  const tones: readonly string[] = spec.tones;
  const controls: Record<string, LookArg> = Object.fromEntries(spec.looks.map((look) => [look, LOOK_ARGS[look]]));
  if (tones.length) controls.tone = { value: 'none', argType: { group: 'Appearance', control: 'select', options: ['none', ...tones] } };
  const Playground = {
    name: 'Playground',
    args: { text, ...attributes, ...Object.fromEntries(Object.entries(controls).map(([key, entry]) => [key, entry.value])) },
    argTypes: {
      text: { group: 'Content', control: 'text' },
      ...Object.fromEntries(attributeNames.map((key) => [key, { group: 'Content', control: 'text' }])),
      ...Object.fromEntries(Object.entries(controls).map(([key, entry]) => [key, entry.argType])),
    },
    render: (args) => createElement(Element, {
      ...Object.fromEntries(attributeNames.map((key) => [key, args[key]])),
      ...lookProps(spec.looks, args),
    }, String(args.text)),
  } satisfies PlaygroundStory;
  const InContext = { name: 'In context', render: () => context } satisfies StoryLiteStoryDefinition;
  const variants = tones.length ? [InContext, ...extra, tonesStory(Element, text, tones, attributes)] : [InContext, ...extra];
  const Overview = overviewStory({ component: name === spec.short ? name : `${name} (${spec.short})`, importName: spec.short, description, playground: Playground, variants });
  return { InContext, Overview, Playground };
};

export { textElementStories };
