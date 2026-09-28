/* @layer stories @kind logic */
import { createElement } from 'react';
import type { ComponentType, ReactNode } from 'react';
import type { StoryLiteArgTypes, StoryLiteStoryDefinition } from '@storylite/storylite';
import { TEXT_TONES, TYPE_FEATURES } from '../../src/primitives';
import type { OpticalSize, TextTone, TypeFeature } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { tonesStory } from './tones-story';

type TextElementArgs = {
  text: string;
  tone: TextTone | 'none';
  weight: number;
  italic: boolean;
  opticalSize: 'auto' | 'text' | 'display';
  features: string;
} & Record<string, string | number | boolean>;

interface TextElementStoriesParams {
  name: string;
  short: string;
  element: unknown;
  description: string;
  text: string;
  attributes?: Readonly<Record<string, string>>;
  context: ReactNode;
}

const BASE_ARG_TYPES: StoryLiteArgTypes<TextElementArgs> = {
  text: { control: 'text' },
  tone: { control: 'select', options: ['none', ...TEXT_TONES], description: 'A colour from the theme roles.' },
  weight: { control: 'number', description: 'Any whole number from 100 to 900.' },
  italic: { control: 'boolean' },
  opticalSize: { control: 'select', options: ['auto', 'text', 'display'] },
  features: { control: 'text', description: 'OpenType features by name, comma separated: slashedZero, tabularNumbers.' },
};

const featureList = (text: string): TypeFeature[] =>
  text.split(',').map((part) => part.trim()).filter((part): part is TypeFeature => part in TYPE_FEATURES);

const textElementStories = (params: TextElementStoriesParams) => {
  const { name, short, element, description, text, attributes = {}, context } = params;
  const Element = element as ComponentType<Record<string, unknown>>;
  const attributeNames = Object.keys(attributes);
  const Playground = {
    name: 'Playground',
    args: { text, tone: 'none', weight: 400, italic: false, opticalSize: 'auto', features: '', ...attributes },
    argTypes: { ...BASE_ARG_TYPES, ...Object.fromEntries(attributeNames.map((key) => [key, { control: 'text' }])) },
    render: (args) => {
      const { text: content, tone, weight, italic, opticalSize, features, ...rest } = args;
      const own = Object.fromEntries(attributeNames.map((key) => [key, rest[key]]));
      const featureNames = featureList(features);
      return createElement(Element, {
        ...own,
        tone: tone === 'none' ? undefined : tone,
        weight: weight === 400 ? undefined : weight,
        italic: italic || undefined,
        opticalSize: opticalSize === 'auto' ? undefined : opticalSize as OpticalSize,
        features: featureNames.length ? featureNames : undefined,
      }, content);
    },
  } satisfies StoryLiteStoryDefinition<TextElementArgs>;
  const InContext = { name: 'In context', render: () => context } satisfies StoryLiteStoryDefinition<TextElementArgs>;
  const Tones = tonesStory(Element, text, attributes);
  const Overview = overviewStory({ component: name === short ? name : `${name} (${short})`, importName: short, description, playground: Playground, variants: [InContext, Tones] });
  return { InContext, Overview, Playground };
};

export { textElementStories };
