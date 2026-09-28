/* @layer renderer-components @kind util */
import { createElement } from 'react';
import { Heading } from '../sub-components/Heading';
import type { HeadingComponent, HeadingElementProps, HeadingLevel, HeadingMembers } from '../Title.type';

const headingFor = (level: HeadingLevel): HeadingComponent => {
  const LevelHeading = (props: HeadingElementProps) => createElement(Heading, { ...props, level });
  LevelHeading.displayName = `H${level}`;
  return LevelHeading;
};

const headingMembers = (levels: readonly HeadingLevel[]): HeadingMembers =>
  Object.fromEntries(levels.flatMap((level) => {
    const heading = headingFor(level);
    return [[`H${level}`, heading], [`Heading${level}`, heading]];
  })) as HeadingMembers;

export { headingMembers };
