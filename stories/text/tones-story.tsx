/* @layer stories @kind logic */
import { createElement } from 'react';
import type { ComponentType } from 'react';
import type { StoryLiteStoryDefinition } from '@storylite/storylite';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';

const tonesStory = (
  element: unknown,
  text: string,
  tones: readonly string[],
  attributes: Readonly<Record<string, string>> = {},
) => {
  const Element = element as ComponentType<Record<string, unknown>>;
  return {
    name: 'Tones',
    render: () => (
      <Demonstrator rows={axis(tones)} cell={(tone) => createElement(Element, { ...attributes, tone }, text)} />
    ),
  } satisfies StoryLiteStoryDefinition;
};

export { tonesStory };
