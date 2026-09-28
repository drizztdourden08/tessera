/* @layer renderer-components @kind component */
import { TextElement } from '../../TextElement';
import type { HeadingProps, HeadingTag } from '../Title.type';

const Heading = (props: HeadingProps) => {
  const { level = 1, className, ...rest } = props;
  const classes = ['title', `title--${level}`, className].filter(Boolean).join(' ');
  return <TextElement<HeadingTag> {...rest} as={`h${level}`} className={classes} />;
};

export { Heading };
