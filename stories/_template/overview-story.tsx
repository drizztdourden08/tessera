/* @layer stories @kind logic */
import { isValidElement } from 'react';
import type { ReactNode } from 'react';
import type { StoryLiteArgs, StoryLiteStoryDefinition } from '@storylite/storylite';
import { elementToJsx } from './element-to-jsx';
import { OverviewPage } from './OverviewPage';

type Story<A extends StoryLiteArgs> = StoryLiteStoryDefinition<A>;
type StoryContext<A extends StoryLiteArgs> = Parameters<NonNullable<Story<A>['render']>>[1];

interface OverviewParams<A extends StoryLiteArgs> {
  component: string;
  description: string;
  variants: readonly Story<A>[];
  playground?: Story<A>;
  code?: string;
}

const PACKAGE = '@drizztdourden08/tessera';

const snippetFor = (component: string, node: ReactNode): string => {
  const jsx = isValidElement(node) ? elementToJsx(node, '', component) : `<${component} />`;
  return `import { ${component} } from '${PACKAGE}';\n\n${jsx}`;
};

const draw = <A extends StoryLiteArgs>(story: Story<A>, args: StoryLiteArgs, context: StoryContext<A>): ReactNode =>
  story.render?.({ ...(story.args ?? {}), ...args } as A, context) as ReactNode;

const overviewStory = <A extends StoryLiteArgs>(params: OverviewParams<A>): Story<A> => {
  const { component, description, variants, playground, code } = params;
  const defaults: StoryLiteArgs = { ...(playground?.args ?? {}) };
  return {
    name: 'Overview',
    source: () => code ?? (playground ? snippetFor(component, draw(playground, defaults, undefined as never)) : null),
    render: (_args, context) => (
      <OverviewPage
        name={component}
        description={description}
        variants={variants.map((story) => ({ title: story.name ?? '', node: draw(story, defaults, context) }))}
        playground={playground ? {
          argTypes: playground.argTypes ?? {},
          defaults,
          draw: (args) => draw(playground, args, context),
          snippet: (node) => code ?? snippetFor(component, node),
        } : null}
        code={code ?? null}
      />
    ),
  };
};

export { overviewStory };
