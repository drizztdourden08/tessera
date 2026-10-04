/* @layer stories @kind logic */
import type { StoryLiteStoryDefinition } from '@storylite/storylite';
import { CodeBlock } from '../../../src/primitives';
import { overviewStory } from '../../_template/overview-story';
import type { Guide } from './guide.type';
import { GuideTopicView } from './GuideTopicView';

const exampleBlock = (guide: Guide) => <CodeBlock code={guide.example.code} language="tsx" showLineNumbers copyable />;

const guideStories = (guide: Guide): Record<'Overview' | 'Example', StoryLiteStoryDefinition> => ({
  Overview: overviewStory({
    component: guide.name,
    description: guide.description,
    points: guide.points,
    instead: guide.instead,
    variants: [],
    sections: [
      ...guide.topics.map((topic) => ({ title: topic.title, node: <GuideTopicView topic={topic} /> })),
      { title: guide.example.name, node: exampleBlock(guide) },
    ],
    code: false,
  }),
  Example: { name: guide.example.name, render: () => exampleBlock(guide) },
});

export { guideStories };
