/* @layer stories @kind types */
import type { ReactNode } from 'react';
import type { StoryLiteArgs, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PLAYGROUND_GROUPS } from './arg-controls.constants';

type PlaygroundGroup = (typeof PLAYGROUND_GROUPS)[number];

type PlaygroundControl = 'boolean' | 'text' | 'textarea' | 'number' | 'range' | 'color' | 'select' | 'multiselect';

type OptionOf<T> = T extends readonly (infer E)[] ? E : T;

type PlaygroundOptions<T, A> = readonly OptionOf<T>[] | ((args: A) => readonly OptionOf<T>[]);

interface PlaygroundArgType<T = unknown, A = StoryLiteArgs> {
  readonly group: PlaygroundGroup;
  readonly control?: PlaygroundControl;
  readonly options?: PlaygroundOptions<T, A>;
  readonly optionView?: (option: OptionOf<T>, args: A) => ReactNode;
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly description?: string;
}

type PlaygroundArgTypes<A extends StoryLiteArgs = StoryLiteArgs> = Partial<{
  readonly [Name in keyof A & string]: PlaygroundArgType<A[Name], A>;
}>;

type PlaygroundStory<A extends StoryLiteArgs = StoryLiteArgs> = Omit<StoryLiteStoryDefinition<A>, 'argTypes'> & {
  readonly argTypes?: PlaygroundArgTypes<A>;
};

type ControlKind = PlaygroundControl | 'segmented';

interface ArgRow {
  name: string;
  argType: PlaygroundArgType;
  kind: ControlKind;
  options: readonly unknown[];
}

interface ArgGroupRows {
  title: PlaygroundGroup;
  rows: ArgRow[];
}

export type {
  ArgGroupRows,
  ArgRow,
  ControlKind,
  PlaygroundArgType,
  PlaygroundArgTypes,
  PlaygroundStory,
};
