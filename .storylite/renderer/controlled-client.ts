/* @layer root-config @kind logic */
import { createElement } from 'react';
import type { ReactNode } from 'react';
import { renderStory as renderReact } from '@storylite/renderer-react/client';
import type { StoryLiteClientRenderer } from '@storylite/storylite';
import { TesseraProvider } from '../../src/primitives';
import { ControlledStory } from '../../stories/_template/controls/ControlledStory';

const renderStory: StoryLiteClientRenderer = (story, args, context) => {
  const { render, argTypes } = story;
  if (!render) return renderReact(story, args, context);
  const controlled = Object.keys(argTypes).length > 0;
  const overrides = { portalDocument: context.document };
  const inPreview: typeof render = (storyArgs, storyContext) => createElement(
    TesseraProvider,
    { overrides },
    (controlled
      ? createElement(ControlledStory, { render, argTypes, initialArgs: args, context })
      : render(storyArgs, storyContext)) as ReactNode,
  );
  return renderReact({ ...story, render: inPreview }, args, context);
};

export { renderStory };
