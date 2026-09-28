/* @layer root-config @kind logic */
import { createElement } from 'react';
import { renderStory as renderReact } from '@storylite/renderer-react/client';
import type { StoryLiteClientRenderer } from '@storylite/storylite';
import { ControlledStory } from '../../stories/_template/controls/ControlledStory';

const renderStory: StoryLiteClientRenderer = (story, args, context) => {
  const { render, argTypes } = story;
  if (!render || Object.keys(argTypes).length === 0) return renderReact(story, args, context);
  const controlled = () => createElement(ControlledStory, { render, argTypes, initialArgs: args, context });
  return renderReact({ ...story, render: controlled }, args, context);
};

export { renderStory };
