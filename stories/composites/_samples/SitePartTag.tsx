/* @layer stories @kind component */
import { Box, Span } from '../../../src/primitives';
import type { PartTagProps } from './site-story.type';

const SitePartTag = ({ name, show, site = false, place = 'top-end', className, children }: PartTagProps) => {
  const classes = ['site-story__part', show && 'site-story__part--shown', show && site && 'site-story__part--site', className];
  return (
    <Box className={classes.filter(Boolean).join(' ')}>
      {children}
      {show && <Span className={`site-story__part-tag site-story__part-tag--${place}`}>{name}</Span>}
    </Box>
  );
};

export { SitePartTag };
