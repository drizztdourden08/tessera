/* @layer renderer-components @kind types */
import type { ReactElement } from 'react';
import type { TextElementOwnProps } from '../TextElement';
import type { HEADING_LEVELS } from './Title.constants';

type HeadingLevel = (typeof HEADING_LEVELS)[number];

type HeadingTag = `h${HeadingLevel}`;

type HeadingElementProps = TextElementOwnProps<'h1'>;

type HeadingProps = HeadingElementProps & { level?: HeadingLevel };

type HeadingComponent = ((props: HeadingElementProps) => ReactElement) & { displayName?: string };

type HeadingMembers = {
  [L in HeadingLevel as `H${L}` | `Heading${L}`]: HeadingComponent;
};

export type { HeadingComponent, HeadingElementProps, HeadingLevel, HeadingMembers, HeadingProps, HeadingTag };
