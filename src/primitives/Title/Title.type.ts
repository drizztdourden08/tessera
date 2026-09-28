/* @layer renderer-components @kind types */
import type { ReactElement } from 'react';
import type { Typesetting } from '../Text/behavior/text-style.type';
import type { TextElementNativeProps } from '../TextElement';
import type { HEADING_LEVELS, TITLE_TONES } from './Title.constants';

type HeadingLevel = (typeof HEADING_LEVELS)[number];

type HeadingTag = `h${HeadingLevel}`;

type TitleTone = (typeof TITLE_TONES)[number];

type HeadingElementProps = TextElementNativeProps<'h1'> & Pick<Typesetting, 'weight' | 'italic'> & { tone?: TitleTone };

type HeadingProps = HeadingElementProps & { level?: HeadingLevel };

type HeadingComponent = ((props: HeadingElementProps) => ReactElement) & { displayName?: string };

type HeadingMembers = {
  [L in HeadingLevel as `H${L}` | `Heading${L}`]: HeadingComponent;
};

export type { HeadingComponent, HeadingElementProps, HeadingLevel, HeadingMembers, HeadingProps, HeadingTag, TitleTone };
